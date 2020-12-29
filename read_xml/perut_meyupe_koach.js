// perut_meyupe_koach


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_perut_meyupe_koach = "INSERT INTO [InsurDB].[dbo].[PerutMeyupeKoachDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  " ,KAYAM_MEYUPE_KOACH    , SUG_ZIHUY    , MISPAR_ZIHUY "+
  "  , SHEM_MEYUPE_KOACH) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +

    " ,@KAYAM_MEYUPE_KOACH    , @SUG_ZIHUY    , @MISPAR_ZIHUY " +
    "  , @SHEM_MEYUPE_KOACH) "

    ;

function get_my_perut_meyupe_koach(params) {

    var perut_meyupe_koach = {};

    perut_meyupe_koach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    perut_meyupe_koach.MyNoPolice = params.my_no_police;
    perut_meyupe_koach.TypeRec = params.type_rec;
   
    //    perut_meyupe_koach .IdClient = params.id_client;


    params.xml_node_name = "KAYAM-MEYUPE-KOACH";
    perut_meyupe_koach.KAYAM_MEYUPE_KOACH = entities.get_field_val(params);
    params.xml_node_name = "SUG-ZIHUY";
    perut_meyupe_koach.SUG_ZIHUY = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-ZIHUY";
    perut_meyupe_koach.MISPAR_ZIHUY = entities.get_field_val(params);

    params.xml_node_name = "SHEM-MEYUPE-KOACH";
    perut_meyupe_koach.SHEM_MEYUPE_KOACH = entities.get_field_val(params);

    return perut_meyupe_koach;
}


module.exports = {
    async extract_perut_meyupe_koach_from_xml(params) {
        try {
            var data = get_my_perut_meyupe_koach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_perut_meyupe_koach(params) {
        try {
            var perut_meyupe_koach = get_my_perut_meyupe_koach(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, perut_meyupe_koach.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, perut_meyupe_koach.MyNoPolice)
                .input('TypeRec', sql.Int, perut_meyupe_koach.TypeRec)

                .input('KAYAM_MEYUPE_KOACH', sql.Int, perut_meyupe_koach.KAYAM_MEYUPE_KOACH)
                .input('SUG_ZIHUY', sql.Int, perut_meyupe_koach.SUG_ZIHUY)
                .input('MISPAR_ZIHUY', sql.NVarChar, perut_meyupe_koach.MISPAR_ZIHUY)
                .input('SHEM_MEYUPE_KOACH', sql.NVarChar, perut_meyupe_koach.SHEM_MEYUPE_KOACH)


                .query(sql_insert_perut_meyupe_koach);


            return " perut_meyupe_koach  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


