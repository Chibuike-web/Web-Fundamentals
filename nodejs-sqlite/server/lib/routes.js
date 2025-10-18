export const routes = {
	GET: {
		"/todos": handleGetTodos,
	},
	POST: {
		"/todos": handleAddTodo,
	},

	DELETE: {
		"/todos/:id": handleDeleteTodo,
	},
};
