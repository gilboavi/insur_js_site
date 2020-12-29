var _ = require('underscore')._;
var async = require("async");
var defaultDbDal = require("../dal/defaultDb_mySqlDal.js");
var bl_client = require("../bll/bl_client.js");

exports.get_client_by_term = function(req, res, params, callback) {

    defaultDbDal.get_client_by_term(params, callback);

}

var get_table_name = function(typeParam) {
    var sql_str = "";
    var result={};
    switch (typeParam) {
        case "companies":

            result.sql_str = " `ParamCompany`";
            result.order_by=" ORDER BY ParamName";
            break;
        case "clientStatus":
            result.sql_str = " `PraramStatusClient`";
             result.order_by=" ORDER BY ParamName";
            break;
        case "familyStatus":
            result.sql_str = " `PraramFamilyStatus`";
             result.order_by=" ORDER BY ParamName";
            break;
        case "typeInsur":
                                
            result.sql_str = " `ParamTypeInsurLife`";
             result.order_by=" ORDER BY ParamName";    
              break;
        case "main":
            result.sql_str = " `Clients`";
             result.order_by=" ORDER BY LastName";
            break;
        case "phone":         
            result.sql_str = "CommunicationWithParams";
            break;
        case "conver":
            result.sql_str = "ConversationWithParams";
             result.order_by=" ORDER BY Datee";
            break;
         case "converF":
            result.sql_str = "FollowupConversationWithParams";
             result.order_by=" ORDER BY DateFollowUp";
            break;    
            
        case "workers":
            result.sql_str = "MyUsers";
             result.order_by=" ORDER BY UserName";
            break;
        case "police":
            result.sql_str = "LifePoliciesWithParams";
             result.order_by=" ORDER BY Datee";
            break;

            // default:

    }

    return result;
};




// translate fake table name into real name
var get_record_by_table_name = function(params, callback) {
    var sql_str = "";
    var arrTables = [];
    switch (params.paramType) {
        case "companies":

            sql_str = " `ParamCompany`";
            params.tableName = sql_str;
            //  get_record_by_serial(params, callback);
            get_record_with_hlpe_table(params, arrTables, callback);
            break;
        case "clientStatus":
            sql_str = " `PraramStatusClient`";
            params.tableName = sql_str;
            //  get_record_by_serial(params, callback);
            //  get_record_with_hlpe_table(params, arrTables, callback);
            break;
        case "familyStatus":
            sql_str = " `PraramFamilyStatus`";
            params.tableName = sql_str;
            // get_record_by_serial(params, callback);
            //   get_record_with_hlpe_table(params, arrTables, callback);
            break;
        case "main":
            sql_str = " `Clients`";
             params.tableName = sql_str;
            break;
        case "phone":
            sql_str = "Communication";
            params.tableName = sql_str;
            arrTables = ["ParamCommunicationType"];
            //  get_record(params,callback);
            get_communication_with_params(params, callback);
            break;
        case "conver":
            sql_str = "Conversation";
            params.tableName = sql_str;
            //  get_record(params,callback);
            arrTables = ["MyUsers", "ParamCommunicationType"];
            //  get_record_with_hlpe_table(params, arrTables, callback);
            //  get_conversation_with_params(params, callback);
            break;
        case "converF":
            sql_str = "FollowupConversation";
            params.tableName = sql_str;
            //  get_record(params,callback);
            arrTables = ["MyUsers", "ParamCommunicationType"];
            //  get_record_with_hlpe_table(params, arrTables, callback);
            //  get_conversation_with_params(params, callback);
            break;    
        case "police":
            sql_str = "LifePolicies";
            params.tableName = sql_str;
             arrTables = ["ParamCompany", "ParamTypeInsurLife"];
           // arrTables = ["MyUsers", "ParamCommunicationType"];
            
            break;
        case "workers":
            sql_str = " Users";
            params.tableName = sql_str;
         break;

            // default:

    }
    get_record_with_hlpe_table(params, arrTables, callback);

    //  return sql_str;
};


var get_record_by_serial = function(params, callback) {


    defaultDbDal.get_record_by_serial_and_tableName(params, function(err, dbResult) {

        if (!err) {
            callback(err, dbResult);
        }
        else {
            callback(err, null);
        }
    });

}

var get_tableList_by_params = function(params, callback) {

    defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult) {
        var a = dbResult;
        if (!err) {
            callback(err, dbResult);
        }
        else {
            callback(err, null);
        }
    });

}


exports.stam = function(req, res,params, callback) {
     defaultDbDal.stam(params, function(err, dbResult) {
        var a = dbResult;
        if (!err) {
            callback(err, dbResult);
        }
        else {
            callback(err, null);
        }
    });
    
}
// get tableList by lientSerial and tableName


exports.get_tableList_by_params = function(req, res, params, callback) {
    
    var tableName_and_rderBy = get_table_name(params.paramType);  
   // console.log(tableName_and_rderBy);
    var tableName = tableName_and_rderBy.sql_str;
    var orderBy= tableName_and_rderBy.order_by;
    
    if (tableName != "") {
        params.tableName = tableName;
        params.orderBy = orderBy;
        get_tableList_by_params(params, callback);

    }
    else {
        callback("table not found", null);
    }
};

// get record by serial and tableName
exports.get_record_by_params = function(req, res, params, callback) {
    get_record_by_table_name(params, callback);

};




exports.save_record_by_serial_and_paramType = function(req, res, params, callback) {

   // console.log(params);
    // var tableName = get_table_name(params.paramType);
    // if (tableName != "") {
    //     params.tableName = tableName;

        defaultDbDal.save_record_by_serial_and_tableName(params, function(err, dbResult) {

            //  console.log(dbResult);    

            if (!err) {

                callback(err, dbResult);
            }
            else {

                callback(err, null);
            }

        });
    // }
    // else {
    //     callback('table not found', null);
    // }

};






var get_communication_with_params_14_4_15 = function(params, callback) {

    var totalResult = {};
    var my_err;

    if (params.serial > 0) {
        defaultDbDal.get_record_by_serial_and_tableName(params, function(err1, dbResult) {
            if (!err1) {

                totalResult.data = dbResult;
            }
            else {
                callback(err1, null);
            }
        });
    }
    else {
        totalResult.data.Serial = 0;
        totalResult.data.ClientSerial = params.clientSerial;
    }

    // hlpe tables
    params.tableName = "`ParamCommunicationType`";
    params.serial = 0;

    defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult2) {
        my_err = err;
        if (!err) {
            totalResult.communicationType = dbResult2;

        }

    });

    callback(my_err, totalResult);

};



// ===========================================================
function get_data_for_new_record(params, callback) {
    var totalResult = {};
    var data = [{
        Serial: 0,
        ClientSerial: params.clientSerial,
        paramType: params.paramType
    }];
    totalResult.data = data;

    if (params.serial > 0) {

        defaultDbDal.get_record_by_serial_and_tableName(params, function(err1, dbResult) {
            if (!err1) {

                totalResult.data = dbResult;
            }
            else {
                totalResult.data = {};
            }
            callback(totalResult);
        });

    }
    else {
        callback(totalResult);
    }


}

var get_record_with_hlpe_table = function(params, arrTables, callback) {




    //   var arrTables = ["MyUsers", "ParamCommunicationType"] ;

    get_data_for_new_record(params, function(totalResult) {


        var arrFunctions = [];

        _.each(arrTables, function(tableName) {
            var getTableData = function(wfcallback) {
                params.tableName = "`" + tableName + "`";
                params.serial = 0;
                defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult) {
                    if (!err) {
                        totalResult[tableName] = dbResult;
                        //  console.log(totalResult.usersList);
                    }
                    wfcallback(err);
                });
            };
            arrFunctions.push(getTableData);
        });

        async.waterfall(arrFunctions, function(err, result) {
            callback(err, totalResult);
        });




    });
}

var get_master_detaile_table = function(params, callback) {
    // data for new record
    get_data_for_new_record(params, function(totalResult) {
        params.tableName =params.tableName1;
        params.serial = params.serial1;

        defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult) {
            if (!err) {
                totalResult.usersList = dbResult;
                params.tableName = "`ParamCommunicationType`";
                params.serial = 0;
                defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult2) {
                    if (!err) {
                        totalResult.CommunicationType = dbResult2;
                        //  console.log(totalResult.usersList);
                        callback(err, totalResult);

                    }
                });

            }
            else {
                callback(err, totalResult);
            }


        });

        //   callback(null,totalResult);

    });
    //callback( totalResult);
}

var get_conversation_with_params = function(params, callback) {
    // data for new record
    get_data_for_new_record(params, function(totalResult) {
        params.tableName = "`MyUsers`";
        params.serial = 0;

        defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult) {
            if (!err) {
                totalResult.usersList = dbResult;
                params.tableName = "`ParamCommunicationType`";
                params.serial = 0;
                defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult2) {
                    if (!err) {
                        totalResult.CommunicationType = dbResult2;
                        //  console.log(totalResult.usersList);
                        callback(err, totalResult);

                    }
                });

            }
            else {
                callback(err, totalResult);
            }


        });

        //   callback(null,totalResult);

    });
    //callback( totalResult);
}

var get_communication_with_params = function(params, callback) {
    // data for new record
    //var totalResult = get_data_for_new_record(params, callback);

    get_data_for_new_record(params, function(totalResult) {

        params.tableName = "`ParamCommunicationType`";
        params.serial = 0;

        defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult2) {
            if (!err) {
                totalResult.communicationType = dbResult2;

            }

            callback(err, totalResult);

        });
    });





};

var get_communication_with_paramsBack = function(params, callback) {
    // data for new record
    var totalResult = get_data_for_new_record(params);


    if (params.serial > 0) {

        defaultDbDal.get_record_by_serial_and_tableName(params, function(err1, dbResult) {
            if (!err1) {

                totalResult.data = dbResult;


            }
            else {
                callback(err1, null);
            }
        });

    }


    params.tableName = "`ParamCommunicationType`";
    params.serial = 0;

    defaultDbDal.get_tableList_by_clientSerial_and_tableName(params, function(err, dbResult2) {
        if (!err) {
            totalResult.communicationType = dbResult2;
            callback(err, totalResult);
        }
        else {
            callback(err, totalResult);
        }
    });

};

var get_table_name2 = function(typeParam) {
    var Result = {};
    Result.tableName = "";
    Result.viewName = "";
    switch (typeParam) {
        case "companies":

            Result.tableName = " `paramcompany`";
            break;
        case "clientStatus":
            Result.tableName = " `PraramStatusClient`";
            break;
        case "familyStatus":
            Result.tableName = " `PraramFamilyStatus`";
            break;
        case "main":
            Result.tableName = " `client`";
            break;
        case "phone":
            Result.tableName = "Communication";
            Result.viewName = "communication_with_params";

            break;


            // default:

    }

    return Result;
};


exports.get_tableList_by_params_back = function(req, res, params, callback) {
    get_List_by_table_name(params, callback);
}

exports.get_record_by_paramsBack = function(req, res, params, callback) {

    defaultDbDal.get_record_by_serial_and_tableName(params, function(err, dbResult) {

        if (!err) {
            callback(err, dbResult);
        }
        else {
            callback(err, null);
        }
    });
};
