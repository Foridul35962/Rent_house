const db = require('mysql2')

const pool = db.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'rent_house'
})

module.exports = pool.promise()