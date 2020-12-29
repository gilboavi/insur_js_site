var families_dal = require("../dal/families_dal");

module.exports = {
    async get_families_list(params) {
        try {
            let db_result = await families_dal.get_families_list(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

   
    async get_families_by_serial(params) {
       
        try {
            let db_result = await families_dal.get_families_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_families_by_client_serial(params) {
       
        try {
            let db_result = await families_dal.get_families_by_client_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async insert_new_family(params) {
       
        try {
            let db_result = await families_dal.insert_new_family(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    
    

    async save_families(params) {
        try {
            let db_result = await families_dal.save_families(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}