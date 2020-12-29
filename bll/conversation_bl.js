var conversation_dal = require("../dal/conversation_dal");

module.exports = {

    async get_conversations_list_by_clientserial(params) {
        try {
            let db_result = await conversation_dal.get_conversations_list_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_conversation_by_serial(params) {
       
        try {
            let db_result = await conversation_dal.get_conversation_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
 
    async get_new_conversation_by_serial(params) {

        try {
            let db_result = await conversation_dal.get_new_conversation_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_conversation(params) {
        try {
            let db_result = await conversation_dal.save_conversation(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

     //  ========     follow_up  ========

    async get_conversations_with_followup_by_clientserial(params) {
        try {
            let db_result = await conversation_dal.get_conversations_with_followup_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_follow_up_conversation_by_serial(params) {
        try {
            let db_result = await conversation_dal.get_follow_up_conversation_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


    async save_followup_conversation(params) {
        try {
            let db_result = await conversation_dal.save_followup_conversation(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },


// ====== conversations_filtering =============


    async get_conversations_params_for_filtering(params) {
        try {
            let db_result = await conversation_dal.get_conversations_params_for_filtering(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_conversations_list_after_filtering(params) {
        try {
            let db_result = await conversation_dal.get_conversations_list_after_filtering(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}