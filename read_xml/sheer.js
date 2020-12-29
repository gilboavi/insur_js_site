var entities = require('../read_xml/entities');
const sql = require('mssql');
const dbConn = require("../dal/dbConn");

const sql_insert_sheer = "INSERT INTO [InsurDB].[dbo].[SheerDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
    "   ,SUG_ZIKA  , KOD_ZIHUI_SHEERIM   , MISPAR_ZIHUY_SHEERIM "+
   "  , SHEM_PRATI_SHEERIM , SHEM_MISHPACHA_SHEERIM , SHEM_MISHPAHA_KODEM " +
  "  , TAARICH_LEIDA ) " +
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    "   ,@SUG_ZIKA  , @KOD_ZIHUI_SHEERIM   , @MISPAR_ZIHUY_SHEERIM " +
    "  , @SHEM_PRATI_SHEERIM , @SHEM_MISHPACHA_SHEERIM , @SHEM_MISHPAHA_KODEM " +
    "  , @TAARICH_LEIDA ) "
    ;

function get_my_sheer(params) {

    var sheer = {};

    sheer.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    sheer.MyNoPolice = params.my_no_police;
    sheer.TypeRec = params.type_rec;
    //    sheer.IdClient = params.id_client;


    params.xml_node_name = "SUG-ZIKA";
    sheer.SUG_ZIKA = entities.get_field_val(params);

    params.xml_node_name = "KOD-ZIHUI-SHEERIM";
    sheer.KOD_ZIHUI_SHEERIM = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-ZIHUY-SHEERIM";
    sheer.MISPAR_ZIHUY_SHEERIM = entities.get_field_val(params);


    params.xml_node_name = "SHEM-PRATI-SHEERIM";
    sheer.SHEM_PRATI_SHEERIM = entities.get_field_val(params);

    params.xml_node_name = "SHEM-MISHPACHA-SHEERIM";
    sheer.SHEM_MISHPACHA_SHEERIM = entities.get_field_val(params);

    params.xml_node_name = "SHEM-MISHPAHA-KODEM";
    sheer.SHEM_MISHPAHA_KODEM = entities.get_field_val(params);



    params.xml_node_name = "TAARICH-LEIDA";
    sheer.TAARICH_LEIDA = entities.get_date_field_val(params);
    
    


    return sheer;
}


module.exports = {

    async extract_sheer_from_xml(params) {
        try {
            var data = get_my_sheer(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_sheer(params) {
        try {
            var sheer = get_my_sheer(params);

            let pool = params.connection
            let result = await pool.request()
               //let result = await dbConn.getPool().request()
                .input('KOD_MEZAHE_YATZRAN', sql.Int, sheer.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, sheer.MyNoPolice)
                .input('TypeRec', sql.Int, sheer.TypeRec)
                .input('SUG_ZIKA', sql.Int, sheer.SUG_ZIKA)
                .input('KOD_ZIHUI_SHEERIM', sql.Int, sheer.KOD_ZIHUI_SHEERIM)
                .input('MISPAR_ZIHUY_SHEERIM', sql.NVarChar, sheer.MISPAR_ZIHUY_SHEERIM)

                .input('SHEM_PRATI_SHEERIM', sql.NVarChar, sheer.SHEM_PRATI_SHEERIM)
                .input('SHEM_MISHPACHA_SHEERIM', sql.NVarChar, sheer.SHEM_MISHPACHA_SHEERIM)
                .input('SHEM_MISHPAHA_KODEM', sql.NVarChar, sheer.SHEM_MISHPAHA_KODEM)

                .input('TAARICH_LEIDA', sql.NVarChar, sheer.TAARICH_LEIDA)


                .query(sql_insert_sheer);


            return " sheer was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}