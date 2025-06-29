import { validateName, validateEmail, validatePassword, validateCheked } from "./validations.js";

const nameContainer = document.getElementById("name-input");
const emailContainer = document.getElementById("email-input");
const passwordContainer = document.getElementById("password-input");
const confirmPasswordContainer = document.getElementById("confirm-password-input");
const checkboxContainer = document.getElementById("checkbox-input");
const form = document.querySelector(".signup-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const checkboxInput = document.getElementById("checkbox");

const errors = {
	name: "",
	email: "",
	password: "",
	confirmPassword: "",
	checked: false,
};

let isSubmitting = false;

form.addEventListener("submit", (e) => {
	e.preventDefault();
	isSubmitting = true;
	const formdata = new FormData(e.currentTarget);

	const nameValue = nameInput.value.trim();
	const emailValue = emailInput.value.trim();
	const passwordValue = passwordInput.value;
	const confirmPasswordValue = confirmPasswordInput.value;
	const checkboxChecked = checkboxInput.checked;

	errors.name = validateName(nameValue);
	errors.email = validateEmail(emailValue);
	errors.password = validatePassword(passwordValue);
	errors.confirmPassword =
		!confirmPasswordValue || passwordValue !== confirmPasswordValue
			? "Passwords do not match"
			: null;
	errors.checked = validateCheked(checkboxChecked);

	errors.name && showError(nameContainer, errors.name);
	errors.email && showError(emailContainer, errors.email);
	errors.password && showError(passwordContainer, errors.password);
	errors.confirmPassword && showError(confirmPasswordContainer, errors.confirmPassword);
	errors.checked && showError(checkboxContainer, errors.checked);

	const hasErrors = Object.values(errors).some((error) => error !== null);
	if (hasErrors) {
		return;
	}

	console.log(errors);

	const data = {
		name: formdata.get("name"),
		email: formdata.get("email"),
		password: formdata.get("password"),
		confirmPassword: formdata.get("confirmPassword"),
		checkbox: formdata.get("checkbox"),
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
inputs.forEach((input) =>
	input.addEventListener("input", () => {
		if (input.id) {
			errors[input.id] = "";
		}
		const container = input.closest(".form-group");
		const errorEl = container?.querySelector(".error");
		errorEl?.remove();
	})
);
