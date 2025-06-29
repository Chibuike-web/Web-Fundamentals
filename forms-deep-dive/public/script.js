import { validateName, validateEmail, validatePassword, validateCheked } from "./validations.js";

const nameContainer = document.getElementById("name-input");
const emailContainer = document.getElementById("email-input");
const passwordContainer = document.getElementById("password-input");
const confirmPasswordContainer = document.getElementById("confirm-password-input");
const checkboxContainer = document.getElementById("checkbox-input");
const form = document.querySelector(".signup-form");

const errors = {
	name: null,
	email: null,
	password: null,
	confirmPassword: null,
	checked: null,
};

let isSubmitting = false;

form.addEventListener("submit", (e) => {
	e.preventDefault();
	isSubmitting = true;
	const formdata = new FormData(e.currentTarget);
	const name = formdata.get("name");
	const email = formdata.get("email");
	const password = formdata.get("password");
	const confirmPassword = formdata.get("confirmPassword");
	const checkbox = formdata.get("checkbox");

	errors.name = validateName(name);
	errors.email = validateEmail(email);
	errors.password = validatePassword(password);
	errors.confirmPassword =
		!confirmPassword || password !== confirmPassword ? "Passwords do not match" : null;
	errors.checked = validateCheked(checkbox);

	errors.name && showError(nameContainer, errors.name);
	errors.email && showError(emailContainer, errors.email);
	errors.password && showError(passwordContainer, errors.password);
	errors.confirmPassword && showError(confirmPasswordContainer, errors.confirmPassword);
	errors.checked && showError(checkboxContainer, errors.checked);

	const hasErrors = Object.values(errors).some((error) => error !== null);
	if (hasErrors) {
		return;
	}

	const data = {
		name,
		email,
		password,
		confirmPassword,
		checkbox,
	};
	console.log(data);
	isSubmitting = false;
	form.reset();
});

function showError(container, message) {
	if (!container.querySelector(".error")) {
		const error = document.createElement("p");
		error.classList.add("error");
		error.textContent = message;
		container.append(error);
	}
}

const inputs = document.querySelectorAll("input");
inputs.forEach((input) => {
	input.addEventListener("input", () => {
		if (input.id) {
			errors[input.id] = null;
		}
		const container = input.closest(".form-group");
		const errorEl = container?.querySelector(".error");
		errorEl?.remove();
	});

	input.addEventListener("blur", () => {
		const container = input.closest(".form-group");
		let error = "";

		switch (input.name) {
			case "name":
				error = validateName(input.value);
				break;
			case "email":
				error = validateEmail(input.value);
				break;
			case "password":
				error = validatePassword(input.value);
		}

		if (error) {
			showError(container, error);
			errors[input.id] = error;
		}
	});
});
