var config = require("../config").config;


const db_conn_mysql = require("./db_con_mysql");
const db_con_mysql_multi = require("./db_con_mysql_multi");

const sql_hlep_tables=
    " SELECT serial, param_name FROM param_document_occupation ORDER BY param_name ;" +
   // " SELECT  no_police FROM life_policies  WHERE client_serial= ? ORDER BY no_police;" +
    " SELECT serial ,user_name From users ORDER BY user_name"+ ";";

const sql_documents_by_serial=
    "SELECT  * FROM documents  WHERE serial= ?;";

const get_empty_documents= (params) => {
    var my_documentsl = {
              serial:0,
              client_serial: params.client_serial,
              comment: null ,
              type_doc:0,
              document_occupation: 0 ,
              date_of_document: null ,
              file_name:null ,
              no_police: null,
              conversation_serial:null ,
              user_serial:null
      }
    return my_documentsl;
}

const sql_documents_list_string="SELECT  " +
    "  date_of_document  ,comment , document_occupation_name , "+
    " no_police  ,file_name, serial  " + " " +
    "FROM documents_with_params " + " " +
    "WHERE client_serial=?";


    function built_sql_string(sql_head,oprator,sql_end){

        var sql_update_insert = sql_head + " " +
                              
                "client_serial "+oprator+"," +
                "date_of_document " +oprator+"," +
                "document_occupation " +oprator+"," +
                " file_name  "+oprator+"," +
                " user_serial" +oprator+"," +
                " comment "+oprator+" " +
                
                   sql_end;
        return sql_update_insert;
    }  

module.exports = {
    
    async get_documents_list_by_clientserial(params) {
      

        try {
            
            let result = await db_conn_mysql.get_pool().promise()
          

                .query(sql_documents_list_string,[params.client_serial]);


            return result[0];

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
        
        if (params.serial == 0) {
            sql_str = sql_hlep_tables;
        } else {
            sql_str =  sql_documents_by_serial+" "+sql_hlep_tables;
        }
           
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await db_con_mysql_multi.get_pool().promise()
                .query(sql_str,[params.serial]);

            var my_data = {};
           
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_documents(params));
                my_data.main = main_t;
                my_data.document_occupation=result[0][0];
                my_data.users_list= result[0][1];
               
                my_data.user_id=params.user_id;
            } else {
                my_data.main= result[0][0];
                my_data.document_occupation= result[0][1];
           
                my_data.users_list= result[0][2];
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
        var sql_head="UPDATE   documents SET ";
        var sql_oprator="=?";
        var  sql_end="   WHERE serial=? ";
        var sql_str = "";

        if (params.serial ==0) {

            sql_head=" INSERT into   documents ( ";
                sql_oprator=" ";
                sql_end=", serial) VALUES (?,?,?,?,?,"+
                                 "?,? ) "; 
         
           
            
        }

        sql_str=built_sql_string(sql_head,sql_oprator,sql_end);
        try {
             //   "(@client_serial , @datee , @document_occupation ,  @file_name ,@user_serial , @comment )";
            let result = await db_conn_mysql.get_pool().promise()
                
               
                
                .query(sql_str ,[
                        params.client_serial,
                        params.date_of_document,
                        params.document_occupation,
                        params.file_name,
                        params.user_serial,
                        params.comment,
                        params.serial
                    ] 
                );

              //  let result2 = await pool.request()
            //   let result2 = await db_conn_mysql.get_pool().promise()
                
            //     .query(sql_documents_list_string , [params.client_serial]  );
                
            // return result2[0];
            return this.get_documents_list_by_clientserial(params);
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




