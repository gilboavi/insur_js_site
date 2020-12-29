



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_hafkadot_metchilat_shana = "INSERT INTO [InsurDB].[dbo].[PerutHafkadotMetchilatShanaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  "  ,TAARICH_ERECH_HAFKADA, KOD_SUG_HAFKADA, SUG_HAFRASHA "+
 "   , SUG_MAFKID, SCHUM_HAFKADA_SHESHULAM, CHODESH_SACHAR "+
  "  , ZMAN_PERAON, SACHAR_BERAMAT_HAFKADA) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    "  ,@TAARICH_ERECH_HAFKADA, @KOD_SUG_HAFKADA, @SUG_HAFRASHA " +
    "   , @SUG_MAFKID, @SCHUM_HAFKADA_SHESHULAM, @CHODESH_SACHAR " +
    "  , @ZMAN_PERAON, @SACHAR_BERAMAT_HAFKADA) "

    ;

function get_my_taktziv_perut_hafkadot_metchilat_shana(params) {

    var taktziv_perut_hafkadot_metchilat_shana = {};

    taktziv_perut_hafkadot_metchilat_shana.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_hafkadot_metchilat_shana.MyNoPolice = params.my_no_police;
    taktziv_perut_hafkadot_metchilat_shana.TypeRec = params.type_rec;
    //    taktziv_perut_hafkadot_metchilat_shana .IdClient = params.id_client;
    

  

    params.xml_node_name = "TAARICH-ERECH-HAFKADA";
    taktziv_perut_hafkadot_metchilat_shana.TAARICH_ERECH_HAFKADA = entities.get_date_field_val(params);
    params.xml_node_name = "KOD-SUG-HAFKADA";
    taktziv_perut_hafkadot_metchilat_shana.KOD_SUG_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "SUG-HAFRASHA";
    taktziv_perut_hafkadot_metchilat_shana.SUG_HAFRASHA = entities.get_field_val(params);

  
    params.xml_node_name = "SUG-MAFKID";
    taktziv_perut_hafkadot_metchilat_shana.SUG_MAFKID = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-HAFKADA-SHESHULAM";
    taktziv_perut_hafkadot_metchilat_shana.SCHUM_HAFKADA_SHESHULAM = entities.get_field_val(params);
    params.xml_node_name = "CHODESH-SACHAR";
    taktziv_perut_hafkadot_metchilat_shana.CHODESH_SACHAR = entities.get_date_field_val(params);

    params.xml_node_name = "ZMAN-PERAON";
    taktziv_perut_hafkadot_metchilat_shana.ZMAN_PERAON = entities.get_date_field_val(params);


    params.xml_node_name = "SACHAR-BERAMAT-HAFKADA";
    taktziv_perut_hafkadot_metchilat_shana.SACHAR_BERAMAT_HAFKADA = entities.get_field_val(params);







    return taktziv_perut_hafkadot_metchilat_shana;
}


module.exports = {
    async extract_taktziv_perut_hafkadot_metchilat_shana_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_hafkadot_metchilat_shana(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_hafkadot_metchilat_shana(params) {
        try {
            var taktziv_perut_hafkadot_metchilat_shana = get_my_taktziv_perut_hafkadot_metchilat_shana(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_perut_hafkadot_metchilat_shana.KOD_MEZAHE_YATZRAN)
              
                .input('MyNoPolice', sql.NVarChar, taktziv_perut_hafkadot_metchilat_shana.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_hafkadot_metchilat_shana.TypeRec)

                .input('TAARICH_ERECH_HAFKADA', sql.NVarChar, taktziv_perut_hafkadot_metchilat_shana.TAARICH_ERECH_HAFKADA)
                .input('KOD_SUG_HAFKADA', sql.Int, taktziv_perut_hafkadot_metchilat_shana.KOD_SUG_HAFKADA)
                .input('SUG_HAFRASHA', sql.Int, taktziv_perut_hafkadot_metchilat_shana.SUG_HAFRASHA)

                .input('SUG_MAFKID', sql.Int, taktziv_perut_hafkadot_metchilat_shana.SUG_MAFKID)
                .input('SCHUM_HAFKADA_SHESHULAM', sql.Float, taktziv_perut_hafkadot_metchilat_shana.SCHUM_HAFKADA_SHESHULAM)
                .input('CHODESH_SACHAR', sql.NVarChar, taktziv_perut_hafkadot_metchilat_shana.CHODESH_SACHAR)

                .input('ZMAN_PERAON', sql.NVarChar, taktziv_perut_hafkadot_metchilat_shana.ZMAN_PERAON)
                .input('SACHAR_BERAMAT_HAFKADA', sql.Float, taktziv_perut_hafkadot_metchilat_shana.SACHAR_BERAMAT_HAFKADA)


                .query(sql_insert_taktziv_perut_hafkadot_metchilat_shana);


            return " taktziv_perut_hafkadot_metchilat_shana  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
