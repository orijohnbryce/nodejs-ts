import runQuery from "./query_mysql";


async function asyncQuery(q: string) {
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



//// homework - orderItem 
// asyncQuery(`CREATE TABLE orderItems (
//     id INT PRIMARY KEY AUTO_INCREMENT,
//     order_id INT,
//     product_id INT,
//     amount INT,
//     FOREIGN KEY (order_id) REFERENCES orders(id),
//     FOREIGN KEY (product_id) REFERENCES product(id)
// );`)

//// add new orderItem record
// asyncQuery(`INSERT INTO orderItems (order_id, product_id, amount) values(1, 2, 4)`);

//// select with condition
// asyncQuery(`SELECT * FROM orders WHERE LENGTH(note) > 2`);

//// update price
// asyncQuery(`UPDATE product SET price=19.7 WHERE name='apple'`);

//// add new column to an exists table
// asyncQuery(`ALTER TABLE product ADD COLUMN category VARCHAR(50) DEFAULT food;`);

//// drop column from table
// asyncQuery(`ALTER TABLE product DROP COLUMN category;`)

// ###################  CARS  ##########################

//// limit
// asyncQuery(`select * from car LIMIT 2;`)

//// change table name
// asyncQuery(`RENAME TABLE car  <old-name> TO <new-name>;`)

// //// 1
// asyncQuery(`INSERT INTO car 
//         (ID,Model,Year,Subtype,Engine,KM,Cost) 
//         values(100, 'Suzuki', 2020, 'Alto', 1000, 100000, 200);`);

// //// 2
// asyncQuery(`UPDATE car SET KM=12000 WHERE ID=100;`);


// //// 3
// asyncQuery(`DELETE FROM car WHERE ID=100;`);


////  AND
// asyncQuery(`SELECT * FROM car WHERE cost > 1000 AND year < 2010;`)

////  OR
// asyncQuery(`SELECT cost, year FROM car WHERE year < 2001 OR cost > 1490`)

//// BETWEEN
// asyncQuery(`SELECT year FROM car WHERE year BETWEEN 2000 AND 2001 LIMIT 3;`);


//// 4.1
// asyncQuery(`SELECT * FROM car WHERE KM>40000;`);

//// 4.2
// asyncQuery(`SELECT year FROM car WHERE cost BETWEEN 200 AND 500;`);

//// 4.3
// asyncQuery(`SELECT * FROM car WHERE cost = 300 OR KM <= 60000 LIMIT 2;`);

//// 4.4
// asyncQuery(`SELECT model FROM car WHERE engine > 2000 AND cost < 500;`)

// // SUM
// asyncQuery(`SELECT SUM(cost) FROM car WHERE year=2015;`)

// // AS
// asyncQuery(`SELECT SUM(cost) AS sum FROM car WHERE year=2015;`);

//// AVG
// asyncQuery(`SELECT AVG(cost) as cost FROM car WHERE year=2015;`)

//// COUNT
// asyncQuery(`SELECT COUNT(ID) AS total_2015 FROM car WHERE year=2015;`)

//// 5
// asyncQuery(`SELECT SUM(engine) as total_eng FROM CAR;`)

////6
// asyncQuery(`SELECT AVG(cost) as avg_cost FROM car;`);

//// NESTED QUERY 
// asyncQuery(`SELECT COUNT(ID) FROM car WHERE cost > (SELECT AVG(cost) FROM CAR);`)

// MIN
// asyncQuery(`select MIN(cost) from car;`);

// MAX
// asyncQuery(`select MAX(cost) from car;`);

//// 7
// asyncQuery(`SELECT year, km FROM car WHERE KM=(SELECT MAX(KM) from car);`);

//// 8.
// asyncQuery(`SELECT COUNT(ID) FROM car WHERE year BETWEEN 2020 AND 2021;`)

////9.
// asyncQuery(`select * from car where year between 2020 and 2022 OR cost between 100 and 200;`);


//// 10.1
// asyncQuery(`ALTER TABLE car ADD COLUMN is_deleted BOOLEAN DEFAULT FALSE;`);

//// 10.2
// asyncQuery(`UPDATE car SET is_deleted=TRUE WHERE year < 2017;`);


//// 11.1
// asyncQuery(`ALTER TABLE car ADD COLUMN cost_usd DECIMAL(10, 2);`)

//// 11.2
// asyncQuery(`UPDATE car SET cost_usd=cost/3;`);

// // 12
// asyncQuery(`ALTER TABLE car CHANGE cost_usd usd_cost decimal(10, 2);`);

//// order by
// asyncQuery(`SELECT DISTINCT year FROM car ORDER BY year;`);

// asyncQuery(`SELECT p.fname, c.model  FROM person AS p INNER JOIN car AS c ON p.car_id = c.id limit 1;`);

// asyncQuery(`select city  from person where car_id = (select id from car order by year limit 1);`);
// asyncQuery(`select city  from person p join car c on p.car_id = c.id order by c.year limit 1`);

// asyncQuery(`select id from car order by year limit 1`)


asyncQuery(`select count(*), year from car group by year;`);
