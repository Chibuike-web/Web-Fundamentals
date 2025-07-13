import { createServer } from "http";
import { createReadStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = createServer((req, res) => {
	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;
	console.log(pathname);
	if (pathname === "/") {
		serveStream(path.join(__dirname, "public", "index.html"), res, "text/html");
		return;
	}

	if (pathname.endsWith(".css")) {
		serveStream(path.join(__dirname, "public", pathname), res, "text/css");
		return;
	}

	if (pathname.endsWith(".html")) {
		serveStream(path.join(__dirname, "public", pathname), res, "text/html");
		return;
	}
});

server.listen(3022, () => {
	console.log("Server running at http://localhost:3022");
});

function serveStream(filePath, res, contentType) {
	const stream = createReadStream(filePath);
	stream.on("error", () => {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
		return;
	});
	stream.on("open", () => {
		res.writeHead(200, { "Content-Type": contentType });
		stream.pipe(res);
	});
}
