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
    amount INT NOT NULL DEFAULT 0,
    status VARCHAR(12) NOT NULL DEFAULT "pending"
);
`);

// seed the database
if (isInDeleteMode) {
    db.run(`INSERT INTO users (username, email, password) VALUES ("testUser1", "test1@mail.com", "$2a$12$ODUC7CjdP/.chKU.NcCP3uIwO/lErx.FMuDnfXL/U9mXiwr0oiBiC");`);

    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Harry", "Lanslow", "test2@mail.com", "A sort of chicken-like walk", 18000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Lisa", "Brightby", "test3@mail.com", "I jump forward with my legs together. Then I do a little dance.", 10000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("John", "Cheese", "test4@mail.com", "I just walk backwards. With a grant I could really develop this walk.", 15000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Leonard", "Smith", "test5@mail.com", "I lay on the floor and wriggle myself forward, like a snake. I'm not sure if it can even be considered a walk, or it should be classified as a 'slither'.", 25000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Debra", "Miller", "test6@mail.com", "I take on step, then on the next I do a little spin and then another normal step.", 10000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Benedict", "Lumberback", "test7@mail.com", "A sort of chicken-like walk", 20000);`);
    db.run(`INSERT INTO applications (first_name, last_name, email, description, amount) VALUES ("Eliza", "Foolittle", "test8@mail.com", "A sort of chicken-like walk", 33000);`);
}

