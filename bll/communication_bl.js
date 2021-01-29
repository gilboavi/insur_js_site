var communication_dal = require("../dal/communication_dal");

module.exports = {

    async get_communication_list_by_client_serial(params) {
        try {
            let db_result = await communication_dal.get_communication_list_by_client_serial(params)
            let result = db_result[0];
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
            let db_result = await communication_dal.get_communication_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_communication(params) {
        try {
            let db_result = await communication_dal.save_communication(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    // delete_communication_row_by_serial
    async  delete_communication_row_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await communication_dal. delete_communication_row_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}