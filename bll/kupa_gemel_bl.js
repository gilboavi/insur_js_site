

var kupa_gemel_dal = require("../dal/kupa_gemel_dal");

module.exports = {
    async get_kupa_gemel_list_by_clientserial(params) {
        try {
            let db_result = await kupa_gemel_dal.get_kupa_gemel_list_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_kupa_gemel_with_followup_by_clientserial(params) {
        try {
            let db_result = await kupa_gemel_dal.get_kupa_gemel_with_followup_by_clientserial(params)
            let result = db_result;
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
            let db_result = await kupa_gemel_dal.get_kupa_gemel_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_kupa_gemel_list_after_filtering(params) {
        try {
            let db_result = await kupa_gemel_dal.get_kupa_gemel_list_after_filtering(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_kupa_gemel(params) {
        try {
            let db_result = await kupa_gemel_dal.save_kupa_gemel(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}