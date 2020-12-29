// followup_conversation_dal
var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_followup_conversation_helper_tables =
    
    " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
    " SELECT[Serial], [ParamName] FROM[InsurDB].[dbo].[ParamTypeFollowupConversation] ORDER BY ParamName " + ";";

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

const sql_followup = " SELECT  " + " " +
    " CONVERT( varchar, [DateFollowUp]  , 103)	 , Summary,UserName ,[StatusFollowUp]  , " + " " +
    " [Serial] " + " " +
    "FROM [InsurDB].[dbo].[FollowUpConversationWithParams] WHERE ConversationsSerial=@conversations_serial ; "
    ;

const sql_conversation = " SELECT  " + " " +
    " Serial, SummaryOfConversation From Conversation Where Serial=@conversations_serial ; ";

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
        Serial: 0,               
        ConversationsSerial: params.conversation_serial,
        DateFollowUp: my_date,
        Summary: null,
        UserSerial: null,
        Done: null,
        DateToCall: null,
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

module.exports = {

    async get_followup_conversations_list_by_conversation_serial(params) {
     

      
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('conversations_serial', sql.Int, params.conversations_serial)
                .query(sql_followup + sql_conversation);
            var my_data = {};
           
                my_data.type_followup_conversation_list = result.recordsets[0];
                my_data.conversation = result.recordsets[1];

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
        var sql_str = " SELECT * FROM [InsurDB].[dbo].[FollowUpConversation] Where Serial=@serial";
       

        if (params.serial != 0) {
            sql_str = sql_str + " " + sql_followup_conversation_helper_tables;
        } else {
            sql_str = sql_followup_conversation_helper_tables;
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
                my_data.main[0].UserSerial=params.userId;
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
            sql_str = "UPDATE  FollowUpConversation SET " +
              //  " DateFollowUp=@date_followup  " + "," +
                "UserSerial=@user_serial  " + "," +
                " TypeFollowupConversation=@type_followup_conversation " + "," +
                " Summary=@summary , " +
                " MarkAsImportant=@mark_as_important ," +
                " Done= @check_done ," +
                " StopReminder=@stop_reminder " +
                "  WHERE [Serial]= @serial ";
        }
        else if (params.serial == "0") {
            sql_str = "INSERT INTO [InsurDB].[dbo].[FollowUpConversation] " + " " +
                " ( [ConversationsSerial] ,  [DateFollowUp]   , [UserSerial]   ,  [TypeFollowupConversation] , [Summary] , " +
                " MarkAsImportant, Done ,StopReminder  )" + " " +

                "   VALUES " + " " +
                " ( @conversations_serial ,  @date_followup , @user_serial , @type_followup_conversation ,@summary , " +
                " @mark_as_important , @check_done  , @stop_reminder )";
             
        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result_conversation = await pool.request()
            let result_conversation = await dbConn.getPool().request()
                .input('serial', sql.Int, params.conversations_serial)
                .query(" Select TypeFollowupConversation FROM [Conversation] Where Serial=@serial ");

            let type_followup_conversation = result_conversation.TypeFollowupConversation;

           //let result = await pool.request()
            result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('conversations_serial', sql.Int, params.conversations_serial)
                .input('date_followup', sql.DateTime,new Date())
                .input('user_serial', sql.Int, params.user_serial)
                .input('type_followup_conversation', sql.Int, params.type_followup_conversation)
                .input('summary', sql.NVarChar, params.summary)
                .input('mark_as_important', sql.Bit, params.mark_as_important)
                .input('check_done', sql.Bit, params.check_done)
                .input('stop_reminder', sql.Bit, params.stop_reminder)
            
                .query(sql_str); 

            if (type_followup_conversation != params.type_followup_conversation) {
                let sql_update_conversation = " UPDATE  Conversation SET TypeFollowupConversation=" +
                    params.type_followup_conversation + " Where Serial= @serial ";
              //  let result_conversation2 = await pool.request()
              let result_conversation2 = await dbConn.getPool().request()
                    .input('serial', sql.Int, params.conversations_serial)
                    .query(sql_update_conversation);
            } 
            // let result2 = await pool.request()
            let result2 = await dbConn.getPool().request()
            .input('conversations_serial', sql.Int, params.conversations_serial)
            .query(sql_followup + sql_conversation);
        var my_data = {};
       
            my_data.type_followup_conversation_list = result2.recordsets[0];
            my_data.conversation = result2.recordsets[1];

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




