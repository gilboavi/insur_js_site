//var life_police_dal = require("../dal/life_police_dal");
var proposa_life_bl = require("../bll/proposal_life_bl");
                                                        
module.exports = {
    async get_proposa_life_list_by_clientserial(params) {
        try {
           
            let db_result = await proposa_life_bl.get_proposal_life_list_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_proposal_life_with_followup_by_clientserial(params) {
        try {
            let db_result = await proposa_life_bl.get_proposal_life_with_followup_by_clientserial(params)
         //   let result = db_result[0];
            return db_result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    
    async get_new_proposal_life(params) {
        try {
            let db_result = await proposa_life_bl.get_new_proposal_life(params)
            
            return db_result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_proposal_life_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await proposa_life_bl.get_proposal_life_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_proposal_life(params) {
        try {
            let db_result = await proposa_life_bl.save_proposal_life(params)
            let result = db_result[0];
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}