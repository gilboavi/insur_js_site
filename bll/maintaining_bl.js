var maintaining_dal = require("../dal/maintaining_dal");

//var r = account_bl.get_client_by_term(params);
function get_table_name(no_table) {
    table_name = "";
    switch (no_table) {
        case 1:
            table_name = "ParamDocumentOccupation";
            break;
        case 2:
            table_name = "ParamGoalOfTalk";
            break;
        case 3:
            table_name = "ParamTypeInsurLife";
            break;
        case 4:
            table_name = "ParamCompany";
            break;
        case 5:
            table_name = "ParamEmployer";
            break;
        case 6:
            table_name = "ParamTypeFollowupConversation";
            break;
        case 7:
            table_name = "ParamClientType";
            break;
        case 8:
            table_name = "ParamWorkStatus";
            break;
        case 9:
            // not working
            table_name = "MailAddressBook";
            break;
        case 10:
            table_name = "ParamMeetingStatus";
            break;
        case 11:
            table_name = "ParamMeetingPreparation";
            break;
        case 12:
            table_name = "ParamProvisionsLifePolice";
            break;
        case 13:
            table_name = "Agents";
            break;
        case 14:
            table_name = "ParamTeviaType";
            break;
        case 15:
            table_name = "ParamTeviaStatus";
            break;  
        case 16:
            table_name = "ParamOperation";
        case 17:
            table_name = "ParamKupaMaslul";
            break;  
        case 18:
            table_name = "ParamKupaName";
        case 19:
            table_name = "ParamKupaSendBy";
        case 20:
            table_name = "ParamKupaShlavTipul";
        case 21:
            table_name = "ParamKupaType";
        case 22:
            table_name = "Users";
          
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
