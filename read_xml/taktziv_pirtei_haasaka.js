


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_pirtei_haasaka = "INSERT INTO [InsurDB].[dbo].[PirteiHaasakaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    "  ,KOD_CHISHUV_SACHAR_POLISA_O_HESHBON "+
  "  , SACHAR_POLISA    ,  KOD_OFEN_HATZMADA  ,  TAARICH_MASKORET " +
    "  , ZAKAUT_LELO_TNAI    ,  SEIF_14     ,  TAARICH_TCHILAT_TASHLUM ) " +

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    "  ,@KOD_CHISHUV_SACHAR_POLISA_O_HESHBON " +
    "  , @SACHAR_POLISA    ,  @KOD_OFEN_HATZMADA  ,  @TAARICH_MASKORET " +
    "  , @ZAKAUT_LELO_TNAI    ,  @SEIF_14     ,  @TAARICH_TCHILAT_TASHLUM ) "
    ;

function get_my_taktziv_pirtei_haasaka(params) {

    var taktziv_pirtei_haasaka = {};

    taktziv_pirtei_haasaka.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_pirtei_haasaka.MyNoPolice = params.my_no_police;
    taktziv_pirtei_haasaka.TypeRec = params.type_rec;
    //    taktziv_pirtei_haasaka.IdClient = params.id_client;


    params.xml_node_name = "KOD-CHISHUV-SACHAR-POLISA-O-HESHBON";
    taktziv_pirtei_haasaka.KOD_CHISHUV_SACHAR_POLISA_O_HESHBON = entities.get_field_val(params);
    params.xml_node_name = "SACHAR-POLISA";
    taktziv_pirtei_haasaka.SACHAR_POLISA = entities.get_field_val(params);
    params.xml_node_name = "KOD-OFEN-HATZMADA";
    taktziv_pirtei_haasaka.KOD_OFEN_HATZMADA = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-MASKORET";
    taktziv_pirtei_haasaka.TAARICH_MASKORET = entities.get_date_field_val(params);
    params.xml_node_name = "ZAKAUT-LELO-TNAI";
    taktziv_pirtei_haasaka.ZAKAUT_LELO_TNAI = entities.get_field_val(params);

    params.xml_node_name = "SEIF-14";
    taktziv_pirtei_haasaka.SEIF_14 = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-TCHILAT-TASHLUM";
    taktziv_pirtei_haasaka.TAARICH_TCHILAT_TASHLUM = entities.get_date_field_val(params);
    

    return taktziv_pirtei_haasaka;
}


module.exports = {
    async extract_taktziv_pirtei_haasaka_from_xml(params) {
        try {
            var data = get_my_taktziv_pirtei_haasaka(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_pirtei_haasaka(params) {
        try {
            var taktziv_pirtei_haasaka = get_my_taktziv_pirtei_haasaka(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_pirtei_haasaka.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_pirtei_haasaka.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_pirtei_haasaka.TypeRec)

                .input('KOD_CHISHUV_SACHAR_POLISA_O_HESHBON', sql.Int, taktziv_pirtei_haasaka.KOD_CHISHUV_SACHAR_POLISA_O_HESHBON)
                .input('SACHAR_POLISA', sql.Float, taktziv_pirtei_haasaka.SACHAR_POLISA)
                .input('KOD_OFEN_HATZMADA', sql.Int, taktziv_pirtei_haasaka.KOD_OFEN_HATZMADA)

                .input('TAARICH_MASKORET', sql.NVarChar, taktziv_pirtei_haasaka.TAARICH_MASKORET)
                .input('ZAKAUT_LELO_TNAI', sql.Int, taktziv_pirtei_haasaka.ZAKAUT_LELO_TNAI)
                .input('SEIF_14', sql.Int, taktziv_pirtei_haasaka.SEIF_14)
                .input('TAARICH_TCHILAT_TASHLUM', sql.NVarChar, taktziv_pirtei_haasaka.TAARICH_TCHILAT_TASHLUM)



                .query(sql_insert_taktziv_pirtei_haasaka);


            return " taktziv_pirtei_haasaka was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}