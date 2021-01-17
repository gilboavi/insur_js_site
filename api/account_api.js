var account_bl = require("../bll/account_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_client_by_term(params) {
       
        try {
            let bll_result = await account_bl.get_client_by_term(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_by_term2(params) {
       
        try {
            let bll_result = await account_bl.get_client_by_term2(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

     async get_client_conversatios_communicatios_by_serial(params) {

        try {
            let bll_result = await account_bl.get_client_conversatios_communicatios_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async get_client_by_serial(params) {
       
        try {
            let bll_result = await account_bl.get_client_by_serial(params)
            let result = bll_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

   
    async save_client(params) {
        params.birthday = new Date(params.birthday);
         try {
             let bll_result = await account_bl.save_client(params)
             let result = bll_result;
             return result;
         }
         catch (err) {
             // ... error checks 
             throw { hasError: 1, errmsg: err.errmsg };
         }
    },

    async get_client_from_serching(params) {

        try {
            let bll_result = await account_bl.get_client_from_serching(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_for_filtering(params) {
        params.birthday = new Date(params.birthday);
        try {
            let bll_result = await account_bl.get_client_for_filtering(params)
            let result = bll_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_client_after_filtering(params) {
        params.birthday = new Date(params.birthday);
        try {
            let bll_result = await account_bl.get_client_after_filtering(params)
            let result = bll_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

     

}


