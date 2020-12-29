


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_chov_pigur = "INSERT INTO [InsurDB].[dbo].[ChovPigurDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " ,KAYAM_CHOV_O_PIGUR  , TAARICH_TECHILAT_PIGUR , MISPAR_CHODSHEI_PIGUR "+
"    , SUG_HOV  , TOTAL_CHOVOT_O_PIGURIM , KSAFIM_LO_MESHUYACHIM_MAASIK " +
 "  , TAARICH_TECHILAT_PIGUR_NOCHECHI) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
  "  ,  @KAYAM_CHOV_O_PIGUR , @TAARICH_TECHILAT_PIGUR , @MISPAR_CHODSHEI_PIGUR "+

  "  , @SUG_HOV , @TOTAL_CHOVOT_O_PIGURIM , @KSAFIM_LO_MESHUYACHIM_MAASIK "+
  "  , @TAARICH_TECHILAT_PIGUR_NOCHECHI) "

    ;

function get_my_taktziv_chov_pigur(params) {

    var taktziv_chov_pigur = {};

    taktziv_chov_pigur.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_chov_pigur.MyNoPolice = params.my_no_police;
    taktziv_chov_pigur.TypeRec = params.type_rec;
    //    taktziv_chov_pigur .IdClient = params.id_client;
    

    params.xml_node_name = "KAYAM-CHOV-O-PIGUR";
    taktziv_chov_pigur.KAYAM_CHOV_O_PIGUR = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-TECHILAT-PIGUR";
    taktziv_chov_pigur.TAARICH_TECHILAT_PIGUR = entities.get_date_field_val(params);
    params.xml_node_name = "MISPAR-CHODSHEI-PIGUR";
    taktziv_chov_pigur.MISPAR_CHODSHEI_PIGUR = entities.get_field_val(params);

    

    params.xml_node_name = "SUG-HOV";
    taktziv_chov_pigur.SUG_HOV = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-CHOVOT-O-PIGURIM";
    taktziv_chov_pigur.TOTAL_CHOVOT_O_PIGURIM = entities.get_field_val(params);
    params.xml_node_name = "KSAFIM-LO-MESHUYACHIM-MAASIK";
    taktziv_chov_pigur.KSAFIM_LO_MESHUYACHIM_MAASIK = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-TECHILAT-PIGUR-NOCHECHI";
    taktziv_chov_pigur.TAARICH_TECHILAT_PIGUR_NOCHECHI = entities.get_date_field_val(params);
    //taktziv_hotzaot_bafoal_lehodesh_divoach

    return taktziv_chov_pigur;
}


module.exports = {
    async extract_taktziv_chov_pigur_from_xml(params) {
        try {
            var data = get_my_taktziv_chov_pigur(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_chov_pigur(params) {
        try {
            var taktziv_chov_pigur = get_my_taktziv_chov_pigur(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_chov_pigur.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_chov_pigur.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_chov_pigur.TypeRec)

                .input('KAYAM_CHOV_O_PIGUR', sql.Int, taktziv_chov_pigur.KAYAM_CHOV_O_PIGUR)
                .input('TAARICH_TECHILAT_PIGUR', sql.NVarChar, taktziv_chov_pigur.TAARICH_TECHILAT_PIGUR)
                .input('MISPAR_CHODSHEI_PIGUR', sql.Int, taktziv_chov_pigur.MISPAR_CHODSHEI_PIGUR)

                .input('SUG_HOV', sql.Int, taktziv_chov_pigur.SUG_HOV)
                .input('TOTAL_CHOVOT_O_PIGURIM', sql.Float, taktziv_chov_pigur.TOTAL_CHOVOT_O_PIGURIM)
                .input('KSAFIM_LO_MESHUYACHIM_MAASIK', sql.Int, taktziv_chov_pigur.KSAFIM_LO_MESHUYACHIM_MAASIK)
                .input('TAARICH_TECHILAT_PIGUR_NOCHECHI', sql.NVarChar, taktziv_chov_pigur.TAARICH_TECHILAT_PIGUR_NOCHECHI)
                .query(sql_insert_taktziv_chov_pigur);


            return " taktziv_chov_pigur  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}

