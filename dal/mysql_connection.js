/**
 * Created by root on 10/29/13.
 */


//var logging = require('../log/logging.js');

//var scheduler_config = require("../configuration/schedulerConfig");

//var extend = require('util')._extend;

// the connection string is in configuration.js
var configuration = require("../configuration.js");
var dbconfig = configuration.config.dbConnections;


try {
    var dbPoolNames = ['db_agents']
    var mysql =  require('mysql');
    var defaultMysql = dbconfig.pension;
    defaultMysql.multipleStatements = true;
    var defaultPool = mysql.createPool(defaultMysql);
    var dbPools = {};
    dbPools.default = defaultPool; // did you difined default property ? why not use defaultPool instead ?
}
catch (e) {
    //logging.exception(e);
}

var dbParamTypes = {
    NVarChar: 'nvarchar',
    Int: 'int',
    Bit: 'bit',
    TinyInt: 'tinyint',
    DateTime: 'datetime',
    Date: 'date',
    Varchar: 'varchar',
    Arr: 'array'
};

exports.dbParamTypes = dbParamTypes;

var exceptionHandler = function (e, callback) {
    //logging.exception(e);
    callback(e, null);
};


//where Defined executeDbRequest ? is it a property ? 
exports.executeDbRequest = executeDbRequestInner;

// you did not use isProcedure, i need it !
function executeDbRequestInner(sql, params, isProcedure, resultHandler, conKey) {
    

    try {
        if(typeof (conKey) == "undefined" || conKey === null){
            conKey = "default";
        }
        
        var dbpool = dbPools[conKey];
        
        make_db_request(dbpool);



    }
    catch (e) {
        exceptionHandler(e, resultHandler);
    }

    function make_db_request(conPool) {
        var outParams = {};

        

        var _exec = function () {
            // did you difind getConnection  ? were comes connection from ?
            conPool.getConnection(function (err, connection) {
                if (err) {
                    //logging.error("make_db_request err",err);

                    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                        try {
                            if (typeof connection != "undefined")
                                connection.destroy();
                        }
                        catch (e) {
                            //logging.exception(e);
                        }
                        _exec();
                        return;

                    }
                    else {
                        resultHandler(err);
                        return;
                    }

                }

                if (typeof connection === "undefined") {
                    resultHandler("connection failed");
                    return;
                }

                try {

                    var options = {sql: sql};
                    var q_params = [];

                    params.forEach(function (param) {
                        q_params.push(param.value);
                    });
                    var d6 = new Date();
                    // where comes connection and connection.query from ?
                    connection.query(options, q_params, function (err, rows) {
                        try {
                            var strParams = "";
                            if(typeof(params) != "undefined" && params!=null){
                            
                               params.forEach(function (param) {
                                    strParams += "\nparam: name: " + param.name + " value: " + param.value;
                               });
                            }
                            else{
                                
                            }
                        

                            //if (global.debug_mode) {
                            var d7 = new Date();
                            // why do you write it ?
                            if ((d7 - d6) > 200) {

                                console.log("make_db_request " + (d7 - d6) + " ms" + " \n" + sql + "\nparams:" + strParams + "\n\n");
                            }
                            // }
                            if (err) {

                                //logging.error(err + '____' + options.sql + '____' + strParams,err);
                                
                                resultHandler(err);
                            }
                            else {
                                resultHandler(null, rows, outParams); // here data expose ? where cames resultHandler from ?
                            }
                        }
                        finally {
                            try {
                                //connection.release();
                                connection.destroy();
                            }
                            catch (e) {
                                //logging.exception(e);
                            }

                        }
                    });
                }
                catch (e) {
                    exceptionHandler(e, resultHandler);
                }


            });
        }

        _exec();


    }


};

exports.escape_string = function  (str) {
    return mysql.escape(str)
}