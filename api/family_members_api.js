var family_members_bl = require("../bll/family_members_bl");

module.exports = {
    async get_family_members_list(params) {
        try {
            let db_result = await family_members_bl.get_family_members_list(params)
            let result = db_result[0];
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_family_members_by_serial(params) {
       
        try {
            let db_result = await family_members_bl.get_family_members_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_family_members_by_client_serial(params) {
       
        try {
            let db_result = await family_members_bl.get_family_members_by_client_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async  get_familiesMembers_by_familiesSerial(params){
        try {
            let bll_result = await family_members_bl.get_familiesMembers_by_familiesSerial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    
    async  add_families_members(params){
        try {
            let bll_result = await family_members_bl.add_families_members(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async delete_from_families_members_by_familySerial_and_clientSerial(params){
        try {
            let bll_result = await family_members_bl.delete_from_families_members_by_familySerial_and_clientSerial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    

    async save_family_members(params) {
        try {
            let db_result = await family_members_bl.save_family_members(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}