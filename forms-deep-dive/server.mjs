import http from "http";

const server = http.createServer((req, res) => {
	const origin = req.headers.origin;
	const allowedOrigins = [
		"http://localhost:3000",
		"http://127.0.0.1:5000",
		"http://127.0.0.1:5500",
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

	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const pathname = parsedUrl.pathname;

	if (req.method === "GET" && pathname === "/validate-form") {
		res.writeHead(200, { "Content-type": "application/json" });
		res.end(JSON.stringify({ message: "Chibuike Maduabuchi" }));
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found");
		return;
	}
});

server.listen(1234, () => {
	console.log(`Server running at http://localhost:1234`);
});
