import { DatabaseSync } from "node:sqlite";

export class DB {
	constructor(pathToSQLiteFile) {
		this.conn = new DatabaseSync(pathToSQLiteFile);
		this.init();
	}

	init() {
		this.conn.exec(`
      create table if not exists contacts (
      id integer primary key,
      firstName text not null,
      lastName text not null,
      email text not null
    )`);
	}
	close() {
		if (this.conn) this.conn.close();
	}
}
