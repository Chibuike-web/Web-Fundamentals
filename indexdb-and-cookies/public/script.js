const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");
const addNoteBtn = document.getElementById("add-note-btn");

const notes = [];

function render() {
	notesContainer.innerHTML = "";
	const textInput = noteInput.value;
	const newNote = {
		id: crypto.randomUUID(),
		text: textInput,
	};
	notes.push(newNote);
	notesContainer.innerHTML = notes
		.map((note) => `<li id="note-${note.id}">${note.text}</li>`)
		.join("");
}

addNoteBtn.addEventListener("click", () => {
	if (!noteInput.value) {
		console.error("Empty input");
		return;
	}
	render();
	noteInput.value = "";
});

async function getUser() {
	const res = await fetch("http://localhost:4284/user", {
		method: "GET",
		credentials: "include",
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error("Issue fetching user");
	}
	console.log(data);
}

getUser();
