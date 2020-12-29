
var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

module.exports = {

    async get_proposal_life_list_by_clientserial(params) {
        //  console.log(params.term);
        var sql_string = "SELECT  " +
            " [CompanyName] as [?? ?????] , [KupaNameStr] as [?? ?????] ,  	[dateOpen] as  [?????]  , [ShlavTipulStr] as [??? ??????] ,[summ] as [???? ??????], " + " " +
            " [TakeCareNameStr] as [?? ????] ,[AgentNumbersStr] as  [?? ????]," + " " +
            " Serial " + " " +
            "FROM [InsurDB].[dbo].[KupaGemelWithParam] " + " " +

            "WHERE ClientSerial=@client_serial";

      


        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)

                .query(sql_string);


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

    async get_proposal_life_with_followup_by_clientserial(params) {
     
        var sql_string = " SELECT * " + " " +
            //"	[ProposalDate]  , [TypeInsurLifeName] , [CompanyName] , [StatusName] , " + " " +
            //" [StatusDate] , [Comment] , [FullName]  " + " " +
            //" [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ProposalLifeWithParams]  ; " + " " +

            " SELECT  " + " " +
            "	[Datee]  , [StatusFollowupProposalLifeName] ,  [Comment] , [UserName]  , [FollowupProposalLifeSerial] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowupProposalLifeWithParamsAndClientSerial]  ; ";

      

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)
                .query(sql_string);

            var my_data = {
                father: result.recordsets[0],
                son: result.recordsets[1]
            };
            //  return result.recordsets;
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
    
    async get_new_proposal_life(params) {

        var sql_string = " SELECT * " + " " +
           
            "FROM [ProposalLifeWithParams]  ; " + " " +

            " SELECT  " + " " +
            "	[Datee]  , [StatusFollowupProposalLifeName] ,  [Comment] , [UserName]  , [FollowupProposalLifeSerial] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowupProposalLifeWithParamsAndClientSerial]  ; ";



        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.serial)
                .query(sql_string);

            var my_data = {
                father: result.recordsets[0],
                son: result.recordsets[1]
            };
            //  return result.recordsets;
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

    async get_proposal_life_by_serial(params) {
        var a = params.serial;
        var sql_string = "SELECT  * FROM [InsurDB].[dbo].[Conversation]  WHERE [Serial]= @serial;" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamGoalOfTalk] ORDER BY ParamName " + ";" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTeviaType] ORDER BY ParamName " + ";" +
            " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamTeviaType] ORDER BY ParamName " + ";"
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

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

    async save_proposa_lifel(params) {
        var a = params.summary_of_conversation;
        var summary_of_conversation = JSON.stringify(a);
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('datee', sql.NVarChar, params.datee)
                .input('goal_of_talk', sql.Int, params.goal_of_talk)
                .input('type_tevia', sql.Int, params.type_tevia)
                .input('summary_of_conversation', sql.NVarChar, params.summary_of_conversation)


                .query("UPDATE   dbo.Conversation SET " +


                "Datee=@datee  " + "," +

                " GoalOfTalk=@goal_of_talk " + "," +
                " TypeTevia=@type_tevia " + "," +
                " SummaryOfConversation=@summary_of_conversation " +

                "  WHERE [Serial]= @serial "

                );

            return result.recordsets;
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




