const mysql = require('mysql')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2d355@Mak7905",
    database: "blogs"
})



module.exports = db

