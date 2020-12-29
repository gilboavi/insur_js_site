var dbwrapper = require("../dal/mysql_connection");
var moment = require('../website/js/moment.min.js');
var dbParamTypes = dbwrapper.dbParamTypes;
var _ = require('underscore')._;



var my_query = function(sqlStr, q_params, callback) {

    dbwrapper.executeDbRequest(sqlStr, q_params, true, function(err, rows, outParams) {
        if (err) {
            //   console.log('err');
            callback(err);
        }
        else {
            //  console.log(rows);
            callback(null, rows);
        }
    });
};





exports.get_client_by_term = function(params, callback) {

    var my_params = [];

    my_params.push({
        name: 'term',
        type: dbParamTypes.NVarChar,
        value: params.term
    });

    var sql_str = "select Serial, FirstName, LastName from Clients where LastName like ? ";

    my_query(sql_str, my_params, callback);
};

exports.MasterDetaileTable = function(params, callback) {
    var product_map = {};

    _.each(products, function(product) {
        product.arrayOfArraysData = [];
        product_map[product.ProductID] = product;
    });


    _.each(arrayOfArraysData, function(data) {
        product_map[data.product_id].arrayOfArraysData.push(data);
    });
}

exports.stam = function(params, callback) {

    var products = [];
    products[0] = {
        "ProductID": 1,
        "Name": "Adjustable Race",
        "Price": 34
    };
    products[1] = {
        "ProductID": 2,
        "Name": "Bearing Ball",
        "Price": 34
    };
    products[2] = {
        "ProductID": 3,
        "Name": "BB Ball Bearing",
        "Price": 34
    };
    products[3] = {
        "ProductID": 4,
        "Name": "Headset Ball Bearings",
        "Price": 34
    };
    products[4] = {
        "ProductID": 316,
        "Name": "Blade",
        "Price": 34
    };
    products[5] = {
        "ProductID": 317,
        "Name": "LL Crankarm",
        "Price": 34
    };
    products[6] = {
        "ProductID": 318,
        "Name": "ML Crankarm",
        "Price": 34
    };
    products[7] = {
        "ProductID": 319,
        "Name": "HL Crankarm",
        "Price": 34
    };
    products[8] = {
        "ProductID": 320,
        "Name": "Chainring Bolts",
        "Price": 34
    };
    products[8] = {
        "ProductID": 321,
        "Name": "Chainring Nut",
        "Price": 34
    };

    var arrayOfArraysData = [];
    arrayOfArraysData[0] = {
        "ID": 1,
        "Name": "avi",
        "Price": 34,
        product_id: 1
    };
    arrayOfArraysData[1] = {
        "ID": 1,
        "Name": "ruty",
        "Price": 34,
        product_id: 1
    };
    arrayOfArraysData[2] = {
        "ID": 2,
        "Name": "rami",
        "Price": 34,
        product_id: 2
    };
    arrayOfArraysData[3] = {
        "ID": 2,
        "Name": "yosi",
        "Price": 34,
        product_id: 2
    };
    arrayOfArraysData[4] = {
        "ID": 316,
        "Name": "rachel",
        "Price": 34,
        product_id: 2
    };
    arrayOfArraysData[5] = {
        "ID": 317,
        "Name": "shir",
        "Price": 34,
        product_id: 3
    };
    arrayOfArraysData[6] = {
        "ID": 318,
        "Name": "yami",
        "Price": 34,
        product_id: 3
    };
    arrayOfArraysData[7] = {
        "ID": 319,
        "Name": "zeav",
        "Price": 34,
        product_id: 3
    };
    arrayOfArraysData[8] = {
        "ID": 320,
        "Name": "ilana",
        "Price": 34,
        product_id: 4
    };
    arrayOfArraysData[8] = {
        "ID": 321,
        "Name": "shon",
        "Price": 34,
        product_id: 4
    };

    var product_map = {};

    _.each(products, function(product) {
        product.arrayOfArraysData = [];
        product_map[product.ProductID] = product;
    });


    _.each(arrayOfArraysData, function(data) {
        product_map[data.product_id].arrayOfArraysData.push(data);
    });

    callback(null, products);

}

exports.get_client_by_serial = function (params, callback) {


    //  var tableName=get_param_table_name(params.paramType);
    var tableName = params.tableName;
    var sql_str = "";
    var my_params = [];

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });


    sql_str = "select * from Clients where Serial=?";


    // console.log(sql_str);
    if (tableName != "") {
        my_query(sql_str, my_params, callback);
    }
    else {
        callback("table " + params.tableName + " " + " does not exist");
    }

};


exports.get_record_by_serial_and_tableName = function(params, callback) {


    //  var tableName=get_param_table_name(params.paramType);
    var tableName = params.tableName;
    var sql_str = "";
    var my_params = [];

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });


    sql_str = "select * from " + tableName + " where Serial=?";


    // console.log(sql_str);
    if (tableName != "") {
        my_query(sql_str, my_params, callback);
    }
    else {
        callback("table " + params.tableName + " " + " does not exist");
    }

};

exports.get_tableList_by_clientSerial_and_tableName = function(params, callback) {

    //  console.log(params);

    //  var tableName=get_param_table_name(params.paramType);
    var tableName = params.tableName;
    var whereFiledName = "ClientSerial";
    //  console.log(tableName);
    var sql_str = "";
    var my_params = [];
    // choose the field for where Paragraph
    if (params.serialType == "converF") {
        my_params.push({
            name: 'ConversationsSerial',
            type: dbParamTypes.Int,
            value: params.serialVal
        });
        whereFiledName = "ConversationsSerial";
    }
    else {
        my_params.push({
            name: 'ClientSerial',
            type: dbParamTypes.Int,
            value: params.serial
        });
    }



    if (params.serial > 0) {
        sql_str = "select * from " + tableName + " where " + whereFiledName + " = ?";
        //  sql_str = "SELECT * FROM  Communication ";
    }
    else {
        sql_str = "select * from " + tableName;
    }

    // console.log(sql_str);
    if (tableName != "") {
        if (params.orderBy) {
            sql_str += " " + params.orderBy;
        }

        my_query(sql_str, my_params, callback);
    }
    else {
        callback("table " + params.paramType + " " + " does not exist");
    }

};


exports.save_record_by_serial_and_tableName = function(params, callback) {

    // console.log(params.params);

    switch (params.paramType) {
        case "companies":

            params.tableName = " `ParamCompany`";
            save_params_by_serial_and_paramType(params, callback);
            break;
        case "clientStatus":
            params.tableName = " `PraramStatusClient`";
            save_params_by_serial_and_paramType(params, callback);
            break;
        case "familyStatus":
            params.tableName = " `PraramFamilyStatus`";
            save_params_by_serial_and_paramType(params, callback);
            break;
        case "typeInsur":

            params.tableName = " `ParamTypeInsurLife`";
            save_params_by_serial_and_paramType(params, callback);
            break;
        case "main":
            params.tableName = " `Clients`";
            saveClient(params, callback);
            break;
        case "phone":
            params.tableName = "Communication";

            saveCommunication(params, callback);
            break;

        case "conver":
            params.tableName = "Conversation";

            saveConversation(params, callback);
            break;
        case "police":
            params.tableName = "LifePolicies";

            saveLifePolicies(params, callback);
            break;

            // default:

    }


};


var save_params_by_serial_and_paramType = function(params, callback) {
    //console.log(params);

    //  var tableName=get_param_table_name(params.paramType);
    var tableName = params.tableName;
    var sql_str = "";
    var my_params = [];
    my_params.push({
        name: 'ParamName',
        type: dbParamTypes.NVarChar,
        value: params.paramName
    });
    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });

    if (params.serial > 0) {

        //  sql_str="CALL update_client (?,?,?,?)";  
        sql_str = "update " + tableName + " set ParamName= ?  where Serial=?";
    }
    else {
        sql_str = "INSERT INTO " + tableName + " ( ParamName ) VALUES (?)";
    }

    //  console.log(my_params);
    my_query(sql_str, my_params, callback);


};


var saveClient = function(params, callback) {
    var tableName = params.tableName;
    var my_params = [];
    var my_birthday = params.birthday;
    my_birthday = moment(my_birthday, "DD-MM-YYYY HH:mm").format("YYYY/MM/DD HH:mm");

    my_params.push({
        name: 'LastName',
        type: dbParamTypes.NVarChar,
        value: params.lastName
    });
    my_params.push({
        name: 'FirstName',
        type: dbParamTypes.NVarChar,
        value: params.firstName
    });
    my_params.push({
        name: 'Id',
        type: dbParamTypes.Int,
        value: params.id
    });
    my_params.push({
        name: 'Birthday',
        type: dbParamTypes.DateTime,
        value: my_birthday
    });
    
     my_params.push({
        name: 'Street',
        type: dbParamTypes.NVarChar,
        value:  params.street
    });

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });

    var sql_str = "";


    if (params.serial > 0) {

      //   my_sqlStr = "CALL update_client (?,?,?,?,?,?)";
       sql_str = "CALL update_client2 (?,?,?,?,?,?)";
      //  sql_str = "UPDATE " + tableName + " SET LastName=?,FirstName=?,Id=?,Birthday=?,Street=? WHERE  Serial=?";
    }
    else {
        sql_str = "INSERT INTO " + tableName + " ( LastName,FirstName,Id,Birthday,Street ) VALUES (?,?,?,?,?)";
    }

    my_query(sql_str, my_params, callback);


}



var saveCommunication = function(params, callback) {
    var tableName = params.tableName;
    var sql_str = "";
    var my_params = [];
    my_params.push({
        name: 'ClientSerial',
        type: dbParamTypes.Int,
        value: params.clientSerial
    });
    my_params.push({
        name: 'CommunicationType',
        type: dbParamTypes.Int,
        value: params.communicationType
    });
    my_params.push({
        name: 'CommunicationValue',
        type: dbParamTypes.NVarChar,
        value: params.communicationValue
    });
    my_params.push({
        name: 'Comment',
        type: dbParamTypes.NVarChar,
        value: params.comment
    });

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });

    if (params.serial > 0) {

          sql_str="CALL update_client (?,?,?,?,?)";  
      //  sql_str = "update " + tableName + " set ClientSerial= ?, CommunicationType= ?, CommunicationValue= ?, Comment= ?   where Serial=?";
    }
    else {
        sql_str = "INSERT INTO " + tableName + " ( ClientSerial, CommunicationType, CommunicationValue, Comment ) VALUES (?,?,?,?)";
    }


    my_query(sql_str, my_params, callback);


}

var saveConversation = function(params, callback) {
    var tableName = params.tableName;
    var sql_str = "";
    var my_datee = params.datee;
    my_datee = moment(my_datee, "DD-MM-YYYY HH:mm").format("YYYY/MM/DD HH:mm");
    // console.log(my_datee);
    var my_params = [];
    my_params.push({
        name: 'ClientSerial',
        type: dbParamTypes.Int,
        value: params.clientSerial
    });
    my_params.push({
        name: 'Get_call_name',
        type: dbParamTypes.Int,
        value: params.users
    });
    my_params.push({
        name: 'SummaryOfConversation',
        type: dbParamTypes.NVarChar,
        value: params.summaryOfConversation
    });
    my_params.push({
        name: 'Datee',
        type: dbParamTypes.DateTime,
        value: my_datee
    });

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });
    // console.log(my_params);
    if (params.serial > 0) {

        //  sql_str="CALL update_client (?,?,?,?)";  
        sql_str = "update " + tableName + " set ClientSerial= ?, Get_call_name= ?, SummaryOfConversation= ?, Datee= ?   where Serial=?";
    }
    else {
        sql_str = "INSERT INTO " + tableName + " ( ClientSerial, Get_call_name, SummaryOfConversation, Datee ) VALUES (?,?,?,?)";
    }

    //  console.log(my_params);
    my_query(sql_str, my_params, callback);


}

var saveLifePolicies = function(params, callback) {
    var tableName = params.tableName;
    var sql_str = "";

    var beginInsur = params.beginInsur

    beginInsur = moment(beginInsur, "DD-MM-YYYY HH:mm").format("YYYY/MM/DD HH:mm");
    //  console.log(params);
    var my_params = [];
    my_params.push({
        name: 'ClientSerial',
        type: dbParamTypes.Int,
        value: params.clientSerial
    });
    my_params.push({
        name: 'NoPolice',
        type: dbParamTypes.NVarChar,
        value: params.noPolice
    });
    my_params.push({
        name: 'BeginInsur',
        type: dbParamTypes.NVarChar,
        value: beginInsur
    });
    my_params.push({
        name: 'Company',
        type: dbParamTypes.Int,
        value: params.company
    });
    my_params.push({
        name: 'TypeInsur',
        type: dbParamTypes.Int,
        value: params.typeInsur
    });

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });
    //  console.log(my_params);
    if (params.serial > 0) {

        //  sql_str="CALL update_client (?,?,?,?)";  
        sql_str = "update " + tableName + " set ClientSerial= ?, NoPolice= ?, BeginInsur= ?, Company= ? ,TypeInsur=?  where Serial=?";
    }
    else {
        sql_str = "INSERT INTO " + tableName + " ( ClientSerial, NoPolice, BeginInsur, Company,TypeInsur ) VALUES (?,?,?,?,?)";
    }

    //  console.log(my_params);
    my_query(sql_str, my_params, callback);


}



//==================
