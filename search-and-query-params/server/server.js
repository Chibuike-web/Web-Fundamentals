import http from "http";

const server = http.createServer((req, res) => {
	const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
	const path = parsedUrl.pathname;

	if (path === "/favicon.ico") {
		res.writeHead(204);
		res.end();
		return;
	}

	const query = Object.fromEntries(parsedUrl.searchParams.entries());
	console.log(path, query);

	res.writeHead(200, { "Content-Type": "application/json" });
	res.end(JSON.stringify({ path, query }));
});

server.listen(3000, () => {
	console.log("Server running on http://localhost:3000");
});
