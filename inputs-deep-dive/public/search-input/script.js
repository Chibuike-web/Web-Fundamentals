const searchInputWrapper = document.getElementById("search-input-wrapper");

searchInputWrapper.addEventListener("submit", (e) => {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	console.log(formData?.get("search-input"));
});
