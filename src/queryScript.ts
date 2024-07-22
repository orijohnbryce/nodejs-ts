import runQuery from "./query_mysql";


async function asyncQuery(q : string) {
    try {
        const res = await runQuery(q);
        console.log(res);                
    } catch (error) {
        console.error(error)        
    }
}

// let q = "";

// q = "CREATE DATABASE IF NOT EXISTS store";
// asyncQuery(q);

// q = `CREATE TABLE client (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100)
// )`;
// asyncQuery(q);

// // CREATE
// asyncQuery(`INSERT INTO client (id, name, email) values(1, 'Eli', 'avi@x.com')`)
// asyncQuery(`INSERT INTO client (name, email) values('Eli', 'avi@x.com')`)
// asyncQuery(`INSERT INTO client (name) values('Eli')`)
// asyncQuery(`INSERT INTO client (name, email)
//     values
//     ('Eli', 'avi@x.com'),
//     ('Eli', 'avi@x.com'),
//     ('Eli', 'avi@x.com')
//     `)

//// READ
// asyncQuery("SELECT * FROM client;")
// asyncQuery("SELECT name FROM client;")
// asyncQuery('SELECT * FROM client WHERE name="eli";');  // case in-sensitive
// asyncQuery('SELECT * FROM client WHERE BINARY name="eli";');

//// UPDATE
// asyncQuery("UPDATE client SET email='no-email@gmail.com';");  // update all
// asyncQuery("UPDATE client SET email='david@gmail.com' WHERE name='david';");  // update only name=david (condition)
// asyncQuery("UPDATE client SET email='david@gmail.com' WHERE id=2;");  // update only id=2 (condition)

//// DELETE
// asyncQuery("DELETE FROM client WHERE id=1;");


//// table with FK
// asyncQuery(`CREATE TABLE orders (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     client_id INT,
//     created DATETIME DEFAULT CURRENT_TIMESTAMP,
//     note VARCHAR(500),
//     FOREIGN KEY (client_id) REFERENCES client(id)
// );`)



// asyncQuery("INSERT INTO orders (client_id, note) values(1, 'please do it fast')");
// asyncQuery("INSERT INTO orders (client_id, note, created) values(2, 'no note', '2020-04-28 19:00:45')");



asyncQuery('select * from car;')










