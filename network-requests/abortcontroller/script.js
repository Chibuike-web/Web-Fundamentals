const form = document.getElementById("search");
const termInput = document.getElementById("term");
const error = document.getElementById("error");
const loading = document.getElementById("loading");
const resultsContainer = document.getElementById("searchResult");

let controller = new AbortController();

const search = async (term) => {
	console.log("Abort the previous request");
	controller.abort();

	controller = new AbortController();
	const signal = controller.signal;
	const url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info|extracts&inprop=url&utf8=&format=json&origin=*&srsearch=${term}`;
	const response = await fetch(url, { signal });
	const data = await response.json();
	return data.query.search;
};

const handleSubmit = async (e) => {
	e.preventDefault();

	error.innerHTML = "";
	loading.innerHTML = "";
	resultsContainer.innerHTML = "";

	const term = termInput.value;
	if (!term.trim()) return;

	try {
		loading.innerHTML = "Loading...";
		const results = await search(term);
		resultsContainer.innerHTML = renderSearchResult(results);
	} catch (error) {
		error.innerHTML = "Something went wrong.";
		console.error(error);
	} finally {
		loading.innerHTML = "";
	}
};

function renderSearchResult(results) {
	return results
		.map(({ title, snippet, pageid }) => {
			return `
        <article>
          <a href="https://en.wikipedia.org/?curid=${pageid}">
            <h2>${title}</h2>
          </a>
          <div class="summary">${snippet}...</div>
        </article>`;
		})
		.join("");
}

form.addEventListener("submit", handleSubmit);
