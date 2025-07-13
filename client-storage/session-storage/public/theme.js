const MOON = "🌙";
const SUN = "☀️";
const DARK_MODE = "dark";
const LIGHT_MODE = "light";
const DEFAULT_MODE = DARK_MODE;

const btn = document.querySelector("#theme-switcher");

init();

function setMode(mode = DEFAULT_MODE) {
	if (mode === DARK_MODE) {
		btn.textContent = SUN;
		document.body.classList.add(DARK_MODE);
	} else if (mode === LIGHT_MODE) {
		btn.textContent = MOON;
		document.body.classList.remove(DARK_MODE);
	}
}

function init() {
	let storedMode = sessionStorage.getItem("mode");
	if (!storedMode) {
		storedMode = DEFAULT_MODE;
		sessionStorage.setItem("mode", DEFAULT_MODE);
	}
	setMode(storedMode);
}

btn.addEventListener("click", () => {
	let mode = sessionStorage.getItem("mode");

	if (mode) {
		let newMode = mode === DARK_MODE ? LIGHT_MODE : DARK_MODE;
		setMode(newMode);
		sessionStorage.setItem("mode", newMode);
	}
});
