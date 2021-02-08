var maintaining_dal = require("../dal/maintaining_dal");

//var r = account_bl.get_client_by_term(params);
function get_table_name(no_table) {
    table_name = "";
    switch (no_table) {
        case 1:
            table_name = "param_document_occupation";
            break;
        case 2:
            table_name = "param_goal_of_talk";
            break;
        case 3:
            table_name = "param_type_insur_life";
            break;
        case 4:
            table_name = "param_company";
            break;
        case 5:
            table_name = "param_employer";
            break;
        case 6:
            table_name = "param_type_followup_conversation";
            break;
        case 7:
            table_name = "param_client_type";
            break;
        case 8:
            table_name = "param_work_status";
            break;
        case 9:
            // not working
            table_name = "mail_address_book";
            break;
        case 10:
            table_name = "param_meeting_status";
            break;
        case 11:
            table_name = "param_meeting_preparation";
            break;
        case 12:
            table_name = "param_provisions_life_police";
            break;
        case 13:
            table_name = "agents";
            break;
        case 14:
            table_name = "param_tevia_type";
            break;
        case 15:
            table_name = "param_tevia_status";
            break;  
        case 16:
            table_name = "param_operation";
        case 17:
            table_name = "param_kupa_maslul";
            break;  
        case 18:
            table_name = "param_kupa_name";
        case 19:
            table_name = "param_kupa_send_by";
        case 20:
            table_name = "param_kupa_shlav_tipul";
        case 21:
            table_name = "param_kupa_type";
        case 22:
            table_name = "users";
          
        default:
    }
    return table_name;
}

module.exports = {
    async get_params_list(params) {
        params.table_name = get_table_name(Number(params.serial));
        try {
            let bll_result = await maintaining_dal.get_params_list(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_param_by_serial(params) {
        params.table_name = get_table_name(Number(params.my_serial));
        try {
            let bll_result = await maintaining_dal.get_param_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_user_by_serial(params) {
        params.table_name = get_table_name(Number(params.my_serial));
        try {
            let bll_result = await maintaining_dal.get_user_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_param(params) {
        params.table_name = get_table_name(Number(params.my_serial));
        try {
            let bll_result = await maintaining_dal.save_param(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async save_user(params) {
        params.table_name = get_table_name(Number(params.my_serial));
        try {
            let bll_result = await maintaining_dal.save_user(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }



}
