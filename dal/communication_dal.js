var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_communication_list="SELECT  " +
           "	[CommunicationType]  , [CommunicationValue] , [Comment] , Serial  " + 
            " FROM [Communication] " + " " +
            "WHERE ClientSerial=@client_serial"

module.exports = {
    async get_communication_list_by_clientserial(params) {
        //  console.log(params.term);

        try {
          
            
            // let   pool = await sql.connect(config.mssql.test_db)
          
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)
                .query(sql_communication_list);


            return result.recordsets;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
           
        //         sql.close();
           
        // }
    },


    async get_communication_by_serial(params) {
        var a = params.serial;
        var sql_string = "SELECT  * FROM [InsurDB].[dbo].[Communication]  WHERE [Serial]= @serial;";
           

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

            return result.recordsets;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async save_communication(params) {
        let _this=this;
        var sql_str = "";
        if (params.serial!="0") {
             sql_str = "UPDATE   dbo.Communication SET " +
                "CommunicationType=@communication_type  " + "," +
                "CommunicationValue=@communication_value  " + "," +
                " Comment=@comment " +
                "  WHERE [Serial]= @serial ";
        } else {
            sql_str = "INSERT INTO [InsurDB].[dbo].[Communication] " + " " +
                "( [ClientSerial]  , [CommunicationType] , [CommunicationValue], [Comment]    )" + " " +
                "   VALUES " + " " +
                "(@client_serial , @communication_type , @communication_value , @comment )";

        }
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('communication_type', sql.NVarChar, params.communication_type)
                .input('communication_value', sql.NVarChar, params.communication_value.trim())
                .input('comment', sql.NVarChar, params.comment)
                .query(sql_str );
              //  params.pool1=pool;
            
           // let result2 = await pool.request()
           let result2 = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_communication_list);
            let my_data ={
                communication_list:result2.recordsets[0]
            }    

            return my_data;
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




