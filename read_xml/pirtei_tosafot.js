// pirtei_tosafot


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_pirtei_tosafot = "INSERT INTO [InsurDB].[dbo].[PirteiTosafotDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 "  ,TOSEFET_TAARIF    , KOD_SUG_TOSEFET    , SHEUR_TOSEFET "+
"    , TAARICH_TOM_TOSEFET    , PROMIL_TOSEFET) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    "  ,@TOSEFET_TAARIF    , @KOD_SUG_TOSEFET    , @SHEUR_TOSEFET " +
    "    , @TAARICH_TOM_TOSEFET    , @PROMIL_TOSEFET) "

    ;

function get_my_pirtei_tosafot(params) {

    var pirtei_tosafot = {};

    pirtei_tosafot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    pirtei_tosafot.MyNoPolice = params.my_no_police;
    pirtei_tosafot.TypeRec = params.type_rec;

    //    pirtei_tosafot .IdClient = params.id_client;
   

    params.xml_node_name = "TOSEFET-TAARIF";
    pirtei_tosafot.TOSEFET_TAARIF = entities.get_field_val(params);
    params.xml_node_name = "KOD-SUG-TOSEFET";
    pirtei_tosafot.KOD_SUG_TOSEFET = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-TOSEFET";
    pirtei_tosafot.SHEUR_TOSEFET = entities.get_field_val(params);


    params.xml_node_name = "TAARICH-TOM-TOSEFET";
    pirtei_tosafot.TAARICH_TOM_TOSEFET = entities.get_date_field_val(params);
    params.xml_node_name = "PROMIL-TOSEFET";
    pirtei_tosafot.PROMIL_TOSEFET = entities.get_field_val(params);

    return pirtei_tosafot;
}


module.exports = {
    async extract_pirtei_tosafot_from_xml(params) {
        try {
            var data = get_my_pirtei_tosafot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_pirtei_tosafot(params) {
        try {
            var pirtei_tosafot = get_my_pirtei_tosafot(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, pirtei_tosafot.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, pirtei_tosafot.MyNoPolice)
                .input('TypeRec', sql.Int, pirtei_tosafot.TypeRec)
                .input('MoneYitra', sql.Int, pirtei_tosafot.MoneYitra)

               

                .input('TOSEFET_TAARIF', sql.Int, pirtei_tosafot.TOSEFET_TAARIF)
                .input('KOD_SUG_TOSEFET', sql.Int, pirtei_tosafot.KOD_SUG_TOSEFET)
                .input('SHEUR_TOSEFET', sql.Float, pirtei_tosafot.SHEUR_TOSEFET)

               

                .input('TAARICH_TOM_TOSEFET', sql.NVarChar, pirtei_tosafot.TAARICH_TOM_TOSEFET)
                .input('PROMIL_TOSEFET', sql.Float, pirtei_tosafot.PROMIL_TOSEFET)



                .query(sql_insert_pirtei_tosafot);


            return " pirtei_tosafot  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}



