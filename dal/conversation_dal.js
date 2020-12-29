var config = require("../config").config;
const sql = require('mssql');
var moment = require('moment');
const dbConn = require("./dbConn");


const    sql_conversation_helper_tables=
    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamGoalOfTalk] ORDER BY ParamName " + ";" +
    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTeviaType] ORDER BY ParamName " + ";" +
    " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
    " SELECT[Serial], [ParamName] FROM[InsurDB].[dbo].[ParamTypeFollowupConversation] ORDER BY ParamName " +";"+
    " SELECT NoPolice From LifePolicies Where ClientSerial=@client_serial "+";";

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
    "	[DateFollowUp] as  [תאריך]  , Summary as [תקציר הפניה],UserName as [מטפל בפניה],[StatusFollowUp] as [סטוטס הפניה] ," + " " +
    " [Serial] " + " " +
    "FROM [InsurDB].[dbo].[FollowUpConversationWithParams] WHERE ClientSerial=@client_serial ; "
    ;
const set_result_into_lists = (params ,result) => {
    var my_data = {};
    if (params.serial == 0) {
        var main_t = [];
        
        main_t.push(get_empty_conversation(params));
        my_data.main = main_t;
        my_data.goal_of_talk_list = result.recordsets[0];
        my_data.tevia_type_list = result.recordsets[1];
        my_data.get_call_name_list = result.recordsets[2];
        my_data.type_followup_conversation_list = result.recordsets[3];
        my_data.no_police_list = result.recordsets[4];
        my_data.user_id=params.userId;
    } else {
        my_data.main = result.recordsets[0];
        my_data.goal_of_talk_list = result.recordsets[1];
        my_data.tevia_type_list = result.recordsets[2];
        my_data.get_call_name_list = result.recordsets[3];
        my_data.type_followup_conversation_list = result.recordsets[4];
        my_data.no_police_list = result.recordsets[5];
    }
    return my_data;
}

const get_empty_conversation = (params) => {
    var my_date=new Date();
    
    
    var my_hour=moment().format("HH:mm");
    var my_conversation = {
        Serial: 0,
        ClientSerial: params.client_serial,
        MeetingSerial: params.meeting_serial ,
        Datee:my_date ,
        HourOfDatee:my_hour,
      Get_call_name:null ,
      SendToUserBy:null ,
      DeliveredTo: null ,
      SummaryOfConversation:null,
      DayToCall: null ,
      GoalOfTalk :null ,
      Priority : null ,
      Immediately : null ,
      ToExecution : null ,
      SumSale : null ,
      Meeting : null ,
      Sale : null ,
      Yozma : null ,
      Done : null ,
      Suspend : null ,
      HourToCall : null ,
      FormIsOpenn : null ,
      TypeOfCall : null ,
      StatusGetCallName : null ,
      TypeFollowupConversation: null ,
      NoPolice: null ,
      DataOfSending: null ,
      TypeTevia : null
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


module.exports = {

    
    async get_conversations_list_by_clientserial(params) {

        var by_client_serial = " WHERE ClientSerial=@client_serial ; ";
        var by_no_police = " WHERE NoPolice=@no_police ; "
        var by_meeting_serial ="Where  MeetingSerial=@meeting_serial ;"

        var sql_string = " SELECT  " + " " +
            "  CONVERT( varchar, [Datee] , 103)	   , SummaryOfConversation,GoalOfTalkName , " + " " +
            "UserName,TypeFollowupConversationName ,TypeFollowupConversationName  , Immediately ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ConversationWithParam] ";
          
        if (params.my_no_police) {
            sql_string = sql_string + " " + by_no_police;
        }
        else
        if (params.meeting_serial) {
                sql_string = sql_string + " " + by_meeting_serial;
        }
        else {
            sql_string = sql_string + " " + by_client_serial +"ORDER BY Datee DESC";
        }
           
           
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)
                .input('no_police', sql.NVarChar, params.my_no_police)
                .input('meeting_serial', sql.Int, params.meeting_serial)
            
                .query(sql_string);
                  
            var my_data = {
               
            };
            var main_t = [];
            
            main_t.push(get_empty_conversation(params));
            my_data.main = main_t;
            my_data.conversation_list=result.recordsets[0];
              
            
          // my_data.conversation_list= result.recordsets[0];
          //  return result.recordsets;
            return my_data ;
            // Stored procedure 



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
        var sql_str1 = "SELECT  * FROM [InsurDB].[dbo].[Conversation]  WHERE [Serial]= @serial;" ;
           
        //var sql_str2 =
        //    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamGoalOfTalk] ORDER BY ParamName " + ";" +
        //    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTeviaType] ORDER BY ParamName " + ";" +
        //    " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
        //    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTypeFollowupConversation] ORDER BY ParamName " + ";";
            
        if (params.serial !=0) {
            sql_str = sql_str1 + " " + sql_conversation_helper_tables;
        } else {
            sql_str = sql_conversation_helper_tables;
        }
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .query(sql_str);


            var my_data = set_result_into_lists(params , result);
            //if (params.serial == 0) {
            //    var main_t = [];
            //    main_t.push(get_empty_conversation(params));
            //    my_data.main = main_t;
            //    my_data.goal_of_talk_list = result.recordsets[0];
            //    my_data.tevia_type_list = result.recordsets[1];
            //    my_data.get_call_name_list = result.recordsets[2];
            //    my_data.type_followup_conversation_list = result.recordsets[3];
            //} else {
            //    my_data.main = result.recordsets[0];
            //    my_data.goal_of_talk_list = result.recordsets[1];
            //    my_data.tevia_type_list = result.recordsets[2];
            //    my_data.get_call_name_list = result.recordsets[3];
            //    my_data.type_followup_conversation_list = result.recordsets[4];
            //}

           
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
        if   ( !  params.meeting_serial ) {
            params.meeting_serial = 0;
        }
        if (!params.check_done) {
            params.check_done = false;
        }
        if (!params.immediately) {
            params.immediately = false;
        }

        if(params.no_police==0){
            params.no_police="";
        }
       
            params.datee=new Date();
       
        
        var sql_str = "";
        if (params.serial != "0") {
            sql_str = "UPDATE   dbo.Conversation SET " +
              //  "Datee=@datee  " + "," +
                "Get_call_name=@get_call_name  " + "," +
                " GoalOfTalk=@goal_of_talk " + "," +
                " TypeTevia=@type_tevia " + "," +
                " Done=@done" + "," +
                " Immediately=@immediately" + "," +
                " NoPolice=@no_police" + "," +
                " SummaryOfConversation=@summary_of_conversation " +

                "  WHERE [Serial]= @serial ";
        }
        else if (params.serial == "0") {
            sql_str = "INSERT INTO [InsurDB].[dbo].[Conversation] " + " " +
                " ([ClientSerial]   , [Datee]   ,  [Get_call_name] , [GoalOfTalk]  , [TypeTevia]  ,[SummaryOfConversation] ,  " + " " +
                "  [Immediately] ,  [ToExecution] ,  [Meeting] ,  [Sale] ,  [Yozma] ,  [Done] ,  [Suspend] ,  [FormIsOpenn] , " +
                " [StatusGetCallName] ,MeetingSerial ,HourOfDatee   )" + " " +
                "   VALUES " + " " +
                " (@client_serial , @datee , @get_call_name , @goal_of_talk ,@type_tevia , @summary_of_conversation  , " + 
                " @immediately , @ToExecution , @Meeting ,@Sale , @Yozma ,@done , @Suspend , @FormIsOpenn , " +
                " @StatusGetCallName , @MeetingSerial ,@hour_of_datee )";
           
        }

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request() 
            let result = await dbConn.getPool().request() 
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('get_call_name', sql.Int, params.get_call_name)
                .input('datee', sql.DateTime, params.datee)
                .input('goal_of_talk', sql.Int, params.goal_of_talk)
                .input('type_tevia', sql.Int, params.type_tevia)
                .input('summary_of_conversation', sql.NVarChar, params.summary_of_conversation)
                .input('no_police', sql.NVarChar, params.no_police.trim())
                .input('immediately', sql.Bit , params.immediately)
                .input('ToExecution', sql.Bit , "0")
                .input('Meeting', sql.Bit , "0")
                .input('Sale', sql.Bit , "0")
                .input('Yozma', sql.Bit , "0")
                .input('done', sql.Bit, params.check_done)
                .input('Suspend', sql.Bit, "0")
                .input('FormIsOpenn', sql.Bit, "0")
                .input('StatusGetCallName', sql.Bit, "0")
                .input('MeetingSerial', sql.Int, params.meeting_serial)
                .input('hour_of_datee', sql.NVarChar, params.hour_of_datee)
                

            
            
              
               
                .query(sql_str  );

              //  var sql_string =  get_sql_conversations_list_string(params);
                  var sql_string = " SELECT  " + " " +
                   "  CONVERT( varchar, [Datee] , 103)	   , SummaryOfConversation,GoalOfTalkName , " + " " +
                   "UserName,TypeFollowupConversationName ,TypeFollowupConversationName  ,NoPolice,Done, Immediately ," + " " +
                   " [Serial] " + " " +
                 "FROM [InsurDB].[dbo].[ConversationWithParam] where ClientSerial=@client_serial";
              // sql_str=sql_conversations_list_by_clientserial(params) ;

               //  let result2 = await pool.request()  
               let result2 = await dbConn.getPool().request()
                 .input('client_serial', sql.Int, params.client_serial)
                 .query(sql_string);

            var my_data = {
                conversation_list: result2.recordsets[0]
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




