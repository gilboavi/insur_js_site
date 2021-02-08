var config = require("../config").config;
const sql = require('mssql');
var moment = require('moment');

const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");
const function_dal=  require("./function_dal");
    



const    sql_conversation_helper_tables=
    " SELECT  serial ,  param_name  FROM  param_goal_of_talk  ORDER BY param_name " + ";" +
    " SELECT serial ,  param_name  FROM  param_tevia_type  ORDER BY param_name " + ";" +
    " SELECT serial ,  user_name  FROM  users  ORDER BY user_name " + ";" +
    " SELECT serial ,  param_name  FROM param_type_followup_conversation  ORDER BY param_name " +";"+
    " SELECT no_police From life_policies Where client_serial=? "+";";

const sql_conversation_with_params_by_client_serial=
    " SELECT DATE_FORMAT(datee, '%Y / %m /%d ')  , "+
    " `summary_of_conversation`, "+
    " `goal_of_talk_name` , " + 
    " `user_name` , "+
    "  `type_followup_conversation_name` ," + 
     " `no_police` ," +
      " `done` , "+
      " `immediately` ," +
    " `serial` " + 
    " FROM `conversation_with_param` "+
    "  WHERE `client_serial`=? ; ";

const sql_conversation_with_followup =
    " SELECT  " +
	" datee , summary_of_conversation, goal_of_talk_name , " + 
	" user_name,type_followup_conversation_name  ," + 
	"  serial  " + 
	" FROM    conversation_with_param  " +
	" WHERE client_serial=?; " + 
	" SELECT  	 date_followup   , summary , user_name , " +
	"  status_follow_up ,  conversations_serial ," + " " +
	"  serial  " + " " +
	" FROM    followup_conversation_with_params_and_client_serial  " +
    " WHERE client_serial=?; ";

const sql_followup = " SELECT  " + " " +
    "	[DateFollowUp] as  [תאריך]  , Summary as [תקציר הפניה],UserName as [מטפל בפניה],[StatusFollowUp] as [סטוטס הפניה] ," + " " +
    " [Serial] " + " " +
    "FROM [InsurDB].[dbo].[FollowUpConversationWithParams] WHERE ClientSerial=@client_serial ; "
    ;
const set_result_into_lists = (params ,result) => {
    var my_data = {};
    my_data.goal_of_talk_list = result[1];
    my_data.tevia_type_list = result[2];
    my_data.get_call_name_list = result[3];
    my_data.type_followup_conversation_list = result[4];
    my_data.no_police_list = result[5];
    if (params.serial == 0) {
        // var main_t = [];
        // main_t.push(get_empty_conversation(params));
    my_data.goal_of_talk_list = result[0];
    my_data.tevia_type_list = result[1];
    my_data.get_call_name_list = result[2];
    my_data.type_followup_conversation_list = result[3];
    my_data.no_police_list = result[4];
        var main_t=get_empty_conversation(params);
        my_data.main = main_t;
       
        my_data.user_id=params.user_id;
    } else {
        my_data.main = result[0][0];
       
    }
    return my_data;
}

const get_empty_conversation = (params) => {
    var my_date=new Date();
    
    
    var my_hour=moment().format("HH:mm");
    var my_conversation = {
        serial: 0,
        client_serial: params.client_serial,
        meeting_serial: params.meeting_serial ,
        datee:my_date ,
        hour_of_datee:my_hour,
      get_call_name:null ,
      send_to_user_by:null ,
      delivered_to: null ,
      summary_of_conversation:null,
      day_to_call: null ,
      goal_of_talk :null ,
      priority : null ,
      immediately : null ,
      to_execution : null ,
      sum_sale : null ,
      meeting : null ,
      sale : null ,
      yozma : null ,
      done : null ,
      suspend : null ,
      hour_to_call : null ,
      form_is_openn : null ,
      type_of_call : null ,
      status_get_call_name : null ,
      type_followup_conversation: null ,
      no_police: null ,
      data_of_sending: null ,
      type_tevia : null
    }
    return my_conversation;
}

const get_empty_followup_conversation = (params) => {
    var my_followup_conversation = {
        Serial:0,
        ConversationsSerial: params.conversation_serial,
      DateFollowUp:null,
      Summary:null,
      UserSerial:null,
      Done:null,
      DateToCall:null,
      DeliveredTo: null,
      TypeFollowupConversation: null,
      StopReminder: null,
      FelgReminder: null,
      myMinute: null,
      myHour: null,
      SendToUserBy: null,
      MarkAsImportant: false
    }
    return my_followup_conversation
}

const get_sql_conversations_list_string= (params) => {
    var where_str="";
    var by_client_serial = " WHERE ClientSerial=@client_serial ; ";
    var by_no_police = " WHERE NoPolice=@no_police ; "
    var by_meeting_serial ="Where  MeetingSerial=@meeting_serial ;"

    var sql_conversation = " SELECT  " + " " +
        "  CONVERT( varchar, [Datee] , 103)	   , SummaryOfConversation,GoalOfTalkName , " + " " +
        "UserName,TypeFollowupConversationName ,TypeFollowupConversationName  , Immediately ," + " " +
        " [Serial] " + " " +
        "FROM [InsurDB].[dbo].[ConversationWithParam] ";
      
    if (params.no_police) {
        where_str = by_no_police;
    }
    else
        if (params.meeting_serial) {
            where_str =  by_meeting_serial;
    }
    else {
        where_str = by_client_serial;
    }
       
       
   return sql_conversation +" "+where_str;
   
            
}

function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
            "`client_serial`"+oprator+"," + 
            " `done`"+oprator+" ," +
            " `immediately`"+oprator+" ," +
            " `datee`"+oprator+" ," +
           // " `hour_to_call`"+oprator+" ," +
            " `get_call_name`"+oprator+" , " +
            " `goal_of_talk`"+oprator+" , " +
            " `type_tevia`"+oprator+" ," +
            " `no_police`"+oprator+" , " +
            " `summary_of_conversation`"+oprator+" " +
            
           
           
               sql_end;
    return sql_update_insert;
}

module.exports = {

    
    async get_conversations_list_by_clientserial(params) {
        var my_parameter;
        var by_client_serial = " WHERE client_serial=? ; ";
        var by_no_police = " WHERE no_police=? ; "
        var by_meeting_serial ="Where  meeting_serial=? ;"

        var sql_string = " SELECT  " + " " +
            "  DATE_FORMAT(datee, '%d %m %Y') , summary_of_conversation,goal_of_talkName , " + " " +
            "user_name,type_followup_conversation_name ,type_followup_conversation_name  , immediately ," + " " +
            " serial " + " " +
            "FROM conversation_with_param ";
          
        if (params.my_no_police) {
            sql_string = sql_string + " " + by_no_police;
            my_parameter=params.my_no_police;
        }
        else
        if (params.meeting_serial) {
                sql_string = sql_string + " " + by_meeting_serial;
                my_parameter=params.serial;
        }
        else {
            sql_string = sql_string + " " + by_client_serial +"ORDER BY datee DESC";
            my_parameter=params.client_serial;
        }
           
           
        try {
            
            let result = await db_conn_mysql.get_pool().promise()
                     .query(sql_string,[my_parameter]);
                  
            var my_data = {
               
            };
            var main_t = [];
            
            main_t.push(get_empty_conversation(params));
            my_data.main = main_t;
            my_data.conversation_list=result[0][0];
          
            return my_data ;
          
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_conversation_by_serial(params) {
        var sql_str="";
        var sql_str1 = "SELECT  * FROM conversation  WHERE serial= ?;" ;
        if (params.serial !=0) {
            sql_str = sql_str1 + " " + sql_conversation_helper_tables;
        } else {
            sql_str = sql_conversation_helper_tables;
        }
       
       
        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
                  .query(sql_str,
                        [params.serial,params.client_serial]
                    );


            var my_data = set_result_into_lists(params , result[0]);
                      
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

    async save_conversation(params) {

        var sql_head="UPDATE   `conversation` SET ";
        var sql_oprator="=?";
        var sql_end="   WHERE `serial`=? ";
        
        var sql_str = "";

        if   ( !  params.meeting_serial ) {
            params.meeting_serial = 0;
        }
       
        
        params.done=await function_dal.find_true_false(params.done);
        params.immediately=await function_dal.find_true_false(params.immediately);
        
       
        
        
        

        if(params.no_police==0){
            params.no_police="";
        }
       
        //params.datee=new Date();
        
        
         if (params.serial == "0") {
            
                sql_head=" INSERT into   conversation ( ";
                sql_oprator=" ";
                sql_end=") VALUES (?,?,?,?,?,"+
                                 "?,?,?,? ) ";
        }

               
        sql_str=built_sql_string(sql_head,sql_oprator,sql_end);
       // params.datee=new Date();
        try {
            
            let result = await db_conn_mysql.get_pool().promise() 
                .query(sql_str ,
                        [
                            params.client_serial,
                            params.done,
                            params.immediately,
                            params.datee,
                            params.get_call_name,
                            params.goal_of_talk,
                            params.type_tevia,
                            params.no_police,
                            params.summary_of_conversation,
                            params.serial
                        ] 
                     );

                
               let result2 = await db_conn_mysql.get_pool().promise()
                
                 .query(sql_conversation_with_params_by_client_serial, [params.client_serial]);

            var my_data = {
                conversation_list: result2[0]
            };
    
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

     //  ========     follow_up  ========


    async get_conversations_with_followup_by_clientserial(params, my_pool) {
        var pool = my_pool;
        var sql_conversations_with_followup =

            " SELECT  	[Datee]  , SummaryOfConversation , GoalOfTalkName , " + " " +
            "UserName,TypeFollowupConversationName  ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ConversationWithParam] WHERE ClientSerial=@client_serial ; " + " " +
            " SELECT  	[DateFollowUp]  , Summary , UserName , [StatusFollowUp]  , [ConversationsSerial] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@client_serial ; ";
        try {
            // if (pool == null || typeof (pool) == 'undefined') {
            //     pool = await sql.connect(config.mssql.test_db)
            // }

            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_conversations_with_followup);

            var my_data = {

                Conversation_list: result.recordsets[0],
                FollowUpConversation_list: result.recordsets[1]
            };

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


    async get_follow_up_conversation_by_serial(params) {
        var sql_str1 = " SELECT * FROM [InsurDB].[dbo].[FollowUpConversation] Where Serial=@serial";
        var sql_str2 = " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTypeFollowupConversation] ORDER BY ParamName ";

        if (params.serial != 0) {
            sql_str = sql_str1 + " " + sql_str2;
        } else {
            sql_str = sql_str2;
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
                main_t.push(get_empty_followup_conversation(params));
                my_data.main = main_t;
                my_data.user_serial_list = result.recordsets[0];
                my_data.type_followup_conversation_list = result.recordsets[1];
            } else {
                my_data.main = result.recordsets[0];
                my_data.user_serial_list = result.recordsets[1];
                my_data.type_followup_conversation_list = result.recordsets[2];

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
        //var a = params.summary_of_conversation;
        //var summary_of_conversation = JSON.stringify(a);

        var sql_str = "";
        if (params.serial != "0") {
            sql_str = "UPDATE   dbo.FollowUpConversation SET " +
                " DateFollowUp=@date_followup  " + "," +
                "UserSerial=@user_serial  " + "," +
                " TypeFollowupConversation=@type_followup_conversation " + "," +
                " Summary=@summary " +
                "  WHERE [Serial]= @serial ";
        }
        else if (params.serial == "0") {
            sql_str = "INSERT INTO [InsurDB].[dbo].[FollowUpConversation] " + " " +
                " ([DateFollowUp]   , [UserSerial]   ,  [TypeFollowupConversation] , [Summary]  )" + " " +

                "   VALUES " + " " +
                " (@date_followup , @user_serial , @type_followup_conversation ,@summary   )";

        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('date_followup', sql.DateTime, params.date_followup)
                .input('user_serial', sql.Int, params.user_serial)
                .input('type_followup_conversation', sql.Int, params.type_followup_conversation)
                
                .input('summary', sql.NVarChar, params.summary)
            


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

    // ====== conversations_filtering =============
             
    async get_conversations_params_for_filtering(params) {
        var params = {};
        params.serial = 0;
      
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, "0")
                .query(sql_conversation_helper_tables);


            var my_data = set_result_into_lists(params, result);
            my_data.goal_of_talk_list = result.recordsets[0];
            my_data.tevia_type_list = result.recordsets[1];
            my_data.get_call_name_list = result.recordsets[2];
            my_data.type_followup_conversation_list = result.recordsets[3];
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

    async get_conversations_list_after_filtering(params) {
        var sql_str = "SELECT [FirstName] + ' ' + [LastName] as [שם לקוח], " +
            " CONVERT( varchar, [Datee] , 103) as [תאריך], SummaryOfConversation, GoalOfTalkName as [מטרת השיחה] , " +
            " UserName as [שם מטפל], TypeFollowupConversationName as [סטטוס],  Serial " +
            " FROM[InsurDB].[dbo].[ConversationWithParam]  " +
            " WHERE (Done=@done) ";
        if (params.check_done == "true") {
            params.check_done = 1;
        } else {
            params.check_done = 0;
        }
        if (params.check_get_call_name == "true") {
            sql_str = sql_str + " AND  (Get_call_name=@get_call_name)"
        }
        if (params.check_goal_of_talk == "true") {
            sql_str = sql_str + " AND  (GoalOfTalk=@goal_of_talk)"
        }
        if (params.check_type_followup_conversation == "true") {
            sql_str = sql_str + " AND  (TypeFollowupConversation=@type_followup_conversation)"
        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('done', sql.Bit, params.check_done)
                .input('get_call_name', sql.Int, params.get_call_name)
                .input('goal_of_talk', sql.Int, params.goal_of_talk)
                .input('type_followup_conversation', sql.Int, params.type_followup_conversation)
                .query(sql_str);


            return result.recordsets;
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    }

}




