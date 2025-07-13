export function validateName(name) {
	if (!name.trim()) return "First name is required";
	return null;
}

export function validateEmail(email) {
	if (!email.trim()) return "Email is required";
	if (email.length < 6) return "Email should be minimum 6 characters";
	if (email.includes(" ")) return "Email cannot contain spaces";
	if (!email.includes("@")) return "Email must contain @";
	return null;
}

export function validatePassword(password) {
	if (!password) return "Password is required";
	if (password.length < 8) return "Password must be at least 8 characters";
	return null;
}

export function validateCheked(checked) {
	if (!checked) return "You must accept the terms and conditions";
	return null;
}
