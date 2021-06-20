const mysql = require('mysql')

const con = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'agenda-petshop'
})

module.exports = con