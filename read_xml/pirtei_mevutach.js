// pirtei_mevutach

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_pirtei_mevutach = "INSERT INTO [InsurDB].[dbo].[PirteiMevutachDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   "  ,SUG_TEUDA     , MISPAR_ZIHUY_LAKOACH) "+
   
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    "  ,@SUG_TEUDA     , @MISPAR_ZIHUY_LAKOACH) "

    ;

function get_my_pirtei_mevutach(params) {

    var pirtei_mevutach = {};

    pirtei_mevutach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    pirtei_mevutach.MyNoPolice = params.my_no_police;
    pirtei_mevutach.TypeRec = params.type_rec;

    //    pirtei_mevutach .IdClient = params.id_client;


    params.xml_node_name = "SUG-TEUDA";
    pirtei_mevutach.SUG_TEUDA = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-ZIHUY-LAKOACH";
    pirtei_mevutach.MISPAR_ZIHUY_LAKOACH = entities.get_field_val(params);
   


    return pirtei_mevutach;
}


module.exports = {
    async extract_pirtei_mevutach_from_xml(params) {
        try {
            var data = get_my_pirtei_mevutach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_pirtei_mevutach(params) {
        try {
            var pirtei_mevutach = get_my_pirtei_mevutach(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, pirtei_mevutach.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, pirtei_mevutach.MyNoPolice)
                .input('TypeRec', sql.Int, pirtei_mevutach.TypeRec)
                .input('MoneYitra', sql.Int, pirtei_mevutach.MoneYitra)

                .input('SUG_TEUDA', sql.Int, pirtei_mevutach.SUG_TEUDA)
                .input('MISPAR_ZIHUY_LAKOACH', sql.NVarChar, pirtei_mevutach.MISPAR_ZIHUY_LAKOACH)
              





                .query(sql_insert_pirtei_mevutach);


            return " pirtei_mevutach  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


