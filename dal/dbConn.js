var config = require("../config").config;
const sql = require('mssql');
var pool;

sql.connect(config.mssql.test_db).then((a) => {
    pool = a;
});

module.exports = {
    getPool() {
        return pool;
    }
}