var bll_test = require("../bll/bll_test");



module.exports = {
    async sqltest(params) {
        try {
            let bll_result = await bll_test.sqltest( params)
            let result = bll_result;
            result[0].api_added = "rrrr";
            return result;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async saveFiles(params) {
        try {
            await bll_test.saveFiles(params);
            return {};
        } catch (err) {
            throw { hasError: 1, errmsg: err};
        }
    },

    async parseXML(params) {
        try {
            await bll_test.parseTestXML(params);
            return {};
        } catch (err) {
            throw { hasError: 1, errmsg: err };
        }
    }

}

