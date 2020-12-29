// followup_conversation_api

var followup_conversation_bl = require("../bll/followup_conversation_bl");



module.exports = {
  
    async get_followup_conversations_list_by_conversation_serial(params) {

        try {
            let bll_result = await followup_conversation_bl.get_followup_conversations_list_by_conversation_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async get_follow_up_conversation_by_serial(params) {
        try {
            let bll_result = await followup_conversation_bl.get_follow_up_conversation_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

       
    async save_followup_conversation(params) {
        params.date_followup = new Date(params.date_followup);

        try {
            let bll_result = await followup_conversation_bl.save_followup_conversation(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}

