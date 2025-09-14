import { DatabaseSync } from "node:sqlite";

let conn;

export function initDb(path) {
	conn = new DatabaseSync(path);

	conn.exec(`
    create table if not exists todos (
    id integer primary key,
    todo text not null,
    completed boolean not null
    )
    `);
	return conn;
}

export function getDb() {
	if (!conn) {
		throw new Error("Database not initialized. Call initDb() first.");
	}

	return conn;
}

export function closeDb() {
	if (conn) {
		conn.close();
		conn = null;
	}
}

export function addTodo(todo, completed = false) {
	const stmt = conn.prepare(`insert into todos (todo, completed) values(?, ?)`);
	return stmt.run(todo, Number(completed));
}

export function getTodos() {
	return conn.prepare("select * from todos").all();
}

export function updateTodo(id, completed) {
	const stmt = conn.prepare(`
    update todos set completed = ? where id = ?`);
	return stmt.run(Number(completed), id);
}

export function deleteTodo(id) {
	const stmt = conn.prepare("delete from todos where id = ?");
	return stmt.run(id);
}
