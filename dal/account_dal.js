
var config = require("../config").config;
var conversation = require("../dal/conversation_dal");
const sql = require('mssql');
const mysql = require('mysql2');
const dbConn = require("./dbConn");
const db_conn_mysql = require("./db_con_mysql");

const  sql_client_helper_tables = " SELECT[Serial], [ParamName] FROM [ParamClientType] ORDER BY ParamName " + ";" +
    " SELECT[Serial], [AgentName] FROM [Agents]  ORDER BY AgentName " + ";" +
    " SELECT[Serial], [ParamName] FROM [ParamOperation] ORDER BY ParamName ;" ;
 
const sql_client =" SELECT  * FROM  `clients_with_params` WHERE `serial`= ?;";

const sql_communicatuion= "SELECT `communication_type` ,"+
                                 " `communication_value` ,"+
                                 "  `comment` , `serial` "+
                                 " FROM  `communication` "+
                                 " WHERE `client_serial`= ? ;" ;
//  CONVERT( varchar, [Datee] , 103)

const sql_conversation= " SELECT `datee`  , "+
                " `summary_of_conversation`, "+
                " `goal_of_talk_name` , " + 
                " `user_name` , "+
                "  `type_followup_conversation_name` ," + 
                 " `no_police` ," +
                  " `done' , "+
                  " `immediately` ," +
                " `serial` " + 
                " FROM `conversation_with_param` "+
                "  WHERE `client_serial`=? ; ";

const sql_followup_conversation= " SELECT  	[DateFollowUp]  , Summary , UserName , "+
        " [StatusFollowUp]  , [ConversationsSerial] , [Serial] " + " " +
        "FROM [FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@serial ; ";
 
const sql_for_auto_complete="SELECT *  FROM Clients " +
        "WHERE cast([id] as nvarchar) like @term + '%' " +
        "OR[LastName]  like @term + '%' " +
        "OR[FirstName] like @term + '%'  Order by LastName";

const sql_families="SELECT *  FROM FamilyMembers Where ClientSerial= @serial; " ;

const sql_family_members=" Select LastName, FirstName,Member_type, ClientSerial From FamilyMembersWithParams Where FamiliesSerial=@families_serial"

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    const genreA = a.genre.toUpperCase();
    const genreB = b.genre.toUpperCase();

    let comparison = 0;
    if (genreA > genreB) {
        comparison = 1;
    } else if (genreA < genreB) {
        comparison = -1;
    }
    return comparison;
}
// used in get_type_filter_client var
function dynamicSort(property) {
    var sortOrder = 1;
    if (property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
// list of kupat holime
const no_health_fund_list=()=>{
    var no_health_fund_list=[
        { Serial: 1, ParamName: "כללית" },
        { Serial: 2, ParamName: "מאוחדת" },
        { Serial: 3, ParamName: "לאומית" },
        { Serial: 4, ParamName: "מכבי" },
    ];
    return no_health_fund_list;

}
// alist of type cut
// used in get_client_for_filtering function
const get_type_filter_client = (params) => {
    var my_element = {};
    var my_array = [
        { Serial: 1, ParamName: "לקוחות לפי תאריך לידה" },
        { Serial: 2, ParamName: "פוליסות ללא תאריך לידה" },
        { Serial: 3, ParamName: "לקוחות שלא נפגשנו מתאריך " },
        { Serial: 4, ParamName: "לפי סוכן" },
        { Serial: 5, ParamName: "תפוקה חדשה" },
        { Serial: 6, ParamName: "כל הלקוחות" },
        { Serial: 7, ParamName: "לפי מעסיק" },
        { Serial: 8, ParamName: "לפי קבוצה" }
       
    ];

    my_array.sort(dynamicSort("ParamName"));

    return my_array;
}

const get_empty_client = (params) => {
    var my_client = {
        Serial: 0,
        id: null,
        LastName: null,
        FirstName: null,
        Agent: 0,
        Birthday: null,
        Sex: null,
        smok: null,
        Operation: null,
        Street: null,
        StreetWork: null,
        City: null,
        CityWork: null,
        Micud: null,
        MicudWork: null,
        Post_box: null,
        Email: null,
        Potenion: null,
        Family_status: null,
        Place_work: null,
        falg: null,
        Comment: null,
        Status: null,
        ClientPicture: null,
        ExsistId: null,
        ExsistMinu: null,
        MeetingPlace: null,
        StopSmok: null,
        ClientRating: null,
        NoHealthFund: null
    }
    return my_client;
}



module.exports = {

   

    async open_connection() {
        let pool = await sql.connect(config.mssql.test_db);
        return pool;
    },
    close_connection(pool) {
        sql.close();
    },

    async get_client_by_term(params) {
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let name_to_find= typeof params.term === 'string'? params.term :'';
            let result = await dbConn.getPool().request()
                .input('term', sql.NVarChar, name_to_find)
               
                .query(sql_for_auto_complete);

            return result.recordsets;

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_client_by_term2(params) {
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let name_to_find= typeof params.term === 'string'? params.term :'';
            
           //let result =await mysql.createPool(config.mysql.my_sql_detailes).promise() 
           let result =await db_conn_mysql.getPool().promise()              
                .query('select * from `clients` where `last_name` LIKE ? ',
                [`${name_to_find}%`]);

            return result[0];

        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
    },

    async get_client_conversatios_communicatios_by_serial(params) {
           
        var sql_string =sql_client 
                         +" " + sql_communicatuion;
                        // sql_conversation+
                        // sql_followup_conversation+
                        // sql_families;

        try {
            
            //  pool = await sql.connect(config.mssql.test_db);
            // let result = await pool.request()
            
            // let result = await dbConn.getPool().request()
            //     .input('serial', sql.Int, params.serial)
            //     .query(sql_string);
            let result=await db_conn_mysql.getPool().promise()
            .query(sql_string,
            [params.serial,params.serial]);

            var my_data = {
                my_client: result[0][0],
                communication_list:result[0][1]
                // conversation_list: result.recordsets[2],
                // FollowUpConversation_list: result.recordsets[3]

            };
            let  families_serial;
            try{
                families_serial=result.recordsets[4];
                if(   families_serial.length != 0 ){
             
                    my_data.families_serial=families_serial[0].FamiliesSerial;
                  }
                 // if(families_serial!="undefined"){
                  if(families_serial.length>0){
                      let resul2 = await dbConn.getPool().request()
                      .input('families_serial', sql.Int, families_serial[0].FamiliesSerial)
                      .query(sql_family_members);
      
                      my_data.family_members=resul2.recordsets;
                  }else{
                      my_data.family_members={};
                  }
            } catch (err) { }
            
            try{
            
            } catch (err) { }

            return my_data;
         
        } catch (err) {
        
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }

    },

    async get_client_conversatios_communicatios_by_serial2(params) {
           
        var sql_string =sql_client+
                        sql_communicatuion+
                        sql_conversation+
                        sql_followup_conversation+
                        sql_families;

        try {
            
            //  pool = await sql.connect(config.mssql.test_db);
            // let result = await pool.request()
            
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .query(sql_string);

            var my_data = {
                my_client: result.recordsets[0],
                communication_list: result.recordsets[1],
                conversation_list: result.recordsets[2],
                FollowUpConversation_list: result.recordsets[3]

            };
            let  families_serial=result.recordsets[4];
            if(   families_serial.length != 0 ){
             
              my_data.families_serial=families_serial[0].FamiliesSerial;
            }
           // if(families_serial!="undefined"){
            if(families_serial.length>0){
                let resul2 = await dbConn.getPool().request()
                .input('families_serial', sql.Int, families_serial[0].FamiliesSerial)
                .query(sql_family_members);

                my_data.family_members=resul2.recordsets;
            }else{
                my_data.family_members={};
            }
          
            return my_data;
         
        } catch (err) {
        
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }

    },


    async get_client_by_serial(params) {
        
        var sql_str = "";
        var sql_str1 = "SELECT  * FROM [Clients]  WHERE [Serial]= @serial;";
           
       

        if (params.serial != 0) {
            sql_str = sql_str1 + " " + sql_client_helper_tables;
        } else {
            sql_str = sql_client_helper_tables;
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
                main_t.push(get_empty_client(params));
                my_data.main = main_t;
                my_data.client_type_list = result.recordsets[0];
                my_data.agents_list = result.recordsets[1];
                my_data.operation_list = result.recordsets[2];
                my_data.no_health_fund_list=no_health_fund_list();
            } else {
                my_data.main = result.recordsets[0];
                my_data.client_type_list = result.recordsets[1];
                my_data.agents_list = result.recordsets[2];
                my_data.operation_list = result.recordsets[3];
                 my_data.no_health_fund_list=no_health_fund_list();
               
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

      async save_client(params) {
          let that = this;
          var sql_str = "UPDATE   dbo.Clients SET " +
              "id=@id," + 
            " LastName=@lastName ," + 
            " FirstName=@firstName , " +
            " Birthday=@birthday ," +
            " Street=@street ," +
            " City=@city ," +
              " Status=@status , " +
              " ExsistId=@exsist_id ," +
              " Agent=@agent ," +
              " Operation=@operation , " +
              " Comment=@comment , " +
              " Email=@email , " +
              " ClientRating=@client_rating , " +
              " NoHealthFund=@no_health_fund  " +
              
              "  WHERE [Serial]= @serial ";

      
          try {
              var my_data = {
                  message: "הרשומה נשמרה היטב"
              };

           // let pool = await sql.connect(config.mssql.test_db)

            if (params.serial == 0) {
                sql_str = "INSERT INTO [Clients] " + " " +
                    " ( [id] , [LastName] ,  [FirstName]  ,  [Birthday]  ,  [Street] ,  [City] ,[Status] , ExsistId , Comment , Email , ClientRating , NoHealthFund)" + " " +
                    "   VALUES " + " " +
                    " (@id , @lastName , @firstName  ,@birthday, @street , @city , @status, @exsist_id  , @comment , @email , @client_rating , @no_health_fund  ); ";
              //  let result1 = await pool.request()
              let result1 = await dbConn.getPool().request()
                    .input('serial', sql.Int, params.serial)
                    .input('id', sql.Int, params.id)
                    .query("Select * From Clients Where id=@id");
                if(result1.recordset[0]){
                    if (result1.recordset[0].id) {
                      
                        params.pool1=pool;
                        params.serial=result1.recordset[0].Serial;
                        my_data =await that.get_client_conversatios_communicatios_by_serial(params) ;
                        my_data.message = "לקוח עם תעודת זהות זו - קיים";
                        return my_data;
                    }
                }
            }

           // let result = await pool.request()
           let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('id', sql.Int, params.id)
                .input('lastName', sql.NVarChar, params.lastName)
                .input('firstName', sql.NVarChar, params.firstName)
                .input('birthday', sql.DateTime, params.birthday)
                .input('street', sql.NVarChar, params.street)
                .input('city', sql.NVarChar, params.city)
                .input('status', sql.Int, params.status)
                .input('exsist_id', sql.Bit, params.exsist_id)
                .input('operation', sql.Int, params.operation)
                .input('agent', sql.Int, params.agent)
                .input('comment', sql.NVarChar, params.comment)
                .input('email', sql.NVarChar, params.email)
                .input('client_rating', sql.Int, params.client_rating)
                .input('no_health_fund', sql.Int, params.no_health_fund)
                .query(sql_str );
         
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

      async get_client_from_serching(params) {
          var sql_str =  "  SELECT  LastName , FirstName ,  id , CONVERT( varchar, [Birthday] , 103)  , Sex , Street , City , Serial FROM Clients  Where  ";
          var no_police = 0;
         
          switch (params.search_condition) {
              case "1":
                  sql_str = sql_str + "LastName=@last_name";
                  break;
              case "2":
                  sql_str = sql_str + " FirstName=@first_name";
                  break;
              case "3":
                  sql_str = "SELECT   Clients.Serial  FROM        Clients LEFT OUTER JOIN "+
                  " LifePolicies ON Clients.Serial =LifePolicies.ClientSerial "+
                      "  WHERE (LifePolicies.NoPolice =@no_oplice)";
                  no_police = params.string_condition;
                  break;
              default:
          };
          try {
            //  let pool = await sql.connect(config.mssql.test_db)
            //   let result = await pool.request()
            let result = await dbConn.getPool().request()
                  .input('last_name', sql.NVarChar, params.string_condition)
                  .input('first_name', sql.NVarChar, params.string_condition)
                  .input('no_oplice', sql.NVarChar, no_police)
                  .query(sql_str);
              var my_data = {};
              my_data.main = result.recordsets[0];
              if (params.search_condition == "3") {
                  my_data.client_serisl = my_data.main[0].Serial;
              }
              return my_data;

          } catch (err) {

              throw { errmsg: err };
          }
        //   finally {
        //       sql.close();
        //   }
      },

    async get_client_for_filtering(params) {
        sql_str = "SELECT  FROM ParamOperation ";

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .query(sql_client_helper_tables);

            var my_data = {};
           
                my_data.client_type_list = result.recordsets[0];
                my_data.agents_list = result.recordsets[1];
                my_data.operation_list = result.recordsets[2];
                 my_data.type_filter_list=get_type_filter_client();

         return my_data;
            
        } catch (err) {
          
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
        
      },

    async get_client_after_filtering(params) {
        var sql_str = "";
        var sql_client1 = "SELECT  FROM ParamOperation ";
        var where_str = "";
        var equal_str = "";

        if (params.type_equal>0) {

       
            switch (params.type_equal) {
                case 1:
                    equal_str = "=";
                    break;
                case 2:
                    equal_str = ">";
                    break;
                case 3:
                    equal_str = "<";
                    break;
        
            }
        };

        switch (params.type_filter) {
            case 1:
                sql_str = sql_str+" "+ " WHERE Birthday " + equal_str +"@birthday";
                break;
            case 2:
                equal_str = ">";
                break;
            case 3:
                equal_str = "<";
                break;
            case 4:
                sql_str = sql_str + " " + " WHERE Agent " + equal_str +"@agent";
                break;
            case 5:
                equal_str = "<";
                break;
            case 6:
              
                break;
            case 7:
                sql_str = "SELECT * FROM ";
                break;
            case 8:
                sql_str = sql_str + " " + " WHERE Operation " + equal_str +"@operation";
                break;

        };
   
        
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .input('serial', sql.Int, params.serial)
                .input('id', sql.Int, params.id)
                .input('lastName', sql.NVarChar, params.lastName)
                .input('firstName', sql.NVarChar, params.firstName)
                .input('birthday', sql.DateTime, params.birthday)
                .input('street', sql.NVarChar, params.street)
                .input('city', sql.NVarChar, params.city)
                .input('status', sql.Int, params.status)
                .input('operation', sql.Int, params.operation)
                .query(sql_str);

            var my_data = {};

            my_data.main = result.recordsets[0];
           

            return my_data;

        } catch (err) {

            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
        
    }


}




