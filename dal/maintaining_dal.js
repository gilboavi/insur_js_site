var config = require("../config").config;


const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");
const function_dal=  require("./function_dal");

function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
            " user_name" + oprator+"," +
            " pass_word" + oprator+"," +
            " role" + oprator+"," +
            " email_address" + oprator+"," +
            " email_user_name" + oprator+"," +
            " email_pass_word" + oprator+"," +
            " active_client" + oprator+  " " +
            sql_end;
    return sql_update_insert;
}

module.exports = {

    async get_params_list(params) {
        var sql_string = " ";

        switch (params.serial) {
            case "22":
                sql_string = "SELECT  " +
                " user_name  , pass_word, role , email_address , email_user_name ,email_pass_word" +
                " active_client , serial " +

                    "FROM " + params.table_name + "  ORDER BY user_name";
                break;
            case "13":
                sql_string = "SELECT  " +
                    " agent_name  , serial  " + " " +
                    "FROM " + params.table_name + "  ORDER BY agent_name";
                break;
            case "9":
                sql_string = "SELECT  " +
                    " user_name , email_address, serial  " + " " +
                    "FROM " + params.table_name + "  ORDER BY full_name";
                break;
            default:
                sql_string = "SELECT  " +
                    " param_name  , serial  " + " " +
                    "FROM " + params.table_name + "  ORDER BY param_name ";
        }





        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request().input('client_serial', sql.Int, params.serial)
            let result = await db_conn_mysql.get_pool().promise()
                .query(sql_string);

            var my_data = {
                main: result[0],
                my_serial: params.serial


            };

            return my_data; // result.recordsets;
            // Stored procedure
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_param_by_serial(params) {
        var sql_string = "select * from " + params.table_name + " " +
            "where serial=?";

        try {
            
            let result = await db_conn_mysql.get_pool().promise() 
                           .query(sql_string , [params.serial]);

            var my_data = {
                main: result[0][0],
                my_serial: params.my_serial


            };

            return my_data; // result.recordsets;
            // Stored procedure
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_user_by_serial(params) {
        var sql_string = "select * from  users where serial=?";

        try {
           
            let result = await db_conn_mysql.get_pool().promise()
                
                .query(sql_string,[params.serial]);

            var my_data = {
                main: result[0],
                my_serial: params.serial


            };

            return my_data; // result.recordsets;
            // Stored procedure
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async save_user(params) {

        var sql_head="UPDATE   users SET ";
        var sql_oprator="=?";
        var sql_end="   WHERE serial = "+ params.serial;
        
        params.active_client=await function_dal.find_true_false(params.active_client);
        
        
        if (parseInt(params.role) != 'number'){
            params.role=0; 
        }
       

        var sql_str = "";
        if (params.serial == "0") {
            sql_head= "INSERT INTO  users ( ";
            sql_oprator=" ";
            sql_end =  "  ) VALUES " + " " +
                "(? , ? , ? ,? , ? , ? , ?  )";

        }
        sql_str=built_sql_string(sql_head,sql_oprator,sql_end)
        try {
            
            let result = await db_conn_mysql.get_pool().promise()
                         
                .query(sql_str,
                            [
                                params.user_name,
                                params.pass_word,  
                                params.role,
                                params.email_address ,
                                params.email_user_name, 
                                params.email_pass_word, 
                                params.active_client 
                            ]
                         );

            return {};
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }

    },

    async save_param(params) {
        var sql_str = "";
        if (params.serial != "0") {
            sql_str = "UPDATE  "+ params.table_name + "  SET " +
                "param_name=?  " + " " +

                "  WHERE serial=? ";
        } else {
            sql_str = "INSERT " + params.table_name + " " +
                "( param_name    )" + " " +
                "   VALUES " + " " +
                "(?  )";

        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await db_conn_mysql.get_pool().promise()
               

                .query(sql_str, [params.param_name,params.serial]);

            return  { };
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