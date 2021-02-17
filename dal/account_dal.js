
var config = require("../config").config;
var conversation = require("../dal/conversation_dal");
const moment=require("../website/js/moment.js");
//const sql = require('mssql');
//const mysql = require('mysql2');
//const dbConn = require("./dbConn");
const db_conn_mysql = require("./db_con_mysql");
const db_conn_mysql_multi = require("./db_con_mysql_multi");

const  sql_client_helper_tables = " SELECT `serial`, `param_name` FROM `param_client_type` ORDER BY `param_name` " + ";" +
    " SELECT serial, agent_name FROM agents  ORDER BY agent_name " + ";" +
    " SELECT `serial`, `param_name` FROM `param_operation` ORDER BY `param_name` ;" ;
 
const sql_client =" SELECT  * FROM  `clients_with_params` WHERE `serial`= ?;";

const sql_communicatuion= "SELECT `communication_type` ,"+
                                 " `communication_value` ,"+
                                 "  `comment` , `serial` "+
                                 " FROM  `communication` "+
                                 " WHERE `client_serial`= ? ;" ;
//  CONVERT( varchar, [Datee] , 103)

const sql_conversation= " SELECT DATE_FORMAT(datee, '%Y / %m /%d ')  , "+
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


const sql_followup_conversation= " SELECT  	[DateFollowUp]  , Summary , UserName , "+
        " [StatusFollowUp]  , [ConversationsSerial] , [Serial] " + " " +
        "FROM [FollowUpConversationWithParamsAndClientSerial] WHERE ClientSerial=@serial ; ";
 
const sql_for_auto_complete="SELECT *  FROM Clients " +
        "WHERE cast([id] as nvarchar) like @term + '%' " +
        "OR[LastName]  like @term + '%' " +
        "OR[FirstName] like @term + '%'  Order by LastName";

const sql_families="SELECT *  FROM `family_members` Where `client_serial` = ?; " ;

const sql_family_members=" Select last_name, first_name,member_type, client_serial From family_members_with_params Where families_serial=?"

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

function built_sql_string(sql_head,oprator,sql_end){

    var sql_update_insert = sql_head + " " +
            "`id`"+oprator+"," + 
            "`smok`"+oprator+"," + 
            " `last_name`"+oprator+" ," + 
            " `first_name`"+oprator+" , " +
            " `sex`"+oprator+" , " +
            " `birthday`"+oprator+" ," +
            " `street`"+oprator+" ," +
            " `city`"+oprator+" ," +
            " `status`"+oprator+" , " +
            " `exsist_id`"+oprator+" ," +
            " `agent`"+oprator+" ," +
            " `operation`"+oprator+" , " +
            " `comment`"+oprator+" , " +
            " `email`"+oprator+" , " +
            " `client_rating`"+oprator+" , " +
            " `no_health_fund`" +oprator+"  " +
               sql_end;
    return sql_update_insert;
}
// list of kupat holime
const no_health_fund_list=()=>{
    var no_health_fund_list=[
        { serial: 1, param_name: "כללית" },
        { serial: 2, param_name: "מאוחדת" },
        { serial: 3, param_name: "לאומית" },
        { serial: 4, param_name: "מכבי" },
    ];
    return no_health_fund_list;

}
// alist of type cut
// used in get_client_for_filtering function
const get_type_filter_client = (params) => {
    var my_element = {};
    var my_array = [
        { serial: 1, param_name: "לקוחות לפי תאריך לידה" },
        { serial: 2, param_name: "פוליסות ללא תאריך לידה" },
        { serial: 3, param_name: "לקוחות שלא נפגשנו מתאריך " },
        { serial: 4, param_name: "לפי סוכן" },
        { Serial: 5, param_name: "תפוקה חדשה" },
        { serial: 6, param_name: "כל הלקוחות" },
        { serial: 7, param_name: "לפי מעסיק" },
        { serial: 8, param_name: "לפי קבוצה" }
       
    ];

    my_array.sort(dynamicSort("ParamName"));

    return my_array;
}

const get_empty_client = (params) => {
    var my_client = {
        serial: 0,
        id: null,
        last_name: null,
        first_name: null,
        agent: 0,
        birthday: null,
        sex: null,
        smok: null,
        operation: null,
        street: null,
        street_work: null,
        city: null,
        city_work: null,
        micud: null,
        micud_work: null,
        post_box: null,
        Eeamily_status: null,
        place_work: null,
        falg: null,
        comment: null,
        status: null,
        client_picture: null,
        exsist_id: null,
        exsist_minu: null,
        meeting_place: null,
        stop_smok: null,
        client_rating: null,
        no_health_fund: null
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

    

    async get_client_by_term2(params) {
       
        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let name_to_find= typeof params.term === 'string'? params.term :'';
            
           //let result =await mysql.createPool(config.mysql.my_sql_detailes).promise() 
           let result =await db_conn_mysql.get_pool().promise()              
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
                         +" " + sql_communicatuion
                         +" " + sql_conversation 
                         +" " +sql_families;

                        // sql_followup_conversation+
                        

        try {
            
            
            let result=await db_conn_mysql_multi.get_pool().promise()
            .query(sql_string,
            [params.serial,
             params.serial,
             params.serial,
             params.serial]);

            var my_data = {
                my_client: result[0][0],
                communication_list:result[0][1],
                 conversation_list: result[0][2],
                // FollowUpConversation_list: result.recordsets[3]

            };
            let birthday=my_data.my_client[0].birthday;
            birthday=moment(birthday).format('DD/MM/YYYY');
            my_data.my_client.birthday=birthday;
            let  my_families;
            try{
                my_families=result[0][3];
                if(   my_families.length != 0 ){
             
                    my_data.families_serial=my_families[0].families_serial;
                  }
                 // if(families_serial!="undefined"){
                  if(my_families.length>0){
                      let resul2 = await db_conn_mysql.get_pool().promise()
                      .query(sql_family_members,
                      [my_data.families_serial]);
      
                      my_data.family_members=resul2[0];
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



    async get_client_by_serial(params) {
        
        var sql_str = "";
        var sql_str1 = "SELECT  * FROM clients  WHERE serial= ?;";
           
       

        if (params.serial != 0) {
            sql_str = sql_str1 + " " + sql_client_helper_tables;
        } else {
            sql_str = sql_client_helper_tables;
        }
        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
                  .query(sql_str,
                  [params.serial,
                   params.serial,
                   params.serial,
                   params.serial
                  ]);


            var my_data = {};
            if (params.serial == 0) {
                var main_t = [];
                main_t.push(get_empty_client(params));
                my_data.main = main_t;
                my_data.client_type_list = result[0][0];
                my_data.agents_list = result[0][1];
                my_data.operation_list = result[0][2];
                my_data.no_health_fund_list=no_health_fund_list();
            } else {
                my_data.main = result[0][0];
                let birthday=my_data.main[0].birthday;
                birthday=moment(birthday).format('DD/MM/YYYY');
                my_data.main[0].birthday=birthday;
                my_data.client_type_list = result[0][1];
                my_data.agents_list = result[0][2];
                my_data.operation_list = result[0][3];
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
          var sql_head="";
          var sql_oprator="";
          var sql_end="";
          var sql_update_insert ="";

          if(params.exsist_id=='true'){
            params.exsist_id=1;
          } else if(params.exsist_id=='false'){
            params.exsist_id=0;
          }
          if(params.smok=='true'){
            params.smok=1;
          } else if(params.smok=='false'){
            params.smok=0;
          }
      
        try {
              var my_data = {
                  message: "הרשומה נשמרה היטב"
              };
 
            sql_head="UPDATE   clients SET ";
            sql_oprator="=?";
            sql_end="   WHERE `serial`=? ";
          // insert
            if (params.serial == 0) {
                sql_head=" INSERT into   clients ( ";
                sql_oprator=" ";
                sql_end=") VALUES (?,?,?,?,?,"+
                                 "?,?,?,?,?,"+
                                 "?,?,?,?,?," +
                                 "?  ) "; 
                let result_1 = await db_conn_mysql.get_pool().promise()
                                 .query("select `serial`,`id` from `clients` where  id=?", 
                                 [params.id]               
                            );
                if (result_1[0][0].id !=null){
                    params.serial=result_1[0][0].serial;
                    my_data =await that.get_client_conversatios_communicatios_by_serial(params) ;
                    my_data.message = "לקוח עם תעודת זהות זו - קיים";
                    return my_data;
                }
            }    

           // udate
          
            params.last_name =params.last_name.trim();
            sql_update_insert=built_sql_string(sql_head,sql_oprator,sql_end);
            let result = await db_conn_mysql.get_pool().promise()
                    .query(sql_update_insert,
                            [
                                params.id,
                                params.smok,
                                `${params.last_name}`,
                                `${params.first_name}`,
                                params.sex,
                                params.birthday,
                                `${params.street}`,
                                `${params.city}`,
                                params.status,
                                params.exsist_id,
                                params.agent !=null ? params.agent:0,
                                params.operation,
                                `${params.comment}`,
                                `${params.email}`,
                                 params.client_rating != '' ?  params.client_rating :0,
                                params.no_health_fund!= '' ?  params.client_rating :0,
                                params.serial
                            ]
                        );
               
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
          var sql_str =  "  SELECT  last_name , first_name ,  id , CONVERT( varchar, [birthday] , 103)  , sex , street , city , serial FROM clients  Where  ";
          var no_police = 0;
          var my_parameter;
          
          switch (params.search_condition) {
              case "1":
                  sql_str = sql_str + "last_name=?";
                  break;
              case "2":
                  sql_str = sql_str + " first_name=?";
                  break;
              case "3":
                  sql_str = "SELECT   clients.serial  FROM        clients LEFT OUTER JOIN "+
                  " life_policies ON lients.serial =life_policies.Cclient_serial "+
                      "  WHERE (life_policies.no_police =?)";
                  no_police = params.string_condition;
                  break;
              default:
          };
          try {
            
            let result = await db_conn_mysql.get_pool().promise()
          
                  .query(sql_str,[params.string_condition]);
              var my_data = {};
              my_data.main = result[0];
              if (params.search_condition == "3") {
                  my_data.client_serisl = my_data.main[0].serial;
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
        sql_str = "SELECT  FROM param_operation ";

        try {
            
            let result = await db_conn_mysql_multi.get_pool().promise()
                .query(sql_client_helper_tables);

            var my_data = {};
           
                my_data.client_type_list = result[0];
                my_data.agents_list = result[1];
                my_data.operation_list = result[2];
                 my_data.type_filter_list=get_type_filter_client();

         return my_data;
            
        } catch (err) {
          
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
        
      }

    // async get_client_after_filtering(params) {
    //     var sql_str = "";
    //     var sql_client1 = "SELECT  FROM param_operation ";
    //     var where_str = "";
    //     var equal_str = "";
    //     var my_parameter;

    //     if (params.type_equal>0) {

       
    //         switch (params.type_equal) {
    //             case 1:
    //                 equal_str = "=";
    //                 break;
    //             case 2:
    //                 equal_str = ">";
    //                 break;
    //             case 3:
    //                 equal_str = "<";
    //                 break;
        
    //         }
    //     };

    //     switch (params.type_filter) {
    //         case 1:
    //             sql_str = sql_str+" "+ " WHERE birthday " + equal_str +"?";
    //             my_parameter=params.birthday;
    //             break;
    //         case 2:
    //             equal_str = ">";
    //             break;
    //         case 3:
    //             equal_str = "<";
    //             break;
    //         case 4:
    //             sql_str = sql_str + " " + " WHERE agent " + equal_str +"?";
    //             my_parameter=params.agent;
    //             break;
    //         case 5:
    //             equal_str = "<";
    //             break;
    //         case 6:
              
    //             break;
    //         case 7:
    //             sql_str = "SELECT * FROM ";
    //             break;
    //         case 8:
    //             sql_str = sql_str + " " + " WHERE operation " + equal_str +"?";
    //             my_parameter=params.operation;
    //             break;

    //     };
   
        
       
    //     try {
    //         // let pool = await sql.connect(config.mssql.test_db)
    //         // let result = await pool.request()
    //         let result = await db_con_mysql.get_pool().promise()
    //             .input('serial', sql.Int, params.serial)
    //             .input('id', sql.Int, params.id)
    //             .input('lastName', sql.NVarChar, params.lastName)
    //             .input('firstName', sql.NVarChar, params.firstName)
    //             .input('birthday', sql.DateTime, params.birthday)
    //             .input('street', sql.NVarChar, params.street)
    //             .input('city', sql.NVarChar, params.city)
    //             .input('status', sql.Int, params.status)
    //             .input('operation', sql.Int, params.operation)
    //             .query(sql_str);

    //         var my_data = {};

    //         my_data.main = result.recordsets[0];
           

    //         return my_data;

    //     } catch (err) {

    //         throw { errmsg: err };
    //     }
    //     // finally {
    //     //     sql.close();
    //     // }
        
    // }


}




