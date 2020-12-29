//var mssqldal = require('../dal/mssql/mssqldal');

var defaultDbDal = require("../dal/defaultDb_mySqlDal.js");
var dbwrapper = require("../dal/mysql_connection");

var bl_client = require("../bll/bl_client.js");

var dbParamTypes = dbwrapper.dbParamTypes;


exports.get_client_by_serial = function(req, res, params, callback) {
  //  console.log('i reech client_by_serial api');
    // debugger
    //defaultDbDal.get_client_by_serial(params.id,callback);


    bl_client.get_client_by_serial(params.id, function(err1, dbResult) {
        if (!err1) {
            var totalResult = {};
            totalResult.client = dbResult;
            defaultDbDal.get_companies(params.id, function(err, dbCampResult) {
                if (!err) {
                    totalResult.companies = dbCampResult;
                    callback(err, totalResult);
                }
                else {
                    callback(err, totalResult);
                }
            });
        }
        else {
            callback(err, null);
        }
    });



};

exports.save_client = function(req, res, params, callback) {

    defaultDbDal.save_client(params, callback);

}

exports.get_client_by_term = function(req, res, params, callback) {

    defaultDbDal.get_client_by_term(params, callback);



}

exports.get_client_list = function(req, res, params, callback) {

    defaultDbDal.get_client_list(params, callback);
};



exports.get_communication_list = function(req, res, params, callback) {
    var my_params = [];

    my_params.push({
        name: 'ClientSerial',
        type: dbParamTypes.Int,
        value: params.id
    });
    var my_sqlStr = 'SELECT * FROM  Communication where ClientSerial= ?';

    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }
    //  var my_params = [];
    //   my_params.push({name: 'ClientSerial', type: dbParamTypes.Int, value: params.id});
    //   var my_sqlStr='CALL get_communiction_by_serial(114)';  

    // try {
    //     defaultDbDal.get_data(my_sqlStr,my_params, function(err, dbresult){
    //         callback(err, dbresult);
    //          console.log(JSON.stringify(dbresult));
    //     });    


    // }
    // catch (e) {
    //     callback(e.message);
    //      console.log('err communication');
    // }
};





exports.get_client_list_bak = function(req, res, params, callback) {

    var my_params = [];

    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.id
    });
    var my_sqlStr = 'SELECT LastName,FirstName,Serial,Id FROM client';

    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }
};



exports.get_client_by_serial_bak = function(req, res, params, callback) {
    console.log('i reech client_by_serial api');
    //   debugger
    //   defaultDbDal.get_client_by_serial(params.id,callback);

    var my_params = [];
    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.id
    });
    var my_sqlStr = 'SELECT Serial,Id, LastName,FirstName FROM client where Serial= ?';
    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }

};


exports.get_client_by_term_bak = function(req, res, params, callback) {
    var my_params = [];


    my_params.push({
        name: 'term',
        type: dbParamTypes.NVarChar,
        value: params.term
    });


    var my_sqlStr = "CALL get_clients_by_term(?)";

    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            console.log(err);
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }


}

exports.save_client_bak = function(req, res, params, callback) {
    var my_params = [];


    my_params.push({
        name: 'LastName',
        type: dbParamTypes.NVarChar,
        value: params.last_name
    });
    my_params.push({
        name: 'FirstName',
        type: dbParamTypes.NVarChar,
        value: params.first_name
    });
    my_params.push({
        name: 'Id',
        type: dbParamTypes.Int,
        value: params.id
    });
    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });

    var my_sqlStr = "";


    //  my_sqlStr="UPDATE client SET LastName=?,FirstName=?,Id=? WHERE  Serial=?";
    //   my_sqlStr="UPDATE client SET LastName=?,FirstName=? ,Id=? WHERE  Serial=120";
    if (params.serial > 0) {

        my_sqlStr = "CALL update_client (?,?,?,?)";
        //  my_sqlStr="UPDATE client SET LastName=?,FirstName=?,Id=? WHERE  Serial=?";
    }
    else {
        my_sqlStr = "INSERT INTO client ( LastName,FirstName,Id ) VALUES (?,?,?)";
    }

    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            console.log(err);
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }


}

exports.save_client_bak1 = function(req, res, params, callback) {
    var my_params = [];


    my_params.push({
        name: 'LastName',
        type: dbParamTypes.NVarChar,
        value: params.last_name
    });
    my_params.push({
        name: 'FirstName',
        type: dbParamTypes.NVarChar,
        value: params.first_name
    });
    my_params.push({
        name: 'Id',
        type: dbParamTypes.Int,
        value: params.id
    });
    my_params.push({
        name: 'Serial',
        type: dbParamTypes.Int,
        value: params.serial
    });

    var my_sqlStr = "";


    //  my_sqlStr="UPDATE client SET LastName=?,FirstName=?,Id=? WHERE  Serial=?";
    //   my_sqlStr="UPDATE client SET LastName=?,FirstName=? ,Id=? WHERE  Serial=120";
    if (params.serial > 0) {

        my_sqlStr = "CALL update_client (?,?,?,?)";
        //  my_sqlStr="UPDATE client SET LastName=?,FirstName=?,Id=? WHERE  Serial=?";
    }
    else {
        my_sqlStr = "INSERT INTO client ( LastName,FirstName,Id ) VALUES (?,?,?)";
    }

    try {
        defaultDbDal.get_data(my_sqlStr, my_params, function(err, dbresult) {
            console.log(err);
            callback(err, dbresult);
        });


    }
    catch (e) {
        callback(e.message);
    }


}
