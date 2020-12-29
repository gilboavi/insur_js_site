// police_from_mimshak_bl.js

var dal_police_mislak = require("../read_xml/police_from_mimshak");
//var dal_police_mislak = require("../dal/test_dal");


module.exports = {
    async get_police_mislak_by_no_police_and_no_company(params) {
        try {
            let bll_result = await dal_police_mislak.get_police_mislak_by_no_police_and_no_company(params)
            let result = bll_result;
           
            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}