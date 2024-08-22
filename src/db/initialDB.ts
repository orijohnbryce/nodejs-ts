import runQuery from "./dal"

const createTables = async () => {
    let Q = `
        CREATE TABLE IF NOT EXISTS address  (
            id INT AUTO_INCREMENT PRIMARY KEY,
            city VARCHAR(20) NOT NULL,
            street VARCHAR(50) NOT NULL,
            num INT NOT NULL);`
    await runQuery(Q);

    Q = `
        CREATE TABLE IF NOT EXISTS park (
            id INT AUTO_INCREMENT PRIMARY KEY,
            isOccupied BOOLEAN NOT NULL,
            isFree BOOLEAN NOT NULL,
            address_id INT NOT NULL,
            FOREIGN KEY (address_id) REFERENCES address(id)
        )
    `
    await runQuery(Q)
}

const createSampleData = async ()=>{
    let Q = `
        INSERT INTO address (city, street, num) values         
        ('Jerusalem', 'Jaffa', 50),
        ('TelAviv', 'Jaffa', 30),
        ('Jerusalem', 'Ben-Yehuda', 12),
        ('Ashdod', 'Amaapilim', 10),
        ('Batyam', 'Hashoshana', 1)
    `
    await runQuery(Q);
    
    Q = `
    INSERT INTO park (isOccupied, isFree, address_id) values 
        (true, false, 1),
        (true, false, 2),
        (true, true, 3),
        (true, true, 2),
        (false, false, 4),
        (false, false, 5),
        (false, true, 5),
        (false, true, 1)
        
    `
    await runQuery(Q);               
}

// createTables().then(() => {
//     console.log("Done creating tables");
// })

// createSampleData().then(()=>{console.log("Done adding data");})