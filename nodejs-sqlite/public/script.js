/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

const root = document.getElementById("app");
const input = /** @type {HTMLInputElement} */ (document.getElementById("input"));
const addTodoBtn = document.getElementById("add-todo");

/** @type {Todo[]} */
const initialTodoList = [
	{
		id: crypto.randomUUID(),
		text: "Go to shop",
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Go to gym",
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Go to restuarant",
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Go for a work",
		completed: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Go to shop",
		completed: false,
	},
];

/** @type {Todo[]} */
const storedTodos = JSON.parse(localStorage.getItem("todo"));
let todoList;

if (storedTodos) {
	todoList = storedTodos;
} else {
	todoList = initialTodoList;
	localStorage.setItem("todo", JSON.stringify(initialTodoList));
}

const lists = document.createElement("ul");
lists.className = "todos-container";

function render() {
	todoList.forEach(({ id, text, completed }) => {
		const todo = document.getElementById(`todo-${id}`);
		if (!todo) {
			const listItem = document.createElement("li");
			listItem.id = `todo-${id}`;
			const leftContainer = document.createElement("div");
			leftContainer.className = "left-container";
			const checkInput = document.createElement("input");
			checkInput.type = "checkbox";
			checkInput.id = `checkbox-${id}`;
			checkInput.checked = completed;

			const textValue = document.createElement("p");
			textValue.textContent = text;
			if (completed) textValue.classList.add("muted");
			leftContainer.appendChild(checkInput);
			leftContainer.appendChild(textValue);
			listItem.appendChild(leftContainer);

			const rightContainer = document.createElement("div");
			rightContainer.className = "right-container";
			const editBtn = document.createElement("button");
			editBtn.textContent = "Edit";
			editBtn.className = "edit-btn";
			const deleteBtn = document.createElement("button");
			deleteBtn.textContent = "Delete";
			deleteBtn.className = "delete-btn";
			rightContainer.appendChild(editBtn);
			rightContainer.appendChild(deleteBtn);
			listItem.appendChild(rightContainer);
			lists.appendChild(listItem);
		}
		if (todo) {
			const p = todo.querySelector("p");
			console.log(p);
		}
	});
}

root.appendChild(lists);
render();

addTodoBtn.onclick = () => {
	const inputValue = input.value.trim();
	if (!inputValue) return;
	const newTodo = {
		id: crypto.randomUUID(),
		text: inputValue,
		completed: false,
	};

	todoList.push(newTodo);
	input.value = "";
	localStorage.setItem("todo", JSON.stringify(todoList));
	render();
};

root.addEventListener("click", (e) => {
	const target = /** @type {HTMLElement} */ (e.target);
	if (target.classList.contains("delete-btn")) {
		const deleteBtn = e.target;
		const todo = /** @type {HTMLElement} */ (deleteBtn).closest("li");
		const rawId = todo.id.replace("todo-", "");
		todo.remove();

		todoList = todoList.filter((/** @type {Todo} */ item) => item.id !== rawId);
		localStorage.setItem("todo", JSON.stringify(todoList));
	}

	if (target.classList.contains("edit-btn")) {
		const editBtn = e.target;
		const todo = /** @type {HTMLElement} */ (editBtn).closest("li");
		const rawId = todo.id.replace("todo-", "");

		const leftContainer = /** @type {HTMLElement | null} */ (todo.querySelector(".left-container"));
		const rightContainer = /** @type {HTMLElement | null} */ (
			todo.querySelector(".right-container")
		);

		const p = leftContainer.querySelector("p");
		if (p) p.classList.add("hide");
		if (rightContainer) rightContainer.classList.add("hide");

		const editInput = document.createElement("input");
		editInput.type = "text";
		editInput.className = "edit-input";
		editInput.value = p.textContent.trim() || "";
		todo.appendChild(editInput);
		editInput.focus();

		const btnContainer = document.createElement("div");

		const saveBtn = document.createElement("button");
		saveBtn.className = "save-btn";
		saveBtn.textContent = "Save";
		btnContainer.appendChild(saveBtn);
		btnContainer.className = "right-container";

		const cancelBtn = document.createElement("button");
		cancelBtn.className = "cancel-btn";
		cancelBtn.textContent = "Cancel";
		btnContainer.appendChild(cancelBtn);
		cancelBtn.onclick = () => {
			cleanupEdit();
		};

		saveBtn.onclick = () => {
			const newTitle = editInput.value.trim();
			if (newTitle === "") {
				alert("Todo cannot be empty");
				return;
			}
			todoList = todoList.map((item) => (item.id === rawId ? { ...item, text: newTitle } : item));
			localStorage.setItem("todo", JSON.stringify(todoList));
			if (p) p.textContent = newTitle;
			cleanupEdit();
		};
		todo.appendChild(btnContainer);

		function cleanupEdit() {
			editInput.remove();
			saveBtn.remove();
			cancelBtn.remove();
			if (p) p.classList.remove("hide");
			if (rightContainer) rightContainer.classList.remove("hide");
		}
	}
});

root.addEventListener("change", (e) => {
	const target = /** @type {HTMLInputElement} */ (e.target);
	if (target.type === "checkbox") {
		const todo = target.closest("li");
		const rawId = todo.id.replace("todo-", "");
		todoList = todoList.map((item) =>
			item.id === rawId ? { ...item, completed: target.checked } : item
		);

		localStorage.setItem("todo", JSON.stringify(todoList));
		const p = todo.querySelector("p");
		if (p) {
			if (target.checked) p.classList.add("muted");
			else p.classList.remove("muted");
		}
	}
});
