const nameInput = document.getElementById("name-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const confirmPasswordInput = document.getElementById("confirm-password-input");
const checkboxInput = document.getElementById("checkbox-input");
const form = document.querySelector(".signup-form");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	const formdata = new FormData(e.currentTarget);
	const data = {
		name: formdata.get("name"),
		email: formdata.get("email"),
		password: formdata.get("password"),
		confirmPassword: formdata.get("confirmPassword"),
		checkbox: formdata.get("checkbox"),
	};
	console.log(data);
	form.reset();
});
