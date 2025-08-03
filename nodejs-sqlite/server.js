import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("contacts.db");
db.exec(`
   create table if not exists contacts (
        id integer primary key, 
        firstName text not null, 
        lastName text not null, 
        email text not null    
   )`);

const stmt = db.prepare(`INSERT INTO contacts (firstName, lastName, email)
  VALUES (?, ?, ?)`);

const { lastInsertRowid } = stmt.run("Jane", "Doe", "jane.doe@example.com");

console.log(`Inserted contact id: ${lastInsertRowid}`);
if (db) db.close();
