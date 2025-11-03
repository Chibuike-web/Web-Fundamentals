const movieTitle = document.getElementById("movie-title");
const movieYear = document.getElementById("movie-year");
const searchBtn = document.getElementById("search-btn");
const resultsContainer = document.createElement("div");
resultsContainer.className = "movie-list";
document.getElementById("app").appendChild(resultsContainer);

searchBtn.addEventListener("click", async (e) => {
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

	resultsContainer.innerHTML = "";

	if (!titleInput && !yearInput) {
		renderError("Enter either the title or year");
		return;
	}

	// Update URL query params
	window.history.replaceState(null, "", `?${params.toString()}`);

	try {
		const res = await fetch(`http://localhost:8080/movies?${params.toString()}`);

		if (!res.ok) {
			throw new Error(`Server responded with status: ${res.status}`);
		}

		const data = await res.json();

		renderMovies(data.movie);
		movieTitle.value = "";
		movieYear.value = "";
	} catch (error) {
		renderError(`Error fetching movies`);
	}
});

function renderMovies(movies) {
	if (!movies.length) {
		resultsContainer.innerHTML = `<p>No movies found</p>`;
		return;
	}

	const movieList = movies
		.map(
			(m) => `
      <div class="movie">
        <img src="${m.image}" alt="${m.title}" />
        <h2>${m.title}</h2>
        <p>${m.year}</p>
      </div>
    `
		)
		.join("");

	resultsContainer.innerHTML = movieList;
}

function renderError(message) {
	resultsContainer.innerHTML = `<p class="error">${message}</p>`;
}
