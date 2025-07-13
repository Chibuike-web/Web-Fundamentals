import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer((req, res) => {
	const origin = req.headers.origin;

	const allowedOrigins = ["http://localhost:3000", "http://127.0.0.1:5000"];

	// CORS handling
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
		res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
		res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
		res.setHeader("Access-Control-Allow-Credentials", "true");
	}

	// Handle preflight requests
	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	// Your existing request handling logic here
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const path = parsedUrl.pathname;
	const query = Object.fromEntries(parsedUrl.searchParams.entries());
	console.log(path, query);

	res.writeHead(200, { "Content-Type": "text/plain" });
	res.end("Hello, World!\n");
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
