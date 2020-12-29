var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_tsua = "INSERT INTO [InsurDB].[dbo].[TsuaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 "   ,SHEUR_TSUA_NETO, SHEUR_TSUA_BRUTO_CHS_1, ACHUZ_TSUA_BRUTO_CHS_2 " +
 "   , SHEUR_TSUA_MOVTACHAT_MEYOADOT , REVACH_HEFSED_BENIKOI_HOZAHOT " +
   "  , SIMAN_REVACH_HEFSED) " +
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    "   ,@SHEUR_TSUA_NETO , @SHEUR_TSUA_BRUTO_CHS_1, @ACHUZ_TSUA_BRUTO_CHS_2 " +
    "   , @SHEUR_TSUA_MOVTACHAT_MEYOADOT , @REVACH_HEFSED_BENIKOI_HOZAHOT " +
    "  , @SIMAN_REVACH_HEFSED) " 
    ;

function get_my_tsua(params) {

    var tsua = {};

    tsua.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    tsua.MyNoPolice = params.my_no_police;
    tsua.TypeRec = params.type_rec;
    //    tsua.IdClient = params.id_client;

     

    params.xml_node_name = "SHEUR-TSUA-NETO";
    tsua.SHEUR_TSUA_NETO = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-TSUA-BRUTO-CHS-1";
    tsua.SHEUR_TSUA_BRUTO_CHS_1 = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-TSUA-BRUTO-CHS-2";
    tsua.ACHUZ_TSUA_BRUTO_CHS_2 = entities.get_field_val(params);

    params.xml_node_name = "SHEUR-TSUA-MOVTACHAT-MEYOADOT";
    tsua.SHEUR_TSUA_MOVTACHAT_MEYOADOT = entities.get_field_val(params);
    params.xml_node_name = "REVACH-HEFSED-BENIKOI-HOZAHOT";
    tsua.REVACH_HEFSED_BENIKOI_HOZAHOT = entities.get_field_val(params);
   
    params.xml_node_name = "SIMAN-REVACH-HEFSED";
    tsua.SIMAN_REVACH_HEFSED = entities.get_field_val(params);




    return tsua;
}


module.exports = {
    async extract_tsua_from_xml(params) {
        try {
            var data = get_my_tsua(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_tsua(params) {
        try {
            var tsua = get_my_tsua(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, tsua.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, tsua.MyNoPolice)
                .input('TypeRec', sql.Int, tsua.TypeRec)

                .input('SHEUR_TSUA_NETO', sql.Float, tsua.SHEUR_TSUA_NETO)
                .input('SHEUR_TSUA_BRUTO_CHS_1', sql.Float, tsua.SHEUR_TSUA_BRUTO_CHS_1)
                .input('SCHUM_HALVAA', sql.Float, tsua.SCHUM_HALVAA)

                .input('ACHUZ_TSUA_BRUTO_CHS_2', sql.Float, tsua.ACHUZ_TSUA_BRUTO_CHS_2)
                .input('SHEUR_TSUA_MOVTACHAT_MEYOADOT', sql.Float, tsua.SHEUR_TSUA_MOVTACHAT_MEYOADOT)
                .input('REVACH_HEFSED_BENIKOI_HOZAHOT', sql.Float, tsua.REVACH_HEFSED_BENIKOI_HOZAHOT)

                .input('SIMAN_REVACH_HEFSED', sql.Int, tsua.SIMAN_REVACH_HEFSED)
                

                .query(sql_insert_tsua);


            return " tsua was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}