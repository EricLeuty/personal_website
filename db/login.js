const pgp = require('pg-promise')();

const cn = {
    name: 'eric',
    password: 'wc14',
    host: 'localhost',
    database: 'personal_website',
    port: 5432
}

const db = pgp(cn);

module.exports = db ;












