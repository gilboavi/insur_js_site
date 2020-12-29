var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const sql_meeting =  "SELECT  " +
    "  CONVERT( varchar, [MeetingDate] , 103) as  [MeetingDate]    , [MeetingSummary]   , " + " " +
    "  [AgentNameStr] , [UserNameStr]  , " + " " +
    " [MeetingStatusStr] ,Done , [Serial]  " + " " +
    "FROM  [MeetingWithParam]  ";

const sql_meeting_by_done = "SELECT  " +
    " (LastName +' '+ FirstName) as FullName ,  "+
    "  CONVERT( varchar, [MeetingDate] , 103)    , [MeetingSummary]   , " + " " +
    "  [AgentNameStr] , [UserNameStr]  , " + " " +
    " [MeetingStatusStr] ,Done , [Serial]  " + " " +
    "FROM  [MeetingWithParam]  WHERE Done=@done";

const where_by_client_serial = " WHERE ClientSerial=@client_serial" + ";";
const where_by_done= " WHERE Done=@done" + ";";


function get_empty_meeting_table(client_serial) {
    var my_empty_meeting = {
        Serial: 0,
        ClientSerial: client_serial,
        MeetingDate: null,
        MeetingSummary: null,
        AgentName: null,
        EditorName:0,
        InstructionBeforMeeting: null,
        MeetingStatus: 0,
        Done:0
      
    }
    return my_empty_meeting;
}

module.exports = {

    async get_meeting_list_by_clientserial(params) {
              
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)

                .query(sql_meeting + where_by_client_serial   );


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


    async get_meeting_list_by_done(params) {

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('done', sql.Int, params.done)

                .query(sql_meeting_by_done);


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

    async get_meeting_by_serial(params) {
        var sql_str_1 = "";
        if (params.serial != "0") {
            sql_str_1 = "SELECT  " +
                "  [ClientSerial] , [MeetingDate]  , [MeetingSummary]  , " + " " +
                "  [AgentName]  , [EditorName]   , [InstructionBeforMeeting]    , " + " " +
                " [MeetingStatus]   , [Serial]  " + " " +
                "FROM  [Meeting]  " + " " +
                "WHERE [Serial] =@serial" + ";";
        } 
       
        var sql_string_2 =
            " SELECT[Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
            " SELECT[Serial], [AgentName] FROM [InsurDB].[dbo].[Agents] ORDER BY AgentName " + ";" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamMeetingStatus] ORDER BY ParamName " + ";";
        var sql_str = sql_str_1 + sql_string_2;
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_str);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_meeting_table(params.client_serial))
                my_data.main = main_t;
              //  my_data.main[0].ClientSerial = Number(params.client_serial);

              
                my_data.user_name_list = result.recordsets[0];
                my_data.agent_name_list  = result.recordsets[1];
                my_data.meeting_status_list  = result.recordsets[2];
               
            } else {
                my_data.main = result.recordsets[0];
                my_data.user_name_list = result.recordsets[1];
                my_data.agent_name_list = result.recordsets[2];
                my_data.meeting_status_list = result.recordsets[3];
              
               
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
        if (params.serial==0) {
            sql_str = "INSERT INTO   dbo.Meeting  " +
                "( [ClientSerial]   , [MeetingDate] , [MeetingSummary] , [AgentName] , [MeetingStatus] , [EditorName] ) " + " " +
                "   VALUES " + " " +
                " (@client_serial , @meeting_date , @meeting_summary , @agent_name , @meeting_status , @editor_name)";
        } else {
            sql_str =   "UPDATE   dbo.Meeting SET " +
                            "ClientSerial=@client_serial " + "," +
                            " MeetingDate=@meeting_date " + "," +
                            " MeetingSummary=@meeting_summary " + "," +
                            " AgentName=@agent_name " + "," +
                            " MeetingStatus=@meeting_status " + "," +
                            " EditorName=@editor_name " +
                            "  WHERE [Serial]= @serial "
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
                .input('meeting_date', sql.DateTime , params.meeting_date)
                .input('meeting_summary', sql.NVarChar, params.meeting_summary)
                .input('agent_name', sql.Int, params.agent_name)
                .input('meeting_status', sql.Int, params.meeting_status)
                .input('editor_name', sql.Int, params.editor_name)
                .query(sql_str  );

                //let result2 = await pool.request()
                let result2 = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)

                .query(sql_meeting + where_by_client_serial   );
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



