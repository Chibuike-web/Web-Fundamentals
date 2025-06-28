const routes = [
	{
		content: `<section id="home">
	<h1>Welcome to the Home Page</h1>
	<p>This is a simple vanilla JavaScript router example. Click the links above to navigate.</p>
</section>`,
		link: "/",
	},
	{
		content: `<section id="about">
	<h1>About Us</h1>
	<p>
		We are building a minimal router using plain JavaScript to understand how client-side routing
		works.
	</p>
</section>`,
		link: "/about",
	},
	{
		content: `<section id="contact">
	<h1>Contact Us</h1>
	<p>
		If you have any questions, feel free to reach out via email at
		<a href="mailto:info@example.com">info@example.com</a>.
	</p>
</section>
`,
		link: "/contact",
	},
];

const render = () => {
	const path = location.pathname;
	const match = routes.find((r) => r.link === path);

	if (match) {
		document.getElementById("app").innerHTML = match.content;
	} else {
		document.body.innerHTML = "<h1>404 - Page Not Found</h1>";
	}
	updateActiveLink();
};

const updateActiveLink = () => {
	const links = document.querySelectorAll("[data-link]");
	links.forEach((l) => l.classList.remove("active"));

	const active = Array.from(links).find((l) => l.pathname === location.pathname);
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
