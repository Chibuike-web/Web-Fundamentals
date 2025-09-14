const btnOpenDialog = document.getElementById("btnOpenDialog");
const dialog = document.getElementById("subscribeDialog");
const btnCancel = document.getElementById("btnCancel");
const form = document.getElementById("form");

btnOpenDialog.addEventListener("click", () => {
	dialog.showModal();
});

dialog.addEventListener("click", (event) => {
	const rect = dialog.getBoundingClientRect();
	const isInDialog =
		event.clientX >= rect.left &&
		event.clientX <= rect.right &&
		event.clientY >= rect.top &&
		event.clientY <= rect.bottom;

	if (!isInDialog) {
		dialog.close();
	}
});

btnCancel.addEventListener("click", () => {
	dialog.close();
});

form.addEventListener("submit", (e) => {
	e.preventDefault();
});
