const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");
const addNoteBtn = document.getElementById("add-note-btn");

async function getUser() {
	try {
		const res = await fetch("http://localhost:4284/user", {
			method: "GET",
			credentials: "include",
		});

		if (!res.ok) {
			console.log("Not ok:", res.status);
			location.href = "signup.html";
			return;
		}
		document.getElementById("loading").style.display = "none";
		const data = await res.json();
		console.log(data);

		await displayNotes();
	} catch (err) {
		console.error("Network error:", err);
		location.href = "signup.html";
	}
}

getUser();

(function getDB() {
	if (!window.indexedDB) {
		console.log("Your browser doesn't support support IndexDB");
		return;
	}
})();

async function render() {
	const textInput = noteInput.value;

	const newNote = {
		id: crypto.randomUUID(),
		text: textInput,
		synced: false,
		updatedAt: Date.now(),
	};

	await addNoteToDB(newNote);
	await displayNotes();
}

async function displayNotes() {
	const notes = await getAllNotes();
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

function openDB() {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("notesDB", 1);

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			if (!db.objectStoreNames.contains("notes")) {
				db.createObjectStore("notes", { keyPath: "id" });
			}
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
}

async function addNoteToDB(note) {
	try {
		const db = await openDB();
		const txn = db.transaction("notes", "readwrite");
		const store = txn.objectStore("notes");

		const result = await new Promise((resolve, reject) => {
			const query = store.put(note);
			query.onsuccess = (event) => {
				console.log("Note added successfully");
				resolve(event.target.result);
			};
			query.onerror = (event) => {
				console.error("Error adding note:", event.target.error);
				reject(event.target.error);
			};
		});

		txn.oncomplete = () => {
			console.log("Transaction completed, DB closed");
			db.close();
		};
		return result;
	} catch (error) {
		console.error("Failed to add note:", error);
	}
}

async function getAllNotes() {
	try {
		const db = await openDB();
		const txn = db.transaction("notes", "readonly");
		const store = txn.objectStore("notes");

		const result = await new Promise((resolve, reject) => {
			const query = store.getAll();

			query.onsuccess = (event) => {
				console.log("All notes");
				resolve(event.target.result);
			};
			query.onerror = (event) => {
				console.error("Error fetching notes:", event.target.error);
				reject(event.target.error);
			};
		});

		txn.oncomplete = () => {
			console.log("Transaction completed, DB closed");
			db.close();
		};
		return result;
	} catch (error) {
		console.error("Failed to fetch notes:", error);
	}
}

window.addEventListener("online", syncNotes);

async function syncNotes() {
	const notes = await getAllNotes();

	for (const note of notes) {
		if (!note.synced) {
			try {
				const res = await fetch("http://localhost:4284/notes", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(note),
				});
				if (!res.ok) {
					throw new Error("Issue syncing to db");
				}
				note.synced = true;
				await addNoteToDB(note);
			} catch (error) {
				console.error("Sync failed for note:", note.id);
			}
		}
	}
	await displayNotes();
}

if (navigator.onLine) {
	console.log("Currently online");
} else {
	console.log("Currently offline");
}

setInterval(() => {
	if (navigator.onLine) syncNotes();
}, 30000);
