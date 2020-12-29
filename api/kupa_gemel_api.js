var kupa_gemel_bl = require("../bll/kupa_gemel_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_kupa_gemel_list_by_clientserial(params) {

        try {
            let bll_result = await kupa_gemel_bl.get_kupa_gemel_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_kupa_gemel_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await kupa_gemel_bl.get_kupa_gemel_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_kupa_gemel_list_after_filtering(params) {
        try {
           
            let bll_result = await kupa_gemel_bl.get_kupa_gemel_list_after_filtering(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_kupa_gemel(params) {

        try {
            params.date_open = new Date(params.date_open);
            let bll_result = await kupa_gemel_bl.save_kupa_gemel(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }



}

