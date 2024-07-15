// import mysql from "mysql2";
const mysql = require("mysql2");

// Function to run an SQL query
function runQuery(query: string, qParams: any[] = []): Promise<any[]> {
  return new Promise((resolve, reject) => {
    // Create a connection to the database
    const connection = mysql.createConnection({
      user: "root",
      password: "",
      port: 3306, // also default
      host: "localhost",
      database: "ttd_1",
    });

    // Connect to the database
    connection.connect((err) => {
      if (err) {
        return reject(err); // Return early to prevent further code execution on error
      }

      // Run the query
      connection.query(query, qParams, (err, results) => {
        if (err) {
          connection.end(); // Ensure the connection is closed on error
          return reject(err); // Return early to prevent further code execution on error
        }
        resolve(results as any[]); // Resolve with the query results

        // Close the connection
        connection.end((err) => {
          if (err) {
            return reject(err); // Return early to prevent further code execution on error
          }
        });
      });
    });
  });
}

runQuery("select * from test1;")
  .then((res) => {
    console.log(res);
  })
  .catch((e) => {
    console.log(e);
  });
