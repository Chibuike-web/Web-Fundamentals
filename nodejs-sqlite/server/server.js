import { initDb, closeDb, getDb } from "./db/todos.js";
import { createServer } from "node:http";

initDb("./db/todos.db");
getDb();

const server = createServer((req, res) => {
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

	const match = matchRoute(req.method, pathname);

	if (match) {
		match.handler(req, res, match.params);
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Route not found" }));
	}
});

closeDb();

server.listen(3222, () => {
	console.log("server is running on http://localhost:3222");
});
