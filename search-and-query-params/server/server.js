import { readFileSync } from "node:fs";
import { createServer } from "node:http";

const json = readFileSync("./movies.json", "utf8");
const movies = JSON.parse(json);

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

	if (req.method === "GET" && path === "/movies") {
		try {
			const searchParams = url.searchParams;
			if (!searchParams.toString()) {
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ movies }));
				return;
			}
			const title = url.searchParams.get("title")?.toLowerCase() || "";
			const year = url.searchParams.get("year") || "";
			const movie = movies.filter((m) => {
				const matchesTitle = title ? m.title.toLowerCase().includes(title) : true;
				const matchesYear = year ? m.year.toString() === year : true;
				return matchesTitle && matchesYear;
			});
			console.log(movie);
			res.writeHead(200, { "Content-Type": "application/json" });
			res.end(JSON.stringify({ movie }));
			return;
		} catch (error) {
			console.error(error);
			res.writeHead(400, { "Content-Type": "application/json" });
			res.end(JSON.stringify(error));
		}
	} else {
		res.writeHead(404, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Route not found" }));
	}
});

server.listen(8080, () => {
	console.log("Server running on http://localhost:8080");
});
