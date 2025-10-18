import { DatabaseSync } from "node:sqlite";

let db;

export function initDb(path) {
	db = new DatabaseSync(path);

	db.exec(`
    create table if not exists todos (
    id integer primary key,
    todo text not null,
    completed boolean not null
    )
    `);
	return db;
}

export function getDb() {
	if (!db) {
		throw new Error("Database not initialized. Call initDb() first.");
	}

	return db;
}

export function closeDb() {
	if (db) {
		db.close();
		db = null;
	}
}

export function addTodo(todo, completed = false) {
	const stmt = db.prepare(`insert into todos (todo, completed) values(?, ?)`);
	return stmt.run(todo, Number(completed));
}

export function getTodos() {
	return db.prepare("select * from todos").all();
}

export function updateTodo(id, completed) {
	const stmt = db.prepare(`
    update todos set completed = ? where id = ?`);
	return stmt.run(Number(completed), id);
}

export function deleteTodo(id) {
	const stmt = db.prepare("delete from todos where id = ?");
	return stmt.run(id);
}
