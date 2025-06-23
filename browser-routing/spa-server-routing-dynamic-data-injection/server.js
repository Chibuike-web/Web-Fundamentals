import { readFile, createReadStream } from "fs";
import http from "http";

const serveHTML = (filePath, res) => {
	readFile(filePath, (err, data) => {
		if (err) {
			res.writeHead(500, { "Content-Type": "text/plain" });
			res.end("Server error");
			return;
		}
		res.writeHead(200, { "Content-Type": "text/html" });
		res.end(data);
	});
};

const server = http.createServer((req, res) => {
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const pathname = parsedUrl.pathname;
});

server.listen(3003, () => {
	console.log("Server running on http://localhost:3003");
});
