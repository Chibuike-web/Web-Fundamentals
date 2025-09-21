import { createServer } from "node:http";

const PORT = 4284;

const sessions = new Map();

const users = [];

const server = createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:5500");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;

	if (req.method === "POST" && pathname === "/signup") {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", () => {
			try {
				if (!body) {
					res.writeHead(400, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Empty request body" }));
					return;
				}
				const { name, email, password } = JSON.parse(body);

				if (!name || !email || !password) {
					res.writeHead(400, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Missing inputs" }));
					return;
				}
				console.log({ name, email, password });

				const userExists = users.some((u) => u.email === email);
				if (userExists) {
					res.writeHead(409, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "User already exists, log in instead" }));
					return;
				}

				res.writeHead(201, { "Content-Type": "application/json" });
				const newUser = {
					id: crypto.randomUUID(),
					name,
					email,
					password,
				};

				users.push(newUser);
				res.end(JSON.stringify({ message: "Sign Up successful" }));
				return;
			} catch (err) {
				console.error(err);
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ err }));
			}
		});
	} else if (req.method === "POST" && pathname === "/login") {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", () => {
			try {
				if (!body) {
					res.writeHead(400, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Empty request body" }));
					return;
				}

				const { email, password } = JSON.parse(body);

				const user = users.find((u) => u.email === email);
				if (!user) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "User doesn't exist, Sign up instead" }));
					return;
				}

				if (password !== user.password) {
					res.writeHead(404, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ error: "Incorrect password" }));
					return;
				}

				const maxAge = 3600;
				const sessionId = crypto.randomUUID();
				sessions.set(sessionId, {
					userId: user.id,
					expiresAt: Date.now() + 3600 * 1000,
				});

				res.setHeader("Set-Cookie", [
					`sessionId=${sessionId}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
				]);
				res.writeHead(200, { "Content-Type": "application/json" });

				res.end(JSON.stringify({ message: "Login successful", id: user.id, email: user.email }));
				return;
			} catch (err) {
				console.error(err);
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ err }));
			}
		});
	} else if (req.method === "GET" && pathname === "/user") {
		console.log("Cookies header:", req.headers.cookie);

		const cookies = req.headers.cookie;
		if (!cookies) {
			res.writeHead(401, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "No cookies sent" }));
			return;
		}

		const cookieObj = Object.fromEntries(
			cookies.split(";").map((c) => {
				const [key, value] = c.trim().split("=");
				return [key, value];
			})
		);

		console.log(cookieObj);

		const sessionId = cookieObj.sessionId;
		const session = getSession(sessionId);

		if (!session) {
			res.writeHead(401, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Invalid or expired session" }));
			return;
		}

		const user = users.find((u) => u.id === session.userId);
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ id: user.id, name: user.name, email: user.email }));
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Route not found" }));
	}
});

server.listen(PORT, () => {
	console.log(`server running in http://localhost:${PORT}`);
});

function getSession(sessionId) {
	const session = sessions.get(sessionId);
	if (!session) return null;

	if (Date.now() > session.expiresAt) {
		sessions.delete(sessionId);
		return null;
	}
	return session;
}
