import http from "http";
import { serverData } from "./data.js";

const server = http.createServer((req, res) => {
	const origin = req.headers.origin;
	const allowedOrigins = [
		"http://localhost:3000",
		"http://127.0.0.1:5000",
		"http://127.0.0.1:5501",
	];

	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	const url = new URL(req.url, `http://${req.headers.host}`);
	if (url.pathname === "/items" && req.method === "GET" && url.searchParams.has("id")) {
		const id = parseInt(url.searchParams.get("id"), 10);
		const item = serverData.find((d) => d.id === id);

		if (item) {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(item));
		} else {
			res.writeHead(404, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ error: "Item not found" }));
		}
	} else {
		res.writeHead(404);
		res.end("Not Found");
	}
});

server.listen(3000, () => {
	console.log("Server running in http://localhost:3000");
});
