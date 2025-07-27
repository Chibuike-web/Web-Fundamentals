import { createServer } from "http";

const server = createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}

	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;

	if (req.method === "POST" && pathname === "/login") {
		let body = "";

		req.on("data", (chunk) => {
			body = body + chunk;
		});

		req.on("end", () => {
			try {
				const parseBody = JSON.parse(body);
				const { email, password } = parseBody;
				console.log("Email:", email);
				console.log("Password:", password);
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Login successful", data: email }));
			} catch (err) {
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ error: "Invalid JSON" }));
			}
		});
	} else {
		res.statusCode = 405;
		res.setHeader({ "Content-Type": "text/plain" });
		res.end("Method Not Allowed");
	}
});

server.listen(4000, () => {
	console.log(`Server running on http://localhost:4000`);
});
