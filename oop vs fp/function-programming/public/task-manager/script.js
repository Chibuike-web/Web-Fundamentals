const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

const tasks = [];

function renderList() {
	taskList.innerHTML = tasks
		.map((task) => {
			return `
        <li class="task-item">
        <div class="task" data-id="${task.id}">
            <p class="task-name">${task.name}</p>
            <div class="task-actions original-actions">
              <button class="edit-task" data-id="${task.id}">Edit</button>
              <button class="delete-task" data-id="${task.id}">Delete</button>
            </div>
        </div>
        </li>
      `;
		})
		.join("");
}

renderList();

addTaskBtn.addEventListener("click", (e) => {
	e.preventDefault();
	createTask();
	renderList();
});

taskList.addEventListener("click", (e) => {
	const taskId = e.target.dataset.id;
	if (!taskId) return;

	if (e.target.classList.contains("delete-task")) {
		deleteTask(taskId);
		renderList();
	}

	if (e.target.classList.contains("edit-task")) {
		editTask(taskId);
	}

	if (e.target.classList.contains("save-edit")) {
		saveEdit(taskId);
		renderList();
	}

	if (e.target.classList.contains("cancel-edit")) {
		renderList();
	}
});

function createTask() {
	const value = taskInput.value.trim();
	if (!value) {
		return;
	}

	const newTask = {
		id: crypto.randomUUID(),
		name: value,
		completed: false,
	};
	tasks.push(newTask);
	taskInput.value = "";
}

function editTask(id) {
	const taskDiv = document.querySelector(`.task[data-id="${id}"]`);
	const taskObj = tasks.find((t) => t.id === id);
	const taskName = taskDiv.querySelector(".task-name");
	const originalActions = taskDiv.querySelector(".original-actions");
	taskName.classList.add("hide");
	originalActions.classList.add("hide");

	const editInput = document.createElement("input");
	editInput.type = "text";
	editInput.className = "edit-input";
	editInput.value = taskObj.name;

	const taskActions = document.createElement("div");
	taskActions.className = "task-actions";

	taskActions.innerHTML = `
      <button class="cancel-edit" data-id="${taskObj.id}">Cancel</button>
      <button class="save-edit" data-id="${taskObj.id}">Save</button>
  `;
	taskDiv.appendChild(editInput);
	taskDiv.appendChild(taskActions);
}

function saveEdit(id) {
	const taskDiv = document.querySelector(`.task[data-id="${id}"]`);
	const editInput = taskDiv.querySelector(".edit-input");
	const newName = editInput.value.trim();

	if (newName) {
		const taskObj = tasks.find((t) => t.id === id);
		if (taskObj) {
			taskObj.name = newName;
		}
	}
}

function deleteTask(id) {
	const index = tasks.findIndex((t) => t.id === id);
	console.log(index);
	if (index !== -1) {
		tasks.splice(index, 1);
	}
}
