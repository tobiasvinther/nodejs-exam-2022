import db from "./connection_sqlite.js";

const isInDeleteMode = true;

if (isInDeleteMode) {
    db.exec(`
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS applications;
    `);
}

db.exec(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255),
    email VARCHAR (255),
    password VARCHAR(255)
);
`);

db.exec(`CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR (255),
    description VARCHAR (65535),
    approved BOOLEAN NOT NULL DEFAULT 0
);
`);

// seed the database
if (isInDeleteMode) {
    db.run(`INSERT INTO users (username, email, password) VALUES ("testUser1", "test1@mail.com", "$2a$12$ODUC7CjdP/.chKU.NcCP3uIwO/lErx.FMuDnfXL/U9mXiwr0oiBiC");`);
    db.run(`INSERT INTO applications (id, first_name, last_name, email, description) VALUES (1, "Harry", "Lanslow", "test2@mail.com", "A sort of chicken-like walk");`);
    db.run(`INSERT INTO applications (id, first_name, last_name, email, description) VALUES (2, "Lisa", "Brightby", "test3@mail.com", "A sort of chicken-like walk");`);
    db.run(`INSERT INTO applications (id, first_name, last_name, email, description) VALUES (3, "John", "Cheese", "test4@mail.com", "A sort of chicken-like walk");`);
}

