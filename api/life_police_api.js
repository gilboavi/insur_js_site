var life_police_bl = require("../bll/life_police_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_life_polices_list_by_clientserial(params) {

        try {
            let bll_result = await life_police_bl.get_life_polices_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_life_police_by_serial(params) {
        
        try {
          
            let bll_result = await life_police_bl.get_life_police_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_life_police(params) {
      
        try {
            params.begin_Insur = new Date(params.begin_Insur);
            let bll_result = await life_police_bl.save_life_police(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_client2(params) {
        var a = params.serial;
        var b = a;

        return b;

    }

}

