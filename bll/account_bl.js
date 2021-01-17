var account_dal = require("../dal/account_dal");

module.exports = {

    async get_client_by_term(params) {
        try {
            let db_result = await account_dal.get_client_by_term(params)
            let result = db_result[0];
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_by_term2(params) {
        try {
            let db_result = await account_dal.get_client_by_term2(params)
            let result = db_result[0];
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await account_dal.get_client_by_serial(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async get_client_conversatios_communicatios_by_serial(params) {

        try {
            let bll_result = await account_dal.get_client_conversatios_communicatios_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_client(params) {
        try {
            let db_result = await account_dal.save_client(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    
    async get_client_from_serching(params) {
        try {
            let db_result = await account_dal.get_client_from_serching(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_for_filtering(params) {
        try {
            let db_result = await account_dal.get_client_for_filtering(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async get_client_after_filtering(params) {
        try {
            let db_result = await account_dal.get_client_after_filtering(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

    

}