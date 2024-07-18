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
// asyncQuery("INSERT INTO client (id, name, email) values(1, 'Eli', 'avi@x.com')")

//// READ
// asyncQuery("SELECT * FROM client;")

//// UPDATE
// asyncQuery("UPDATE client SET email='no-email@gmail.com';");  // update all
// asyncQuery("UPDATE client SET email='david@gmail.com' WHERE name='david';");  // update only name=david (condition)
// asyncQuery("UPDATE client SET email='david@gmail.com' WHERE id=2;");  // update only id=2 (condition)


//// DELETE
// asyncQuery("DELETE FROM client WHERE id=1;");