//follow_checks_api
var follow_checks_bl = require("../bll/follow_checks_bl");

module.exports = {


    async get_follow_checks_by_serial(params) {
       
        try {
            let bll_result = await follow_checks_bl.get_follow_checks_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_follow_checks_list(params) {

        try {
            let bll_result = await follow_checks_bl.get_follow_checks_list(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_follow_checks(params) {

        try {
            params.check_date = new Date(params.check_date);
            
            params.month_sallary_date = new Date(params.month_sallary_date);
            let bll_result = await follow_checks_bl.save_follow_checks(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async get_follow_checks_for_filtring(params) {
        try {
            let db_result = await follow_checks_bl.get_follow_checks(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_follow_checks_after_filtring(params) {
        params.date_filter = new Date(params.date_filter);
        try {
            let db_result = await follow_checks_bl.get_follow_checks_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }


}