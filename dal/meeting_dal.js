var config = require("../config").config;


const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");

const sql_meeting =   "SELECT  " +
            " DATE_FORMAT(meeting_date, '%Y / %m /%d ')   as  meeting_date    , meeting_summary   , " + " " +
            "  agent_name_str , user_name_str  , " + " " +
            " meeting_status_str ,done , serial  " + " " +
            " FROM  meeting_with_param  ";

const sql_meeting_by_done = "SELECT  " +
        " (last_name +' '+ first_name) as full_name ,  "+
        "  meeting_date    , meeting_summary   , " + " " +
        "  agent_name_str , user_name_str  , " + " " +
        " meeting_status_str ,done , serial  " + " " +
        "FROM  meeting_with_param  WHERE done=?";

const where_by_client_serial = " WHERE client_serial=?" + ";";
const where_by_done= " WHERE done=?" + ";";


function get_empty_meeting_table(client_serial) {
    var my_empty_meeting = {
        serial: 0,
        client_serial: client_serial,
        meeting_date: null,
        meeting_summary: null,
        agent_name: null,
        editor_name:0,
        instruction_befor_meeting: null,
        meeting_status: 0,
        done:0
      
    }
    return my_empty_meeting;
}

function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
           
            "  client_serial"  + oprator +" , " +
            " meeting_date " + oprator +" , " +
            " meeting_summary  "  + oprator +" , " +
            "  agent_name " + oprator +" , " +
            " editor_name  "  + oprator +" , " +
            " instruction_befor_meeting   "  + oprator +" , " +
            " meeting_status  "  + oprator +"  " +
            
 
               sql_end;
    return sql_update_insert;
}


module.exports = {

    async get_meeting_list_by_clientserial(params) {
              
        try {
            
            let result = await db_conn_mysql.get_pool().promise()
              

                .query(sql_meeting + where_by_client_serial ,[ params.serial]  );


            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },


    async get_meeting_list_by_done(params) {

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await db_conn_mysql.get_pool().promise()
                .query(sql_meeting_by_done,[params.done]);


            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_meeting_by_serial(params) {
        var sql_str_1 = "";
        if (params.serial != "0") {
            sql_str_1 = "SELECT  " +
                        "  client_serial , " +
                        " meeting_date ,"  +
                        " meeting_summary   , " +
                        "  agent_name  , " +
                        " editor_name  , " +
                        " instruction_befor_meeting   , " +
                        " meeting_status  , " +
                        "  serial    " +
                        "FROM  meeting  " + " " +
                        "WHERE serial =?" + ";";
        } 
       
        var sql_string_2 =
        " SELECT serial, user_name FROM users ORDER BY user_name " + ";" +
        " SELECT serial, agent_name FROM agents ORDER BY agent_name " + ";" +
        " SELECT serial, param_name FROM param_meeting_status ORDER BY param_name " + ";";
        var sql_str = sql_str_1 + sql_string_2;
        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
               
                .query(sql_str,[params.serial]);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_meeting_table(params.client_serial))
                my_data.main = main_t;
              //  my_data.main[0].ClientSerial = Number(params.client_serial);

              
                my_data.user_name_list = result[0][0];
                my_data.agent_name_list  = result[0][1];
                my_data.meeting_status_list  = result[0][2];
               
            } else {
                my_data.main = result[0][0];
                my_data.user_name_list = result[0][1];
                my_data.agent_name_list = result[0][2];
                my_data.meeting_status_list = result[0][3];
              
               
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

    async save_meeting(params) {
        var sql_str = "";
        var sql_head="UPDATE   meeting SET ";
        var sql_oprator="=?";
        var sql_end="   WHERE serial =? ";

        if (params.serial==0) {
            sql_head = "INSERT INTO   meeting   ( ";
            sql_oprator=" ";
            sql_end=") VALUES (?,?,?,?,?,?,? ) ;" ;
               
        }  
        sql_str=built_sql_string(sql_head,sql_oprator,sql_end)
        
        if (params.status == null) {
            params.status = "0";
        }
        try {
           
            let result = await db_conn_mysql.get_pool().promise()
                               .query(sql_str,
                                    [   params.client_serial,
                                        params.meeting_date,
                                        params.meeting_summary,
                                        params.agent_name, 
                                        params.editor_name, 
                                        params.instruction_befor_meeting,
                                        params.meeting_status,
                                        params.serial
                                    ]  
                                );

                //let result2 = await pool.request()
                let result2 = await db_conn_mysql_multi.get_pool().promise()
                             .query(sql_meeting + where_by_client_serial [params.client_serial]  );
            return result2;
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



