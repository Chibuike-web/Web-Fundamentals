import { readFile } from "fs";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serveHTML = (res) => {
	readFile(path.join(__dirname, "public", "index.html"), (err, data) => {
		if (err) {
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Server error");
			return;
		}
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(data);
	});
};

const serveStatic = (filePath, res, contentType) => {
	readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(404, { "Content-Type": "text/plain" });
			res.end("Not Found");
			return;
		}
		res.writeHead(200, { "Content-Type": contentType });
		res.end(data);
	});
};

const server = http.createServer((req, res) => {
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const routePath = parsedUrl.pathname;
	console.log(routePath);

	if (routePath.endsWith(".css")) {
		serveStatic(path.join(__dirname, "public", routePath), res, "text/css");
		return;
	}
	if (routePath.endsWith(".js")) {
		serveStatic(path.join(__dirname, "public", routePath), res, "application/javascript");
		return;
	}
	if (req.method === "GET") {
		serveHTML(res);
	}
});

server.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
