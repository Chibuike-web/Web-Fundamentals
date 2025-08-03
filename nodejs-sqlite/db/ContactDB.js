export class ContactDB {
	constructor(conn) {
		this.conn = conn;
	}

	create({ firstName, lastName, email }) {
		const stmt = this.conn.prepare(
			`INSERT INTO contacts (first_name, last_name, email)
      VALUES (?, ?, ?)`
		);
		const { lastInsertRowId } = stmt.run(firstName, lastName, email);
		return { id: lastInsertRowId, firstName, lastName, email };
	}
}
