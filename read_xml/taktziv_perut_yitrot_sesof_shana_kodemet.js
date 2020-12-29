
// taktziv_perut_yitrot_sesof_shana_kodemet


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_yitrot_sesof_shana_kodemet = "INSERT INTO [InsurDB].[dbo].[PerutYitrotLesofShanaKodemetDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " ,YITRAT_SOF_SHANA    , ERECH_PIDYON_SOF_SHANA    , ERECH_MESOLAK_SOF_SHANA "+
   " , YISKON_YITRAT_KESAFIM) " +

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
   

    " ,@YITRAT_SOF_SHANA    , @ERECH_PIDYON_SOF_SHANA    , @ERECH_MESOLAK_SOF_SHANA " +
    " , @YISKON_YITRAT_KESAFIM) "

    ;

function get_my_taktziv_perut_yitrot_sesof_shana_kodemet(params) {

    var taktziv_perut_yitrot_sesof_shana_kodemet = {};

    taktziv_perut_yitrot_sesof_shana_kodemet.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_yitrot_sesof_shana_kodemet.MyNoPolice = params.my_no_police;
    taktziv_perut_yitrot_sesof_shana_kodemet.TypeRec = params.type_rec;
    //    taktziv_perut_yitrot_sesof_shana_kodemet .IdClient = params.id_client;
 
    params.xml_node_name = "YITRAT-SOF-SHANA";
    taktziv_perut_yitrot_sesof_shana_kodemet.YITRAT_SOF_SHANA = entities.get_field_val(params);
    params.xml_node_name = "ERECH-PIDYON-SOF-SHANA";
    taktziv_perut_yitrot_sesof_shana_kodemet.ERECH_PIDYON_SOF_SHANA = entities.get_field_val(params);
    params.xml_node_name = "ERECH-MESOLAK-SOF-SHANA";
    taktziv_perut_yitrot_sesof_shana_kodemet.ERECH_MESOLAK_SOF_SHANA = entities.get_field_val(params);

    
    params.xml_node_name = "YISKON-YITRAT-KESAFIM";
    taktziv_perut_yitrot_sesof_shana_kodemet.YISKON_YITRAT_KESAFIM = entities.get_field_val(params);
   

    return taktziv_perut_yitrot_sesof_shana_kodemet;
}


module.exports = {
    async extract_taktziv_perut_yitrot_sesof_shana_kodemet_from_xml(params) {
        try {
            var taktziv_mivne_dmei_nihul = get_my_taktziv_perut_yitrot_sesof_shana_kodemet(params);
            var data = get_my_taktziv_meshicha_niud(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_yitrot_sesof_shana_kodemet(params) {
        try {
            var taktziv_perut_yitrot_sesof_shana_kodemet = get_my_taktziv_perut_yitrot_sesof_shana_kodemet(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_perut_yitrot_sesof_shana_kodemet.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_perut_yitrot_sesof_shana_kodemet.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_yitrot_sesof_shana_kodemet.TypeRec)

                .input('YITRAT_SOF_SHANA', sql.Float, taktziv_perut_yitrot_sesof_shana_kodemet.YITRAT_SOF_SHANA)
                .input('ERECH_PIDYON_SOF_SHANA', sql.Float, taktziv_perut_yitrot_sesof_shana_kodemet.ERECH_PIDYON_SOF_SHANA)
                .input('ERECH_MESOLAK_SOF_SHANA', sql.Float, taktziv_perut_yitrot_sesof_shana_kodemet.ERECH_MESOLAK_SOF_SHANA)

                .input('YISKON_YITRAT_KESAFIM', sql.Float, taktziv_perut_yitrot_sesof_shana_kodemet.YISKON_YITRAT_KESAFIM)
             
                .query(sql_insert_taktziv_perut_yitrot_sesof_shana_kodemet);


            return " taktziv_perut_yitrot_sesof_shana_kodemet  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}

