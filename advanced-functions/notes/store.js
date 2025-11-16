export function createStore() {
	let notes = [];

	function add(text) {
		notes.push({ id: crypto.randomUUID(), text });
	}

	function get() {
		return notes;
	}

	return { add, get };
}
