import { readFile } from "fs";
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
	const path = parsedUrl.pathname;

	if (req.method === "GET" && (path === "/" || path === "/index.html")) {
		serveHTML("./views/index.html", res);
	} else if (req.method === "GET" && path === "/home") {
		serveHTML("./views/home.html", res);
	} else if (req.method === "GET" && path === "/contact") {
		serveHTML("./views/contact.html", res);
	} else if (req.method === "GET" && path === "/about") {
		serveHTML("./views/about.html", res);
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
	}
});

server.listen(3001, () => {
	console.log("Server running on http://localhost:3001");
});
