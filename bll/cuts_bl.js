var account_dal = require("../dal/cuts_dal");

module.exports = {

    async get_cuts(params) {
        try {
            let db_result = await account_dal.get_cuts(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_cuts_result(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await account_dal.get_cuts_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}