import { createServer } from "http";
import https from "https";

const server = createServer(async (req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;

	if (req.method === "POST" && pathname === "/locate") {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", async () => {
			try {
				const { latitude, longitude } = JSON.parse(body);
				const apiUrl = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;

				const apiRes = await fetch(apiUrl, {
					headers: {
						"User-Agent": "GeoLocationApp/1.0",
					},
				});

				if (!apiRes.ok) {
					const error = await apiRes.json();
					console.log(error);
					res.end(JSON.stringify({ error }));
					return;
				}

				const data = await apiRes.json();
				const location = data.display_name || "Unknown location";

				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ location }));
			} catch (err) {
				console.log(err);
				res.writeHead(400, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ err }));
			}
		});
	} else {
		res.writeHead(405, { "Content-Type": "text/plain" });
		res.end("Method Not Allowed");
	}
});

server.listen(3210, () => {
	console.log(`server running in http://localhost:3210`);
});
