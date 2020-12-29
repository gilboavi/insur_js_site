var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");


const get_empty_documents= (params) => {
    var my_documentsl = {
              Serial:0,
              ClientSerial: params.client_serial,
              Comment: null ,
              TypeDoc:0,
              DocumentOccupation: 0 ,
              DateOfDocument: null ,
              FileName:null ,
              NoPolice: null,
              ConversationSerial:null ,
              UserSerial:null
      }
    return my_documentsl;
}

const sql_documents_list_string="SELECT  " +
        "  CONVERT( varchar, [DateOfDocument] , 103)  ,[Comment] , [DocumentOccupationName] , "+
        " [NoPolice]  ,FileName, Serial  " + " " +
        "FROM [InsurDB].[dbo].[DocumentsWithParams] " + " " +

        "WHERE ClientSerial=@client_serial";

module.exports = {
    async get_documents_list_by_clientserial(params) {
        //  console.log(params.term);

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)

                .query(sql_documents_list_string);


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


    async get_document_by_serial(params) {
        var sql_str="";
        var sql_str1 = "SELECT  * FROM [InsurDB].[dbo].[Documents]  WHERE [Serial]= @serial;";
        var sql_str2 =
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamDocumentOccupation] ORDER BY ParamName " +
            " SELECT  [NoPolice] FROM [InsurDB].[dbo].[LifePolicies]  WHERE [ClientSerial]= @client_serial ORDER BY NoPolice;" +
            " SELECT [Serial] ,[UserName] From Users ORDER BY UserName"+ ";"
        if (params.serial == 0) {
            sql_str = sql_str2;
        } else {
            sql_str =  sql_str1+" "+sql_str2;
        }
           
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_str);

            var my_data = {};
           
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_documents(params));
                my_data.main = main_t;
                my_data.document_occupation= result.recordsets[0];
                my_data.no_police_list= result.recordsets[1];
                my_data.users_list= result.recordsets[2];
                my_data.user_id=params.userId;
            } else {
                my_data.main= result.recordsets[0];
                my_data.document_occupation= result.recordsets[1];
                my_data.no_police_list= result.recordsets[2];
                my_data.users_list= result.recordsets[3];
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
    },

    async save_documents(params) {
        
        var sql_str = "";

        if (params.serial !=0) {
            sql_str = "UPDATE    [InsurDB].[dbo].[Documents] SET " +
                "DateOfDocument=@datee  " + "," +
                " DocumentOccupation=@document_occupation " + "," +
                " NoPolice=@no_police " + "," +
                " UserSerial=@user_serial " + "," +
               
               // " FileName=@file_name , "+
                " Comment=@comment " +
                "  WHERE [Serial] = @serial ";
        } else {
            sql_str = "INSERT INTO [InsurDB].[dbo].[Documents] " + " " +
                "(ClientSerial , DateOfDocument , DocumentOccupation , NoPolice , FileName,UserSerial , Comment)" +
                "   VALUES " + " " +
                "(@client_serial , @datee , @document_occupation , @no_police , @file_name ,@user_serial , @comment )";
        }

       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('datee', sql.DateTime, params.date_of_document)
                .input('document_occupation', sql.Int, params.document_occupation)
                .input('no_police', sql.NVarChar, params.no_police)
                .input('user_serial', sql.Int, params.user_serial)
                
               // .input('file_name', sql.NVarChar, params.files[Object.keys(params.files)[0]].newfilename)
                .input('file_name', sql.NVarChar, params.file_name)
                .input('comment', sql.NVarChar, params.comment)
                .query(sql_str  );

              //  let result2 = await pool.request()
              let result2 = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_documents_list_string  );
                
            return result2.recordsets;
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




