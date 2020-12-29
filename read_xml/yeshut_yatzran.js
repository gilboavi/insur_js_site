//yeshut_yatzran




var entities = require('../read_xml/entities');
const sql = require('mssql');
const dbConn = require("../dal/dbConn");

const sql_select_yeshut_yatzran = "SELECT  KOD_MEZAHE_YATZRAN  , ParamName "+
    " FROM [InsurDB].[dbo].[ParamCompany] " +
    "WHERE KOD_MEZAHE_YATZRAN=@KOD_MEZAHE_YATZRAN"

    ;
const sql_insert_yeshut_yatzran = " INSERT INTO [InsurDB].[dbo].[ParamCompany] " +
    "( KOD_MEZAHE_YATZRAN, ParamName )" +
    " VALUES " +

    "( @KOD_MEZAHE_YATZRAN , @ParamName) ";

function get_my_yeshut_yatzran(params) {

    var yeshut_yatzran = {};

   
    params.xml_node_name = "KOD-MEZAHE-YATZRAN";
    yeshut_yatzran.KOD_MEZAHE_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "SHEM-YATZRAN";
    yeshut_yatzran.SHEM_YATZRAN = entities.get_field_val(params);
    yeshut_yatzran.ParamName = yeshut_yatzran.SHEM_YATZRAN;
    return yeshut_yatzran;
}


module.exports = {
    async extract_yeshut_yatzran_from_xml(params) {
        try {
            var data = get_my_yeshut_yatzran(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_yeshut_yatzran(params) {
        try {
            var yeshut_yatzran = get_my_yeshut_yatzran(params);

            let pool = params.connection
            let result = await pool.request()
              // let result = await dbConn.getPool().request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, yeshut_yatzran.KOD_MEZAHE_YATZRAN)
                .input('ParamName', sql.NVarChar, yeshut_yatzran.SHEM_YATZRAN)
                .query(sql_select_yeshut_yatzran);
           
            if (typeof result.recordset[0]=='undefined') {
                 result = await pool.request()
                  // result = await dbConn.getPool().request()
                    .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, yeshut_yatzran.KOD_MEZAHE_YATZRAN)
                    .input('ParamName', sql.NVarChar, yeshut_yatzran.ParamName)
                    .query(sql_insert_yeshut_yatzran);
            }
            return " yeshut_yatzran  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}




