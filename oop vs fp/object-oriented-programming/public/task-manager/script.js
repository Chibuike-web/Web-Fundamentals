const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

class TaskManager {
	constructor() {
		this.tasks = [];
	}

	createTask() {
		const value = taskInput.value.trim();
		if (!value) return;

		const newTask = {
			id: crypto.randomUUID(),
			name: value,
			completed: false,
		};
		this.tasks.push(newTask);
		taskInput.value = "";
	}
	editTask(id) {
		const taskDiv = document.querySelector(`.task[data-id="${id}"]`);
		const taskObj = this.tasks.find((t) => t.id === id);
		const taskContent = taskDiv.querySelector(".task-content");
		const originalActions = taskDiv.querySelector(".original-actions");
		taskContent.classList.add("hide");
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
	saveEdit(id) {
		const taskDiv = document.querySelector(`.task[data-id="${id}"]`);
		const editInput = taskDiv.querySelector(".edit-input");
		const newName = editInput.value.trim();

		if (newName) {
			const taskObj = this.tasks.find((t) => t.id === id);
			if (taskObj) {
				taskObj.name = newName;
			}
		}
	}
	deleteTask(id) {
		this.tasks = this.tasks.filter((t) => t.id !== id);
	}

	completeTask(id, checked) {
		const taskObj = this.tasks.find((t) => t.id === id);
		taskObj.completed = checked;
	}

	renderList() {
		taskList.innerHTML = this.tasks
			.map((task) => {
				return `
        <li class="task-item">
        <div class="task" data-id="${task.id}">
          <div class="task-content">
						<input 
						type="checkbox" 
						name="checkbox" 
						class="checkbox"
						data-id="${task.id}"
						${task.completed ? "checked" : ""}
						/>
					  <p class="task-name">${task.name}</p>
					</div>
          <div class="task-actions original-actions">
              <button class="edit-task" data-id="${task.id}" ${
					task.completed && "disabled"
				}>Edit</button>
              <button class="delete-task" data-id="${task.id}" ${
					!task.completed && "disabled"
				}>Delete</button>
          </div>
        </div>
        </li>
      `;
			})
			.join("");
	}
}

const manager = new TaskManager();

addTaskBtn.addEventListener("click", (e) => {
	e.preventDefault();
	manager.createTask();
	manager.renderList();
});

taskList.addEventListener("click", (e) => {
	const taskId = e.target.dataset.id;
	if (!taskId) return;

	if (e.target.classList.contains("delete-task")) {
		manager.deleteTask(taskId);
		manager.renderList();
	}

	if (e.target.classList.contains("edit-task")) {
		manager.editTask(taskId);
	}

	if (e.target.classList.contains("save-edit")) {
		manager.saveEdit(taskId);
		manager.renderList();
	}
	if (e.target.classList.contains("cancel-edit")) {
		manager.renderList();
	}
	if (e.target.classList.contains("checkbox")) {
		const taskId = e.target.dataset.id;
		manager.completeTask(taskId, e.target.checked);
		manager.renderList();
	}
});
