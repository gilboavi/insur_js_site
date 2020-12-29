var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");

const  sql_kupa_gemel = "SELECT  " +
    " [CompanyName]  , [KupaNameStr]  , [MaslulKupaNameStr]  , " + " " +
    " [TypeKupaNameStr]  , [NoAmit]  , CONVERT( varchar, [dateOpen] , 103) ," + " " +
    " [ShlavTipulStr] ,[summ] , " + " " +
    " [TakeCareNameStr]  ,[Agent]  , [comment] , " + " " +
    " Serial " + " " +
    " FROM [KupaGemelWithParam] " ;

const get_my_kupa_gemel = (params)=> {
    var my_kupa_gemel = {
        Serial: 0,
        ClientSerial: Number(params.client_serial) ,
        id: null,
        TypeKupa: null,
        MaslulKupa: null,
        ShlavTipul: null,
        NoAmit: null,
        dateOpen: null,
        dateSign: null,
        DmayNihul: null,
        NameKupa: null,
        summ: null,
        premia: null,
        Agent: null,
        comment: null,
        zvira: null,
        PremiaStop: null,
        tipul: null,
        KupaOld: null,
        NoAmitOld: null,
        NoKupa: null,
        DateVetek: null,
        ytraOpen: null,
        profit: null,
        tagbulim: null,
        DateUpdate: null,
        sendToNewKupa: null,
        sendToOldKupa: null,
        DateFinishTransfer: null,
        SumTransfer: null,
        TakeCareName: null,
        SendBy: null,
        ShlavTipulDate: null,
        Company: null,
        NoAgentInCompany: null,
        Employer: null
    }
    return my_kupa_gemel;
}

module.exports = {

     

    async get_kupa_gemel_list_by_clientserial(params) {
        //  console.log(params.term);
        var sql_string = "SELECT  " +
            " [CompanyName] as [שם החברה] , [KupaNameStr] as [שם הקופה] , [MaslulKupaNameStr] as [מסלול קופה] , " + " " +
            " [TypeKupaNameStr] as [סוג קופה] , [NoAmit] as [מספר עמית] , CONVERT( varchar, [dateOpen] , 103) as [תאריך], [ShlavTipulStr] as [שלב הטיפול] ,[summ] as [סכום הצבירה], " + " " +
            " [TakeCareNameStr] as [שם מטפל] ,[AgentName] as  [שם סוכן] , [comment] as [הערה] , " + " " +
            " Serial " + " " +
            " FROM [InsurDB].[dbo].[KupaGemelWithParam] " + " " +
            " WHERE ClientSerial=@client_serial";
            sql_string=sql_kupa_gemel+   " WHERE ClientSerial=@client_serial";

      


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

    async get_kupa_gemel_with_followup_by_clientserial(params) {
        //  console.log(params.term);
        var sql_string2 = " SELECT  " + " " +
            "	[Datee] as  [תאריך]  , SummaryOfConversation,GoalOfTalkName as [מטרת השיחה], " + " " +
            "UserName,TypeFollowupConversationName as [שם מטפל],TypeFollowupConversationName  [סטוטס]," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ConversationWithParam] WHERE ClientSerial=@client_serial ; " + " " +
            " SELECT  " + " " +
            "	[DateFollowUp] as  [תאריך]  , Summary as [תקציר הפניה],UserName as [מטפל בפניה],[StatusFollowUp] as [סטוטס הפניה] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@client_serial ; ";

        var sql_string = " SELECT  " + " " +
            "	[Datee]  , SummaryOfConversation , GoalOfTalkName , " + " " +
            "UserName,TypeFollowupConversationName  ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[ConversationWithParam] WHERE ClientSerial=@client_serial ; " + " " +
            " SELECT  " + " " +
            "	[DateFollowUp]  , Summary , UserName , [StatusFollowUp]  , [ConversationsSerial] ," + " " +
            " [Serial] " + " " +
            "FROM [InsurDB].[dbo].[FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@client_serial ; ";

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
        finally {
            sql.close();
        }
    },


    async get_kupa_gemel_by_serial(params) {
        
        var sql_string = "";
          sql_string = " SELECT  * FROM [InsurDB].[dbo].[KupaGemel]  WHERE [Serial]= @serial;" +
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaMaslul] ORDER BY ParamName " + ";" +
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaType] ORDER BY ParamName " + ";" +
                " SELECT [Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaShlavTipul] ORDER BY ParamName " + ";" +
                " SELECT * FROM [InsurDB].[dbo].[AgentNumber] ORDER BY NoAgent " + ";"
        if (params.serial==0) {
            sql_string =
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaMaslul] ORDER BY ParamName " + ";" +
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaType] ORDER BY ParamName " + ";" +
                " SELECT [Serial], [UserName] FROM [InsurDB].[dbo].[Users] ORDER BY UserName " + ";" +
                " SELECT [Serial], [ParamName] FROM [InsurDB].[dbo].[ParamKupaShlavTipul] ORDER BY ParamName " + ";" +
                " SELECT * FROM [InsurDB].[dbo].[AgentNumber] ORDER BY NoAgent " + ";"
        }
       
       
        
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request() 
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_my_kupa_gemel(params))
                my_data.main = main_t;
               // my_data.main[0].ClientSerial = Number(params.client_serial);
             
                my_data.maslul_kupa_list = result.recordsets[0];
                my_data.type_kupa_list = result.recordsets[1];
                my_data.users_list = result.recordsets[2];
                my_data.shlav_tipul_list = result.recordsets[3];
                my_data.agent_number_list = result.recordsets[4];
                my_data.main[0].TakeCareName=params.userId;
            } else {
                my_data.main = result.recordsets[0];
                my_data.maslul_kupa_list = result.recordsets[1];
                my_data.type_kupa_list = result.recordsets[2];
                my_data.users_list = result.recordsets[3];
                my_data.shlav_tipul_list = result.recordsets[4];
                my_data.agent_number_list = result.recordsets[5];
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

    async  get_kupa_gemel_list_after_filtering(params) {
        var sql_where = " Where ";
        var sql_str = "";
   
        if (params.agent_check) {
            sql_str = sql_str + " AND  Agent = @agent";
        }

        if (params.shlav_tipul_check) {
            sql_str = sql_str + " AND ShlavTipul = @shlav_tipul";
        }

        
        if (params.type_kupa_check) {
            sql_str = sql_str + " AND TypeKupa = @type_kupa";
        }

        if (params.maslul_kupa_check ) {
            sql_str = sql_str + " AND MaslulKupa = @maslul_kupa";
        }

        if (params.user_check) {
            sql_str = sql_str + " AND TakeCareName = @user";
        }
        //var i = sql_str.length;
        

        if (sql_str == "") {
            sql_str = sql_kupa_gemel ;
        }
        else {
            sql_str = sql_str.substr(4, sql_str.length);
            sql_str = sql_kupa_gemel + " " + sql_where+ sql_str;
        }
      //  sql_str = sql_kupa_gemel + " WHERE " + sql_str
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('agent', sql.Int, params.agent)
                .input('shlav_tipul', sql.Int, params.shlav_tipul)
                .input('type_kupa', sql.Int, params.type_kupa)
                .input('maslul_kupa', sql.Int, params.maslul_kupa)
                .input('user', sql.Int, params.user)
                .query(sql_str);


            return result.recordsets;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }


    },

    async save_kupa_gemel(params) {
        var sql_str ="";
        sql_string=sql_kupa_gemel+   " WHERE ClientSerial=@client_serial";
       
       
        if (Number(params.dmay_nihul )==0) {
            params.dmay_nihul = null;
        }
 
        if (Number( params.no_amit)==0) {
            params.no_amit = null;
        }
        if (Number(params.no_amit_old)==0 ) {
            params.no_amit_old = null;
        }
        if (Number(params.no_kupa)==0 ) {
            params.no_kupa = null;
        }
        //if (Number(params.kupa_old)==0 ) {
        //    params.kupa_old = null;
        //}
        if (Number(params.type_kupa)==0) {
            params.type_kupa = null;
        }

        if (Number(params.summ)==0) {
            params.summ = null;
        }
        if (Number(params.premia)==0 ) {
            params.premia = null;
        }
       
        if (Number(params.shlav_tipul)==0 ) {
            params.shlav_tipul = null;
        }
        if (Number(params.user)== 0 ) {
            params,user = null;
        }

        if (params.serial != "0"){
       
            sql_str = "UPDATE   [InsurDB].[dbo].[KupaGemel] SET " +

            "Agent=@agent  " + "," +
            "ShlavTipul=@shlav_tipul" + "," +

            "dateOpen=@date_open" + "," +

            " NoKupa=@no_kupa " + "," +
            " TypeKupa=@type_kupa " + "," +
            " MaslulKupa=@maslul_kupa " + "," +
            " TakeCareName=@user " + "," +
            " NoAmit=@no_amit " + "," +
            " DmayNihul=@dmay_nihul " + "," +
            " summ=@summ " + "," +
            " premia=@premia " + "," +
            " NoAmitOld=@no_amit_old " + "," +
            " KupaOld=@kupa_old " + "," +

            "comment=@comment " +

            "  WHERE [Serial]= @serial ";
        } else {
            sql_str = "INSERT INTO [InsurDB].[dbo].[KupaGemel] " + " " +
                "( [ClientSerial]   , [Agent] , [ShlavTipul] , [dateOpen] , [NoKupa] , [TypeKupa] , " + " " +
                " [MaslulKupa] , [TakeCareName] , [NoAmit] , [DmayNihul] , [summ] , [premia] ," + " " +
                " [NoAmitOld] , [KupaOld] , [comment] ) " + " " +
                "   VALUES " + " " +
                " (@client_serial , @agent  , @shlav_tipul , @date_open ,  @no_kupa , @type_kupa ,  " + " " +
                " @maslul_kupa , @user , @no_amit , @dmay_nihul , @summ , @premia , @no_amit_old , @kupa_old , @comment )  ";
        }
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('client_serial', sql.Int, params.client_serial)
                .input('agent', sql.Int, params.agent)
                .input('shlav_tipul', sql.Int, params.shlav_tipul)
                .input('date_open', sql.DateTime , params.date_open)
                .input('no_kupa', sql.Int, params.no_kupa)
                .input('type_kupa', sql.Int, params.type_kupa)
                .input('maslul_kupa', sql.Int, params.maslul_kupa)
                .input('user', sql.Int, params.user)
                .input('no_amit', sql.Int, params.no_amit)
                .input('dmay_nihul', sql.Float, params.dmay_nihul)
                .input('summ', sql.Int, params.summ)
                .input('premia', sql.Int, params.premia)
                .input('no_amit_old', sql.Int, params.no_amit_old)
                .input('kupa_old', sql.NVarChar, params.kupa_old)

                .input('comment', sql.NVarChar, params.comment.trim())


                .query(sql_str );

                // let result2 = await pool.request()
                let result2 = await dbConn.getPool().request()
                .input('client_serial', sql.Int, params.client_serial)

                .query(sql_string);


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




