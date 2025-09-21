import { initDb, closeDb, addTodo, getTodos, getDb } from "./db/todos.js";

initDb("todos.db");
getDb();

const { lastInsertRowid } = addTodo("Run a race");
console.log(`Inserted todo id: ${lastInsertRowid}`);

console.log(getTodos());

closeDb();
