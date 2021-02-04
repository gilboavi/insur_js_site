// followup_conversation_dal
var config = require("../config").config;
const sql = require('mssql');

const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");
const function_dal=  require("./function_dal");

const sql_followup_conversation_helper_tables =
" SELECT serial, user_name FROM users ORDER BY user_name " + ";" +
" SELECT   serial, param_name FROM param_type_followup_conversation ORDER BY param_name " + ";";
    

const sql_conversation_with_followup = " SELECT  " +
    "	[Datee], SummaryOfConversation, GoalOfTalkName , " +
    " UserName,TypeFollowupConversationName  ," +
    " [Serial] " +
    " FROM [InsurDB].[dbo].[ConversationWithParam] " +
    " WHERE ClientSerial=@serial; " +
    " SELECT  	[DateFollowUp]  , Summary , UserName , " +
    " [StatusFollowUp], [ConversationsSerial]," + " " +
    " [Serial] " + " " +
    " FROM [InsurDB].[dbo].[FollowUpConversationWithParamsAndClientSerial] " +
    " WHERE ClientSerial=@serial; ";

const sql_followup_with_prams_by_conversations_serial = " SELECT  " + " " +
    " date_followup , summary,user_name ,status_followup  , " + " " +
    " serial " + " " +
    "FROM followup_conversation_with_params WHERE conversations_serial=? ; "
    ;

const sql_conversation_by_conversations_serial = " SELECT  " + " " +
    " serial, summary_of_conversation From conversation Where serial=? ; ";

const set_result_into_lists = (params, result) => {
    var my_data = {};
    if (params.serial == 0) {
        var main_t = [];
        main_t.push(get_empty_conversation(params));
        my_data.main = main_t;
        my_data.goal_of_talk_list = result.recordsets[0];
        my_data.tevia_type_list = result.recordsets[1];
        my_data.get_call_name_list = result.recordsets[2];
        my_data.type_followup_conversation_list = result.recordsets[3];
    } else {
        my_data.main = result.recordsets[0];
        my_data.goal_of_talk_list = result.recordsets[1];
        my_data.tevia_type_list = result.recordsets[2];
        my_data.get_call_name_list = result.recordsets[3];
        my_data.type_followup_conversation_list = result.recordsets[4];
    }
    return my_data;
}

const get_empty_followup_conversation = (params) => {
    let my_date=  new Date();
    var my_followup_conversation = {
        serial: 0,               
        conversation_serial: params.conversation_serial,
        date_followup: my_date,
        summary: null,
        user_serial: null,
        done: null,
        date_to_call: null,
        delivered_to: null,
        type_followup_conversation: null,
        stop_reminder: null,
        felg_reminder: null,
        my_minute: null,
        my_hour: null,
        send_to_userBy: null,
        mark_as_important: false
    }
    return my_followup_conversation
}

function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
            
           // " `hour_to_call`"+oprator+" ," +
           "conversations_serial" + oprator +" , " +
            "date_followup" + oprator +" , " +
            "user_serial "  + oprator+" , " +
            " type_followup_conversation " + oprator+" , " + 
           
            " mark_as_important" + oprator +" , " + 
            " done " + oprator +" , " +
            " stop_reminder " + oprator +" , " +
            " summary " + oprator +"  " + 
             
            
           
           
               sql_end;
    return sql_update_insert;
}

module.exports = {

    async get_followup_conversations_list_by_conversation_serial(params) {
        var sql_str=
              sql_followup_with_prams_by_conversations_serial 
              + sql_conversation_by_conversations_serial ;
        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
                       .query(sql_str,[
                           params.conversations_serial,
                           params.conversations_serial]);
            var my_data = {};
           
                my_data.type_followup_conversation_list = result[0][0];
                my_data.conversation = result[0][1];

                return my_data;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }

    },


    async get_follow_up_conversation_by_serial(params) {
        var sql_str = " SELECT * FROM followup_conversation Where serial=? ;";
       

        if (params.serial != 0) {
            sql_str = sql_str + " " + sql_followup_conversation_helper_tables;
        } else {
            sql_str = sql_followup_conversation_helper_tables;
        }
        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
                     .query(sql_str,[params.serial]);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_followup_conversation(params));
                my_data.main = main_t;
                my_data.user_serial_list = result[0][0];
                my_data.type_followup_conversation_list = result[0][1];
                my_data.main[0].user_serial=params.user_id;
                my_data.main[0].conversations_serial=params.conversations_serial;
            } else {
                my_data.main = result[0][0];
                my_data.user_serial_list = result[0][1];
                my_data.type_followup_conversation_list = result[0][2];

            }

            return my_data;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }

    },

    async save_followup_conversation(params) {

        var sql_head="UPDATE   followup_conversation SET ";
        var sql_oprator="=?";
        var sql_end="   WHERE serial =? ";
        var sql_str = "";
        params.check_done=await function_dal.find_true_false(params.check_done);
        params.stop_reminder=await function_dal.find_true_false(params.stop_reminder);
        params.mark_as_important=await function_dal.find_true_false(params.mark_as_important);
        
        if (params.serial != "0") {
           
               
        }
        else if (params.serial == "0") {
           
            sql_head=" INSERT into   followup_conversation ( ";
                sql_oprator=" ";
                sql_end=") VALUES (?,?,?,?,?,"+
                                 "?,?,? ) ";
        }
         sql_str=built_sql_string(sql_head,sql_oprator,sql_end)
        try {
            let type_followup_conversation=0 ;
            // get type_followup_conversation frpm conversation
            var sql_type_followup_conversation=" Select type_followup_conversation FROM conversation Where serial=? ";
            if(params.serial != "0"){
                let result_conversation = await db_conn_mysql.get_pool().promise()
                            .query(sql_type_followup_conversation,[params.conversations_serial]);

            
                if (result_conversation[0][0].type_followup_conversation){
                    type_followup_conversation=result_conversation[0][0].type_followup_conversation;
                }
            }
            var my_date=new Date();
           // update or insert to followup_conversation
            result = await db_conn_mysql.get_pool().promise()
                
                .query(sql_str,
                    [  
                        params.conversations_serial , 
                        params.date_followup,
                        params.user_serial,
                        params.type_followup_conversation ,
                        params.mark_as_important ,
                        params.check_done ,
                        params.stop_reminder, 
                        params.summary , 
                        params.serial 
                    ]
                    ); 
            // if type_followup_conversation was changed, update conversation
            if (type_followup_conversation != params.type_followup_conversation) {
                let sql_update_conversation = " UPDATE  conversation SET type_followup_conversation=" +
                    params.type_followup_conversation + " Where serial= ? ";
              
              let result_conversation2 = await db_conn_mysql.get_pool().promise()
 
                    .query(sql_update_conversation ,[params.conversations_serial]);
            } 
            // return data for followup_conversation view
            sql_str=sql_followup_with_prams_by_conversations_serial
            + sql_conversation_by_conversations_serial
            let result2 = await db_conn_mysql_multi.get_pool().promise()
                  .query(sql_str,[params.conversation_serial,
                                  params.conversation_serial
                                 ]);
        var my_data = {};
       
            my_data.type_followup_conversation_list = result2[0][0];
            my_data.conversation = result2[0][1];

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




