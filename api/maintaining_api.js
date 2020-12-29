var maintaining_bl = require("../bll/maintaining_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_params_list(params) {

        try {
            let bll_result = await maintaining_bl.get_params_list(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_param_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await maintaining_bl.get_param_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async get_user_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await maintaining_bl.get_user_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_param(params) {

        try {
            let bll_result = await maintaining_bl.save_param(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async save_user(params) {

        try {
            let bll_result = await maintaining_bl.save_user(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }



}

