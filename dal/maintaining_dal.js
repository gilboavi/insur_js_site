var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");
const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");

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
                    " [AgentName]  , [Serial]  " + " " +
                    "FROM " + params.table_name + "  ORDER BY AgentName";
                break;
            case "9":
                sql_string = "SELECT  " +
                    " UserName , [EmailAddress], [Serial]  " + " " +
                    "FROM " + params.table_name + "  ORDER BY FullName";
                break;
            default:
                sql_string = "SELECT  " +
                    " [ParamName]  , [Serial]  " + " " +
                    "FROM " + params.table_name + "  ORDER BY ParamName ";
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
            
            let result = await db_conn_mysql().getPool().promise() 
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

        if (!params.active_client) {
            params.active_client = false;
        }

        var sql_str = "";
        if (params.serial != "0") {
            sql_str = "UPDATE  [Users]  SET " +
                " [UserName]=@user_name  " + 
                " , [PassWord]=@pass_word  " + 
                " , [Role]=@role  " + 
                " , [EmailAddress]=@email_address  " + 
                " , [EmailUserName]=@email_user_name  " + 
                " , [EmailPassWord]=@email_pass_word  " + 
                " , [ActiveClient]=@active_client  " + 
                "  WHERE [Serial]= @serial ";
        } else {
            sql_str = "INSERT INTO  [Users] " +
                "( [UserName] , [PassWord] ,  [Role] ,  [EmailAddress] ,  [EmailUserName] ,  [EmailPassWord] ,[ActiveClient] ) " + 
                "   VALUES " + " " +
                "(@user_name , @pass_word , @role ,@email_address " +
                " , @email_user_name , @email_pass_word , @active_client  )";

        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('user_name', sql.NVarChar, params.user_name)
                .input('pass_word', sql.NVarChar, params.pass_word)
                .input('role', sql.Int, params.role)
                .input('email_address', sql.NVarChar, params.email_address)
                .input('email_user_name', sql.NVarChar, params.email_user_name)
                .input('email_pass_word', sql.NVarChar, params.email_pass_word)
                .input('active_client', sql.Bit, params.active_client)
                .query(sql_str);

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
            sql_str = "UPDATE   [InsurDB].[dbo].[" + params.table_name + "]  SET " +
                "ParamName=@param_name  " + " " +

                "  WHERE [Serial]= @serial ";
        } else {
            sql_str = "INSERT INTO [InsurDB].[dbo].[" + params.table_name + "] " +
                "( [ParamName]    )" + " " +
                "   VALUES " + " " +
                "(@param_name  )";

        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('param_name', sql.NVarChar, params.param_name)

                .query(sql_str);

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