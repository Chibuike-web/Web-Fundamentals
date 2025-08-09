if (Notification.permission === "granted") {
	showNotification();
} else if (Notification.permission !== "denied") {
	Notification.requestPermission().then((permission) => {
		if (permission === "granted") {
			showNotification();
		} else {
			showError();
		}
	});
}

function showNotification() {
	const notification = new Notification("JavaScript Notification API", {
		body: "This is a JavaScript Notification API demo",
		icon: "./img/js.png",
	});

	setTimeout(() => {
		notification.close();
	}, 10 * 1000);

	notification.addEventListener("click", () => {
		window.open("https://www.javascripttutorial.net/web-apis/javascript-notification/", "_blank");
	});
}

function showError() {
	const error = document.querySelector(".error");
	error.style.display = "block";
	error.textContent = "You blocked the notifications";
}
