var config = require("../config").config;
const sql = require('mssql');

module.exports = {
    async get_life_polices_list_by_clientserial(params) {
        //  console.log(params.term);

        try {
            let pool = await sql.connect(config.mssql.test_db)
            let result = await pool.request()
                .input('client_serial', sql.Int, params.serial)

                .query("SELECT  " +
                "   	[beginInsur] as [תחילת ביטוח], [NoPolice],[CompanyName],[TypeInsurName],[StatusPoliceStr], [Serial] " + " " +
                "FROM [InsurDB].[dbo].[LifePoliceWithParams] " + " " +
                "WHERE ClientSerial=@client_serial" + ";" +
                " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamCompany] ORDER BY Serial " + ";" +
                " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTypeInsurLife] ORDER BY Serial " + ";"
                );


            return result.recordsets;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    },


    async get_life_police_by_serial(params) {
        var a = params.serial;
        var sql_string = "SELECT  * FROM [InsurDB].[dbo].[Conversation]  WHERE [Serial]= @serial;" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamClientType] " + ";" +
            " SELECT[Serial], [AgentName] FROM [InsurDB].[dbo].[Agents] " + ";"
        try {
            let pool = await sql.connect(config.mssql.test_db)
            let result = await pool.request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

            return result.recordsets;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    },

    async save_life_police(params) {
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
                .query("UPDATE   dbo.Clients SET FirstName=@firstName , " +
                " LastName=@lastName ," +
                " Street=@street ," +
                " City=@city ," +
                " Status=@status " +
                "  WHERE [Serial]= @serial ");

            return result.recordsets;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    }



}



