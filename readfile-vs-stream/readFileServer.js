import { createServer } from "http";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;
	console.log(pathname);

	if (pathname === "/") {
		serveStatic(path.join(__dirname, "public", "index.html"), res, "text/html");
		return;
	}

	if (pathname.endsWith(".css")) {
		serveStatic(path.join(__dirname, "public", pathname), res, "text/css");
		return;
	}

	if (pathname.endsWith(".html")) {
		serveStatic(path.join(__dirname, "public", pathname), res, "text/html");
		return;
	}
});

server.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});

function serveStatic(filePath, res, contentType) {
	try {
		const data = readFileSync(filePath);
		res.writeHead(200, { "Content-Type": contentType });
		res.end(data);
	} catch (err) {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not Found");
	}
}
