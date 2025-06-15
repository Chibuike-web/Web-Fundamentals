const routes = ["/", "/about", "/contact"];

const render = () => {
	const path = location.pathname === "/home.html" ? "/" : location.pathname;
	const match = routes.find((r) => r === path);

	if (match === "/") {
		fetch("/home.html")
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.text();
			})
			.then((html) => {
				document.body.innerHTML = html;
			})
			.catch((error) => {
				console.error("Failed to fetch HTML:", error);
			});
	} else if (match) {
		fetch(`/routes${path}.html`)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`HTTP error! status: ${res.status}`);
				}
				return res.text();
			})
			.then((html) => {
				document.getElementById("app").innerHTML = html;
			})
			.catch((error) => {
				console.error("Failed to fetch HTML:", error);
			});
	} else {
		document.body.innerHTML = "<h1>404 - Page Not Found</h1>";
	}
};

const navigate = (url) => {
	history.pushState(null, null, url);
	render();
};

document.addEventListener("DOMContentLoaded", render);
document.addEventListener("click", (e) => {
	if (e.target.matches("[data-link]")) {
		e.preventDefault();
		navigate(e.target.href);
	}
});

window.addEventListener("popstate", render);
