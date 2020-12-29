var documents_bl = require("../bll/documents_bl");
var formideble=require("formidable");

//var r = account_bl.get_client_by_term(params);

module.exports = {
    async get_documents_list_by_clientserial(params) {

        try {
            let bll_result = await documents_bl.get_documents_list_by_clientserial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_document_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let bll_result = await documents_bl.get_document_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_file_by_serial(params) {
        
        try {
            let bll_result = await documents_bl.get_file_by_serial(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_document(params) {
        params.date_of_document = new Date(params.date_of_document);
        try {
            let bll_result = await documents_bl.save_document(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

    

}

