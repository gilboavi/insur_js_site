var config = require("../config").config;
const sql = require('mssql');


const cross_tab_clients = " SELECT [Serial], [id], [LastName], [FirstName], Agent, Birthday, " +
    " Sex, smok, Operation, Potenion, Family_status, Work_status, Place_work, " +
    " [Street], [City], [Micud], [דוא''ל] AS mailAdress, [טלפון בית] AS phonHoe, " +
    " [טלפון עבודה] AS PhonWork, [טלפון סלולרי] AS Selolry, [טלפון פקס] AS Fax, [אחר] AS AtherPhon " +
    " FROM " +
    " (SELECT[Clients].[Serial], [id], [LastName], [FirstName], Agent, Birthday, Sex, smok, " +
    " Operation, Potenion, Family_status, Work_status, Place_work, [Street], [City], " +
    " [Micud], [CommunicationType], [CommunicationValue] " +
    "  FROM          [InsurDB].[dbo].[Clients] LEFT OUTER JOIN [InsurDB].[dbo].[Communication] " +
    " ON [Clients].[Serial] = [Communication].[ClientSerial]) x PIVOT " +
    " (MAX(CommunicationValue) FOR CommunicationType IN ([דוא''ל], [טלפון בית], [טלפון עבודה], " +
    "   [טלפון סלולרי], [טלפון פקס], [אחר])) p ";

const sql_client = "SELECT     " +
    " LastName as [שם משפחה] , FirstName as [שם פרטי] , id as [מספר זהות] , " +
    " AgentName as [שם סוכן] ,  CONVERT( varchar, [Birthday] , 103)   as [תאריך לידה] , Sex as [מין] , " +
    "ExsistId as [צילום ת.זהות], " +
    "  OperationName as [שם קבוצה], " +
    " StatusName as [סטטוס], Work_statusName as [סוג לקוח] , " +
    "  Comment as [הערות], " +
    "dbo.ClientsWithParams.Serial " +
    " FROM         dbo.ClientsWithParams ";

const sql_client_last_meeting = " SELECT          TOP (100) PERCENT " +
    " dbo.ClientsWithParams.LastName AS [שם משפחה], " +
    " dbo.ClientsWithParams.FirstName AS [שם פרטי], " +
    " dbo.ClientsWithParams.id AS [מספר זהות], " +
    " CONVERT( varchar, MAX(dbo.Meeting.MeetingDate), 103)   AS[תאריך פגישה אחרון]  ," +
    " dbo.ClientsWithParams.Serial " +
    " FROM         dbo.Meeting RIGHT OUTER JOIN dbo.ClientsWithParams " +
    " ON dbo.Meeting.ClientSerial = dbo.ClientsWithParams.Serial " +
    " GROUP BY dbo.ClientsWithParams.Serial, dbo.ClientsWithParams.LastName, " +
    " dbo.ClientsWithParams.FirstName, dbo.ClientsWithParams.id " +
    " HAVING (MAX(dbo.Meeting.MeetingDate) <= @birthday) " +
    " ORDER BY [שם משפחה], [שם פרטי]";

const sql_client_not_meeting = "﻿SELECT     TOP (100) PERCENT " +
    " dbo.ClientsWithParams.LastName AS [שם משפחה], " +
    " dbo.ClientsWithParams.FirstName AS [שם פרטי], " +
    " dbo.ClientsWithParams.id AS [מספר זהות], " +
    "  MAX(dbo.Meeting.MeetingDate) AS [תאריך פגישה אחרון]," +
    " dbo.ClientsWithParams.Serial " +
    " FROM         dbo.Meeting RIGHT OUTER JOIN dbo.ClientsWithParams " +
    " ON dbo.Meeting.ClientSerial = dbo.ClientsWithParams.Serial " +
    " GROUP BY dbo.ClientsWithParams.Serial, dbo.ClientsWithParams.LastName, " +
    " dbo.ClientsWithParams.FirstName, dbo.ClientsWithParams.id " +
    " HAVING(dbo.Meeting.MeetingDate IS NULL) " +
    " ORDER BY [שם משפחה], [שם פרטי]";


const  sql_helper_tables =
    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamClientType] ORDER BY ParamName " + ";" +
    " SELECT[Serial], [AgentName] FROM [InsurDB].[dbo].[Agents]  ORDER BY AgentName " + ";" +
    " SELECT[Serial], [ParamName] FROM [InsurDB].[dbo].[ParamOperation] ORDER BY ParamName " + ";";

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

const get_type_filter_client = (params) => {
    var my_element = {};
    var my_array = [
        { Serial: 1, ParamName: "לקוחות לפי תאריך לידה" },
        { Serial: 2, ParamName: "לקוחות ללא תאריך לידה" },
        { Serial: 3, ParamName: "לקוחות שלא נפגשנו מתאריך " },
        { Serial: 4, ParamName: "לפי סוכן" },
        { Serial: 5, ParamName: "תפוקה חדשה" },
        { Serial: 6, ParamName: "כל הלקוחות" },
        { Serial: 7, ParamName: "לפי מעסיק" },
        { Serial: 8, ParamName: "לפי קבוצה" },
        { Serial: 9, ParamName: "לקוחות שלא נפגשנו בכלל " },

    ];


    my_array.sort(dynamicSort("ParamName"));

    return my_array;
}



module.exports = {

async get_cuts(params) {
      

        try {
            // let pool = await sql.connect(config.mssql.test_db)
            // let result = await pool.request()
            let result = await dbConn.getPool().request()
                .query(sql_helper_tables);

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

async get_cuts_result(params) {
	var sql_str = "";

	var where_str = "";
	var equal_str = "";
    var type_equal = parseInt(params.type_equal);
    if (type_equal>0) {

       
		switch (type_equal) {
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
	}

    switch (parseInt(params.type_filter)) {
		case 1:
            sql_str = sql_client+" "+ " WHERE Birthday " + equal_str +"@birthday"; // clients by birtday
			break;
		case 2:
            sql_str = sql_client + " WHERE Birthday IS NULL"; // clients by without  birtday
			break;
		case 3:
            sql_str = sql_client_last_meeting; // clients last meeting
			break;
		case 4:
            sql_str = sql_client + " " + " WHERE Agent =@agent"; // clients by agent
			break;
		case 5:
            sql_str = "<"; // new  life proposal
			break;
		case 6:
            sql_str = cross_tab_clients; // all clients
			break;
		case 7:
            sql_str = sql_client + " " + " WHERE Operation =@operation";
			break;
		case 8:
            sql_str = sql_client + " " + " WHERE Operation=@operation";
			break;

	}
   
    var no_agent = parseInt(params.agent_name); 
    var my_date = Date.now();
    if (params.date_filter instanceof Date) {
        my_date = params.date_filter;
    }
       
	try {
		// let pool = await sql.connect(config.mssql.test_db)
        // let result = await pool.request()
        let result = await dbConn.getPool().request()
			.input('serial', sql.Int, params.serial)
			.input('id', sql.Int, params.id)
			.input('lastName', sql.NVarChar, params.lastName)
            .input('firstName', sql.NVarChar, my_date)
            .input('birthday', sql.DateTime, my_date)
           .input('date_meeting', sql.DateTime, params.date_filter)
            .input('agent', sql.Int, params.agent_name)
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
	// 	sql.close();
	// }
        
}

}