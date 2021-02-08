var config = require("../config").config;
const sql = require('mssql');

const db_conn_mysql = require("./db_con_mysql");

var sql_str = "SELECT serial, user_name, pass_word  " +
    " FROM  users  " +
    " WHERE user_name =?"
module.exports = {
    async get_user_auth_by_username(params) {
        //  console.log(params.term);

        try {
            let result = await db_conn_mysql.get_pool().promise()
                .query(sql_str,[params.user_name]);

            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
        
    }

}