const mysql = require("mysql");

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "stani",
  });
  db.connect((err) => {
    if (err) {
      console.log(`error connecting: ${err.stack}`);
      return;
    }
    console.log("success");
  });

module.exports = db;
