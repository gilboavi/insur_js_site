var config = require("../config").config;
const sql = require('mssql');

module.exports = {
    async get_client_by_term(params) {
        //  console.log(params.term);
        try {
            
            let pool = await sql.connect(config.mssql.test_db)
           
           let result = await pool.request()
                .input('term', sql.NVarChar, params.term)
               
                .query("SELECT * " +
                        "FROM Clients " +
                        "WHERE cast([id] as nvarchar) like @term + '%' " +
                        "OR[LastName]  like @term + '%' " +
                        "OR[FirstName] like @term + '%' ");

            return result.recordsets;
            // Stored procedure 
        }
        catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    },


    async get_client_by_serial(params) {
   
        var sql_string = "SELECT  * FROM [InsurDB].[dbo].[Clients]  WHERE [Serial]= @serial;" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamClientType] " + ";" +
            " SELECT[Serial], [AgentName] FROM [InsurDB].[dbo].[Agents] " + ";"
        try {
            let pool = await sql.connect(config.mssql.test_db)
            let result = await pool.request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

            return result.recordsets;
            // Stored procedure 
        }
        catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    },

   
      async save_client(params) {
        var a = params.serial;
        var b = a;
        try {
            let pool = await sql.connect(config.mssql.test_db)
            let result = await pool.request()
                .input('serial', sql.Int, params.serial)
                .input('firstName', sql.NVarChar, params.firstName)
                .input('lastName', sql.NVarChar, params.lastName)
                .input('street', sql.NVarChar, params.street)
                .input('city', sql.NVarChar, params.city)
                .input('status', sql.Int, params.status)
                .input('birthday', sql.NVarChar, params.birthday)
                .query("UPDATE   dbo.Clients SET FirstName=@firstName , " +
                                                 " LastName=@lastName ," +
                                                 " Street=@street ," +
                                                 " City=@city ," +
                                                 " Birthday=@birthday ," +
                                                 " Status=@status " +
                                                 "  WHERE [Serial]= @serial " );

            return result.recordsets;
            // Stored procedure 
        }
        catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    }



}




