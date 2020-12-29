var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_police_life = "SELECT  * FROM [InsurDB].[dbo].[LifePoliceWithParams]  WHERE [Serial]= @serial;";

const sql_police_life_list="SELECT  " +
"  CONVERT( varchar, [beginInsur] , 103) 		 as [תחילת ביטוח], [NoPolice]  ,[CompanyName]  as [שם חברה] ,[TypeInsurName]  as [סוג ביטוח],[StatusPoliceStr]  as [סטטוס], [Serial] " + " " +
"FROM [InsurDB].[dbo].[LifePoliceWithParams] " +" " +
"WHERE ClientSerial=@client_serial" + ";" ;


const sql_police_life_helpers=
" SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamCompany] ORDER BY ParamName " + ";" +
" SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTypeInsurLife] ORDER BY ParamName " + ";" +
" SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamStatusPolice] ORDER BY ParamName " + ";" 

const get_empty_life_polices = (params) => {
    var my_life_polices = {
        Serial: 0,
        ClientSerial: params.client_serial,
        Comment: null,
        TypeDoc: 0,
        DocumentOccupation: 0,
        DateOfDocument: null,
        FileName: null,
        NoPolice: null,
        ConversationSerial: null,
        UserSerial: null
    }
    return my_life_polices;
}


module.exports = {
    async get_life_polices_list_by_clientserial(params) {
        //  console.log(params.term);

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)

                .query( sql_police_life_list  ) ; 

              var my_rusult = result.recordsets;    
              my_rusult.ClientSerial = params.serial;
             // let result2 = await pool.request()
             let result2 = await dbConn.getPool().request()
              .input('client_serial', sql.Int, params.serial)
                                                   
              .query( "Select * From Clients Where Serial=@client_serial"  ) ; 
              var client_id=result2.recordsets[0][0].id;
              my_rusult.id_client=result2.recordsets[0][0].id;
            return my_rusult;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },


    async get_life_police_by_serial(params) {
        var sql_str="";
      
          
        
        if (params.serial != 0) {
            sql_str = sql_police_life + " " + sql_police_life_helpers;
        } else {
            sql_str = sql_police_life_helpers;
        }
        
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_str);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                my_data.row_index=params.row_index;
                main_t.push(get_empty_life_polices(params));
                my_data.main = main_t;
                my_data.company_list = result.recordsets[0];
                my_data.type_insur_life_list = result.recordsets[1];
                my_data.status_police_list = result.recordsets[2];
            } else {
                my_data.row_index=params.row_index;
                my_data.main = result.recordsets[0];
                my_data.company_list = result.recordsets[1];
                my_data.type_insur_life_list = result.recordsets[2];
                my_data.status_police_list = result.recordsets[3];
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

    async save_life_police(params) {
        var sql_str = "UPDATE   dbo.LifePolicies SET " +
            "NoPolice=@nopolice  " + "," +
            " beginInsur=@beginInsur " + "," +
            " Company=@company " + "," +
            " TypeInsur=@typeInsur " + "," +
            " status=@status " + "," +
            " Comment=@comment " +
            "  WHERE [Serial]= @serial ";
        if (params.serial == 0) {
            sql_str = "INSERT INTO [InsurDB].[dbo].[LifePolicies] " + " " +
                "(ClientSerial , NoPolice , beginInsur ,  Company , TypeInsur , status , Comment )" +
                "   VALUES " + " " +
                "(@client_serial , @nopolice , @beginInsur , @company , @typeInsur  , @status ,  @comment )";
        }
        if (params.status == null) {
            params.status = "0";
        }
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('nopolice', sql.NVarChar, params.no_police)
                .input('beginInsur', sql.DateTime, params.begin_Insur)
                .input('company', sql.Int, params.company)
                .input('typeInsur', sql.Int, params.type_Insur)
                .input('status', sql.Int, params.status)      
                .input('comment', sql.NVarChar, params.comment)
                .query( sql_str
                );

               // let result2 = await pool.request()
               let result2 = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_police_life_list);

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



