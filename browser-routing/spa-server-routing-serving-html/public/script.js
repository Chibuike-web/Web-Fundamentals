const routes = ["/", "/home", "/about", "/contact"];

const render = () => {
	const path = location.pathname === "/" ? "/home" : location.pathname;
	const match = routes.find((r) => r === path);

	if (match) {
		fetch(`/views${path}.html`)
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
				console.log("Failed to fetch HTML:", error);
			});
	} else {
		document.body.innerHTML = "<h1>404 - Page Not Found</h1>";
	}
	updateActiveLink();
};

const updateActiveLink = () => {
	const links = document.querySelectorAll("[data-link]");
	links.forEach((l) => l.classList.remove("active"));

	const effectivePath = location.pathname === "/" ? "/home" : location.pathname;

	const active = Array.from(links).find((l) => l.pathname === effectivePath);
	if (active) active.classList.add("active");
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
