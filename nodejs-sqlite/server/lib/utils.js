export function handleGetTodos(req, res) {
	try {
		const todos = getTodos();
		res.writeHead(200, { "Content-Type": "application/json" });
		res.end(JSON.stringify(todos));
	} catch (error) {
		console.error(error);
		res.writeHead(500);
		res.end(JSON.stringify({ error: "Failed to fetch todos" }));
	}
}

export async function handleAddTodo(req, res) {
	try {
		const data = await parseJsonBody(req);
		addTodo(data.title);
		res.writeHead(201, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ message: "Todo added successfully" }));
	} catch (err) {
		res.writeHead(400, { "Content-Type": "application/json" });
		res.end(JSON.stringify({ error: "Invalid JSON" }));
	}
}

function parseJsonBody(req) {
	return new Promise((resolve, reject) => {
		let body = "";
		req.on("data", (chunk) => (body += chunk));
		req.on("end", () => {
			try {
				resolve(JSON.parse(body));
			} catch (error) {
				reject(error);
			}
		});
		req.on("error", reject);
	});
}

export function matchRoute(method, pathname) {
	const methodRoutes = routes[method];
	if (!methodRoutes) return null;

	for (const routePath in methodRoutes) {
		const routeParts = routePath.split("/").filter(Boolean);
		const pathParts = pathname.split("/").filter(Boolean);

		if (routeParts.length !== pathParts.length) continue;

		const params = {};
		let match = true;

		for (let i = 0; i < routeParts.length; i++) {
			if (routeParts[i].startsWith(":")) {
				const paramName = routeParts[i].slice(1);
				params[paramName] = pathParts[i];
			} else if (routeParts[i] !== pathParts[i]) {
				match = false;
				break;
			}
		}

		if (match) return { handler: methodRoutes[routePath], params };
	}

	return null;
}
