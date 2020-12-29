var communication_bl = require("../bll/communication_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_communication_list_by_clientserial(params) {

        try {
            let bll_result = await communication_bl.get_communication_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_communication_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await communication_bl.get_communication_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_communication(params) {

        try {
            let bll_result = await communication_bl.save_communication(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }



}

