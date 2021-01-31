var config = require("../config").config;

const db_conn_mysql = require("./db_con_mysql");

const sql_communication_list_by_client_serial="SELECT `communication_type` ,"+
                " `communication_value` ,"+
                "  `comment` , `serial` "+
                " FROM  `communication` "+
                " WHERE `client_serial`= ? ;" ; 
function built_sql_string(sql_head,oprator,sql_end){

        var sql_update_insert = sql_head + " " +
                            "`client_serial`"+oprator+"," +
                            "`communication_type`"+oprator+"," + 
                            " `communication_value`"+oprator+" ," + 
                            " `comment`"+oprator+" " +
                            
                               sql_end;
                    return sql_update_insert;
                }               

module.exports = {

    async get_communication_list_by_client_serial(params) {
        //  console.log(params.term);

        try {
          
            
            
            let result = await db_conn_mysql.get_pool().promise()
                   .query(sql_communication_list_by_client_serial,
                    [params.client_serial]);


            return result[0];

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
      
        var sql_string = "SELECT  * FROM communication  WHERE serial= ?;";
           

        try {
            
            let result = await db_conn_mysql.get_pool().promise()
                
                .query(sql_string,[params.serial]);

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

    async save_communication(params) {
        let _this=this;
        
        var sql_head="UPDATE   communication SET";
        var oprator="=?";
        var sql_end="Where serial=?;"
        if (params.serial=="0") {
           
            sql_head="INSERT INTO communication (";
            oprator="";
            sql_end=", serial) Values (?,?,?,?,?)";
           // params.serial=0;
           

        }
       var sql_str=built_sql_string(sql_head,oprator,sql_end);
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await db_conn_mysql.get_pool().promise()
                   .query(sql_str,
                   [params.client_serial,
                    params.communication_type,
                    params.communication_value.trim(),
                    params.comment,
                    params.serial
                    ]  );
            
            
        
           let result2 = await  db_conn_mysql.get_pool().promise()
                .query(sql_communication_list_by_client_serial, [params.client_serial]);
            let my_data ={
                communication_list:result2[0]
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
    // delete_communication_row_by_serial
    async  delete_communication_row_by_serial(params){
        var sql_string = "Delete   FROM communication  WHERE serial= ?;";
        let that=this;  

        try {
            var serial=parseInt(params.serial);
            let result = await db_conn_mysql.get_pool().promise()
                
                .query(sql_string,[serial]);

                let my_data=await that.get_communication_list_by_client_serial(params);
                return my_data;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
    }



}




