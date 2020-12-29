var defaultDbDal = require("../dal/defaultDb_mySqlDal.js");


exports.get_client_by_serial = function (req, res, params, callback) {
    //  console.log('i reech client_by_serial api');
    // debugger
    //defaultDbDal.get_client_by_serial(params.id,callback);


    defaultDbDal.get_client_by_serial(params.id, function (err1, dbResult) {
        if (!err1) {
            var totalResult = {};
            totalResult.client = dbResult;
            defaultDbDal.get_companies(params.id, function (err, dbCampResult) {
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

exports.get_client_by_term = function (req, res, params, callback) {

    defaultDbDal.get_client_by_term(params, callback);



}
