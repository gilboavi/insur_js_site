var families_bl = require("../bll/families_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_families_list(params) {

        try {
            let bll_result = await families_bl.get_families_list(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async insert_new_family(params) {

        try {
            let bll_result = await families_bl.insert_new_family(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    

    async get_families_by_serial(params) {
       
        try {
            let bll_result = await families_bl.get_families_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_families_by_client_serial(params) {
       
        try {
            let bll_result = await families_bl.get_families_by_client_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_families(params) {

        try {
            let bll_result = await families_bl.save_families(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }



}

