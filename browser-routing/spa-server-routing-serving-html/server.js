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

	if (pathname === "/" || pathname === "/index.html") {
		serveHTML("./views/index.html", res);
	} else if (pathname === "/public/style.css") {
		res.writeHead(200, { "Content-Type": "text/css" });
		createReadStream("./public/style.css").pipe(res);
	} else if (pathname === "/public/script.js") {
		res.writeHead(200, { "Content-Type": "application/javascript" });
		createReadStream("./public/script.js").pipe(res);
	} else if (["/home", "/about", "/contact"].includes(pathname)) {
		serveHTML(`./views${pathname}.html`, res);
	} else {
		res.writeHead(404, { "Content-Type": "text/plain" });
		res.end("Not found");
	}
});

server.listen(3003, () => {
	console.log("Server running on http://localhost:3003");
});
