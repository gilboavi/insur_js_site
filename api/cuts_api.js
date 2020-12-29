var cuts_bl = require("../bll/cuts_bl");

module.exports = {

    async get_cuts(params) {
        try {
            let db_result = await cuts_bl.get_cuts(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_cuts_result(params) {
        params.date_filter = new Date(params.date_filter);
        try {
            let db_result = await cuts_bl.get_cuts_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

     async get_cuts_result2(params) {
       
        try {
            let db_result = await cuts_bl.get_cuts_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}