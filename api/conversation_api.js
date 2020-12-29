var conversation_bl = require("../bll/conversation_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    
    async get_conversations_list_by_clientserial(params) {

        try {
            let bll_result = await conversation_bl.get_conversations_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_conversation_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await conversation_bl.get_conversation_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_new_conversation_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await conversation_bl.get_new_conversation_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_conversation(params) {
        params.datee = new Date(params.datee);
        try {
            let bll_result = await conversation_bl.save_conversation(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    //  ========     follow_up  ========

    async get_follow_up_conversation_by_serial(params) {
        try {
            let bll_result = await conversation_bl.get_follow_up_conversation_by_serial(params)
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
            let bll_result = await conversation_bl.save_followup_conversation(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_conversations_with_followup_by_clientserial(params) {

        try {
            let bll_result = await conversation_bl.get_conversations_with_followup_by_clientserial(params)
            let result = bll_result;
            console.log(result);
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    // ====== conversations_filtering =============

    async get_conversations_params_for_filtering(params) {
        try {
            let db_result = await conversation_bl.get_conversations_params_for_filtering(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_conversations_list_after_filtering(params) {
        try {
            let db_result = await conversation_bl.get_conversations_list_after_filtering(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}

