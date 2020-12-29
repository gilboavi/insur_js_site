// police_from_mimshakk_api  
var bl_police_mislak = require("../bll/police_from_mimshak_bl");


module.exports = {
   

    async get_police_mislak_by_no_police_and_no_company(params) {
      
        try {
            let bll_result = await bl_police_mislak.get_police_mislak_by_no_police_and_no_company(params)
            let result = bll_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}