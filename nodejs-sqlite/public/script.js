/**
 * @typedef {Object} Todo
 * @property {string} id
 * @property {string} text
 * @property {boolean} completed
 */

const root = document.getElementById("app");
const input = document.getElementById("input");
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
		if (todo) {
			return;
		}
		const listItem = document.createElement("li");
		listItem.id = `todo-${id}`;
		const leftContainer = document.createElement("div");
		const checkInput = document.createElement("input");
		checkInput.type = "checkbox";
		const textValue = document.createElement("p");
		textValue.textContent = text;
		leftContainer.appendChild(checkInput);
		leftContainer.appendChild(textValue);
		listItem.appendChild(leftContainer);

		const rightContainer = document.createElement("div");
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
	});
}
render();
root.appendChild(lists);

function addTodo() {
	/** @type {HTMLInputElement} */
	const inputEl = /** @type {HTMLInputElement} */ (input);
	const inputValue = inputEl.value.trim();

	if (!inputValue) return;

	const newTodo = {
		id: crypto.randomUUID(),
		text: inputValue,
		completed: false,
	};

	todoList.push(newTodo);
	localStorage.setItem("todo", JSON.stringify(todoList));
	inputEl.value = "";
}

addTodoBtn.onclick = () => {
	addTodo();
	render();
};

root.addEventListener("click", (e) => {
	e.preventDefault();
	const target = /** @type {HTMLElement} */ (e.target);
	if (target.classList.contains("delete-btn")) {
		const deleteBtn = e.target;
		const todo = /** @type {HTMLElement} */ (deleteBtn).closest("li");
		const id = todo.id;
		todo.remove();

		const rawId = id.replace("todo-", "");

		todoList = todoList.filter((/** @type {Todo} */ item) => item.id !== rawId);
		localStorage.setItem("todo", JSON.stringify(todoList));
	}
});
