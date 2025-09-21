import { createReadStream } from "fs";
import { readFile } from "fs/promises";
import http from "http";

const serveHTML = async (filePath, res) => {
	try {
		const data = await readFile(filePath);
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(data);
	} catch (err) {
		res.writeHead(500, { "Content-Type": "text/plain" });
		res.end("Server error");
		return;
	}
};

const server = http.createServer((req, res) => {
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const pathname = parsedUrl.pathname;

	if (pathname === "/public/style.css") {
		res.writeHead(200, { "Content-Type": "text/css" });
		createReadStream("./public/style.css").pipe(res);
		return;
	}
	if (pathname === "/public/script.js") {
		res.writeHead(200, { "Content-Type": "application/javascript" });
		createReadStream("./public/script.js").pipe(res);
		return;
	}

	if (pathname.startsWith("/views/")) {
		res.writeHead(200, { "Content-Type": "text/html" });
		createReadStream(`.${pathname}`).pipe(res);
		return;
	}

	serveHTML(`./public/index.html`, res);
});

server.listen(3003, () => {
	console.log("Server running on http://localhost:3003");
});
