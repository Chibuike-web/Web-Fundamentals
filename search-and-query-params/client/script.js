const movieTitle = document.getElementById("movie-title");
const movieYear = document.getElementById("movie-year");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", (e) => {
	e.preventDefault();
	const params = new URLSearchParams();

	const titleInput = movieTitle.value.trim();
	const yearInput = movieYear.value.trim();

	if (titleInput) {
		params.append("title", titleInput);
	}

	if (yearInput) {
		params.append("year", yearInput);
	}

	console.log(window.location.pathname);
	window.location.search = params.toString();
});
