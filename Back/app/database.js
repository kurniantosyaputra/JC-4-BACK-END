var mysql = require("mysql");

var connection = mysql.createConnection 
({
    host : "localhost",
    port : 3306,
    database : "shop",
    user : "root",
    password : "123"
})

module.exports = connection;