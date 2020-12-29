const sql = require('mssql');
const dbConn = require("./../dal/dbConn");



module.exports = {
    async inser_to_mimshk_object(params) {
        try {
            
            let result = await dbConn.getPool().request()
                
                .input('ClientSerial', sql.Int, params.ClientSerial)
                .input('Date_doc', sql.DateTime, params.Date_doc)



                .input('Doc', sql.NVarChar, params.Doc)
                .input('Comment', sql.NVarChar, params.Comment)
               




                .execute("Inser_to_mimshk_object");

            return 1;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}