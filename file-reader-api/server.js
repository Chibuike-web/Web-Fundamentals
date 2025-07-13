import { createServer } from "http";
import { parseMultipartRequest, MultipartParseError } from "@mjackson/multipart-parser/node";
import path from "path";
import { mkdir } from "fs/promises";
import { writeFileSync } from "fs";

const server = createServer((req, res) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

	if (req.method === "OPTIONS") {
		res.writeHead(204);
		res.end();
		return;
	}

	const uploadDir = path.resolve("uploads");

	const url = new URL(req.url, `http://${req.headers.host}`);
	const pathname = url.pathname;

	async function handleRequest() {
		if (req.method === "POST" && pathname === "/upload") {
			try {
				await mkdir(uploadDir, { recursive: true });
				for await (const part of parseMultipartRequest(req)) {
					if (part.isFile) {
						let arrayBuffer = part.arrayBuffer;
						const buffer = Buffer.from(arrayBuffer);
						console.log(`File received: ${part.filename} (${buffer.byteLength} bytes)`);
						console.log(`Content type: ${part.mediaType}`);
						console.log(`Field name: ${part.name}`);
						const savePath = path.join(uploadDir, part.filename);
						saveFile(savePath, buffer);
					} else {
						let text = part.text;
						console.log(`Field received: ${part.name} = ${JSON.stringify(text)}`);
					}
				}
				res.writeHead(200, { "Content-Type": "application/json" });
				res.end(JSON.stringify({ message: "Upload successful" }));
			} catch (err) {
				console.error(err);
				if (err instanceof MultipartParseError) {
					res.writeHead(400);
					res.end("Invalid multipart data");
				} else {
					res.writeHead(500);
					res.end("Server error");
				}
			}
		} else {
			res.writeHead(400, { "Content-Type": "text/plain" });
			res.end("Issue fetching image");
		}
	}

	handleRequest();
});

server.listen(3000, () => {
	console.log("Server running at http://localhost:3000");
});

const saveFile = (savePath, buffer) => {
	try {
		writeFileSync(savePath, buffer);
		console.log("File written successfully");
	} catch (err) {
		console.error("Failed to write file:", err);
	}
};
