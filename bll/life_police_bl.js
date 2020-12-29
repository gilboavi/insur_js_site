//var life_police_dal = require("../dal/life_police_dal");
var life_police_dal = require("../dal/life_police_dal");

module.exports = {
    async get_life_polices_list_by_clientserial(params) {
        try {
            let db_result = await life_police_dal.get_life_polices_list_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_life_police_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await life_police_dal.get_life_police_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_life_police(params) {
        try {
            let db_result = await life_police_dal.save_life_police(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}