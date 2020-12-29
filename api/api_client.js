var bl_client = require("../bll/bl_client.js");

exports.get_client_by_serial = function (req, res, params, callback) {


    bl_client.get_client_by_serial(params.id, function (err1, dbResult) {
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

};

module.exports = {
    async sqltest(params) {
        try {
            let bll_result = await bll_test.sqltest(params)
            let result = bll_result;
            result[0].api_added = "rrrr";
            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}