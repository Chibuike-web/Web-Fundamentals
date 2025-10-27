import { createServer } from "node:http";

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
	const path = url.pathname;

	if (path === "/favicon.ico") {
		res.writeHead(204);
		res.end();
		return;
	}

	const query = Object.fromEntries(parsedUrl.searchParams.entries());
	console.log(path, query);

	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ path, query }));
});

server.listen(8080, () => {
	console.log("Server running on http://localhost:8080");
});
