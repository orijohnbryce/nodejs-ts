// parkingDB.ts
import runQuery from "./dal";

export async function createTables(): Promise<void> {
    await runQuery(`
        CREATE TABLE address (
            id SERIAL PRIMARY KEY,
            city VARCHAR(100),
            street VARCHAR(100),
            number INT
        );
    `);

    await runQuery(`
        CREATE TABLE park (
            id SERIAL PRIMARY KEY,
            isFree BOOLEAN,
            isTaken BOOLEAN,
            address_id INT REFERENCES address(id)
        );
    `);
}

export async function createSampleData(): Promise<void> {
    await runQuery(`
        INSERT INTO address (city, street, number) 
        VALUES ('Grapevine', 'Main St', 101),
               ('Grapevine', '2nd St', 202);
    `);

    await runQuery(`
        INSERT INTO park (isFree, isTaken, address_id) 
        VALUES (true, false, 1),
               (false, true, 2);
    `);
}


async function init() {
    await createTables();
    await createSampleData();
}

init()
