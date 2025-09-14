import { initDb, closeDb, addTodo, getTodos } from "./db/todos.js";

initDb("todos.db");

const { lastInsertRowid } = addTodo("Run a race");
console.log(`Inserted todo id: ${lastInsertRowid}`);

console.log(getTodos());

closeDb();
