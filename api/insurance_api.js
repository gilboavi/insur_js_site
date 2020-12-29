var cuts_bl = require("../bll/cuts_bl");
var path = require('path');
const { resolve } = require("path");
var fs = require('fs');


//var appDir = path.dirname(require.main.filename);
module.exports = {

    async get_aboard() {
        try {
        
        var file_name = 'content.ejs';
       var url=  path.join(process.cwd(),"views","pages","insurance","aboard", file_name);
       // var my_data="";
        // to read 'input.txt' file 
        const my_data = fs.readFileSync(url,{encoding:'utf8', flag:'r'}); 
      // fs.readFile(url, function (error,my_data) {
        // if (error) {
        //    return error;
        //    // resp.write('Contents you are looking are Not Found');
        // } else {
        //     return my_data;
        // }
       
       
   // });
            return { "text":my_data.toString()} ;     
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_cuts_result(params) {
        params.date_filter = new Date(params.date_filter);
        try {
            let db_result = await cuts_bl.get_cuts_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

     async get_cuts_result2(params) {
       
        try {
            let db_result = await cuts_bl.get_cuts_result(params)
            let result = db_result;
            return result;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}