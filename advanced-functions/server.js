import { createServer } from "http";
import { readFileSync } from "fs";

const server = createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type: Authorization");
	if (req.method === "OPTIONS") {
		res.writeHead(200);
		res.end();
		return;
	}

	const url = new URL(req.url, `http://${req.headers.host}`);
	console.log(url);
	const pathname = url.pathname;

	if (req.method === "GET" && pathname === "/items") {
		const data = JSON.parse(readFileSync("./data.json"));
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(data));
		return;
	} else {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Method Not Allowed");
	}
});

server.listen(4020, () => {
	console.log(`server running on http://localhost:4020`);
});
