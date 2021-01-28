var config = require("../config").config;
var my_sql =  require('mysql2');

var pool = my_sql.createPool(
        config.mysql.my_sql_connction
);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release()
    return
})

module.exports = {
    get_pool() {
        
        return pool;
    }
}