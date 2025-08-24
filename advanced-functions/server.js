import { createServer } from "http";
import { readFileSync } from "fs";

const data = JSON.parse(readFileSync("./data.json"));
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
	const pathname = url.pathname;
	const searchParams = url.searchParams;

	if (req.method === "GET" && pathname === "/items") {
		if (searchParams.has("id")) {
			const id = searchParams.get("id");
			const item = data.results.find((i) => i.id === Number(id));
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(item));
			return;
		} else {
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify(data));
			return;
		}
	} else {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Method Not Allowed");
	}
});

server.listen(4020, () => {
	console.log(`server running on http://localhost:4020`);
});
