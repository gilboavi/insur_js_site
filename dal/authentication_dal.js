var config = require("../config").config;
const sql = require('mssql');
const dbConn = require("./dbConn");
var sql_str = "SELECT [Serial], [UserName], [PassWord]  " +
    " FROM  [Users]  " +
    " WHERE UserName = @UserName"
module.exports = {
    async get_user_auth_by_username(params) {
        //  console.log(params.term);

        try {
            let req = await dbConn.getPool().request();
            let result = await req
                                                                      
                .input('UserName', sql.NVarChar, params.user_name)
                                                          
                .query(sql_str);

            return result.recordsets;

            // Stored procedure 



        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
        
    }

}