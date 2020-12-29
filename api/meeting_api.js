var meeting_bl = require("../bll/meeting_bl");

//var r = account_bl.get_client_by_term(params);

module.exports = {

    async get_meeting_list_by_clientserial(params) {

        try {
            let bll_result = await meeting_bl.get_meeting_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_meeting_list_by_done(params) {

        try {
            let bll_result = await meeting_bl.get_meeting_list_by_done(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_meeting_by_serial(params) {

        try {

            let bll_result = await meeting_bl.get_meeting_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_meeting(params) {

        try {
            params.meeting_date = new Date(params.meeting_date);
            let bll_result = await meeting_bl.save_meeting(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

   

}

