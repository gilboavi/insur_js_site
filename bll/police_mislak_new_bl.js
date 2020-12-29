var dal_police_mislak = require("../dal/police_mislak_dal");


module.exports = {
    async get_police_mislak_by_no_police_and_no_company(params) {
        try {
            let bll_result = await dal_police_mislak.get_police_mislak_by_no_police_and_no_company(params)
            let result = bll_result;
            result[0].api_added = "rrrr";
            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}