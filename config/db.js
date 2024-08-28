const mysql = require("mysql2");
const db= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"CTPI2024*",
    database:"colegio"
    
})
db.connect((e) => {
    if (e) {
        console.log(e);
    }
    else {
        console.log("Conectado a MySQL");
    }
})
module.exports = db;