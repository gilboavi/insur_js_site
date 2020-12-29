



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_maslulei_hashkaa = "INSERT INTO [InsurDB].[dbo].[PerutMasluleiHashkaaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 " ,KOD_SUG_MASLUL, KOD_SUG_HAFRASHA, ACHUZ_HAFKADA_LEHASHKAA "+
 "   , SCHUM_TZVIRA_BAMASLUL, SHEM_MASLUL_HASHKAA, KOD_MASLUL_HASHKAA "+
  "  , SHEUR_DMEI_NIHUL_HAFKADA, SHEUR_DMEI_NIHUL_HISACHON, DMEI_NIHUL_ACHERIM " +
  "  , TSUA_NETO) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +

    " , @KOD_SUG_MASLUL , @KOD_SUG_HAFRASHA , @ACHUZ_HAFKADA_LEHASHKAA " +
    "   , @SCHUM_TZVIRA_BAMASLUL , @SHEM_MASLUL_HASHKAA , @KOD_MASLUL_HASHKAA " +
    "  , @SHEUR_DMEI_NIHUL_HAFKADA , @SHEUR_DMEI_NIHUL_HISACHON ,@DMEI_NIHUL_ACHERIM " +
    "  , @TSUA_NETO) "
    ;

function get_my_taktziv_perut_maslulei_hashkaa(params) {

    var taktziv_perut_maslulei_hashkaa = {};

    taktziv_perut_maslulei_hashkaa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_maslulei_hashkaa.MyNoPolice = params.my_no_police;
    taktziv_perut_maslulei_hashkaa.TypeRec = params.type_rec;
    //    taktziv_perut_maslulei_hashkaa.IdClient = params.id_client;


    params.xml_node_name = "KOD-SUG-MASLUL";
    taktziv_perut_maslulei_hashkaa.KOD_SUG_MASLUL = entities.get_field_val(params);
    params.xml_node_name = "KOD-SUG-HAFRASHA";
    taktziv_perut_maslulei_hashkaa.KOD_SUG_HAFRASHA = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-HAFKADA-LEHASHKAA";
    taktziv_perut_maslulei_hashkaa.ACHUZ_HAFKADA_LEHASHKAA = entities.get_field_val(params);

   
    params.xml_node_name = "SCHUM-TZVIRA-BAMASLUL";
    taktziv_perut_maslulei_hashkaa.SCHUM_TZVIRA_BAMASLUL = entities.get_date_field_val(params);
    params.xml_node_name = "SHEM-MASLUL-HASHKAA";
    taktziv_perut_maslulei_hashkaa.SHEM_MASLUL_HASHKAA = entities.get_field_val(params);
    params.xml_node_name = "KOD-MASLUL-HASHKAA";
    taktziv_perut_maslulei_hashkaa.KOD_MASLUL_HASHKAA = entities.get_field_val(params);

   
    params.xml_node_name = "SHEUR-DMEI-NIHUL-HAFKADA";
    taktziv_perut_maslulei_hashkaa.SHEUR_DMEI_NIHUL_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-DMEI-NIHUL-HISACHON";
    taktziv_perut_maslulei_hashkaa.SHEUR_DMEI_NIHUL_HISACHON = entities.get_field_val(params);
    params.xml_node_name = "DMEI-NIHUL-ACHERIM";
    taktziv_perut_maslulei_hashkaa.DMEI_NIHUL_ACHERIM = entities.get_field_val(params);

    params.xml_node_name = "TSUA-NETO";
    taktziv_perut_maslulei_hashkaa.TSUA_NETO = entities.get_field_val(params);



    return taktziv_perut_maslulei_hashkaa;
}


module.exports = {
    async extract_taktziv_perut_maslulei_hashkaa_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_maslulei_hashkaa(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_maslulei_hashkaa(params) {
        try {
            var taktziv_perut_maslulei_hashkaa = get_my_taktziv_perut_maslulei_hashkaa(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, taktziv_perut_maslulei_hashkaa.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_perut_maslulei_hashkaa.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_maslulei_hashkaa.TypeRec)

                .input('KOD_SUG_MASLUL', sql.Int, taktziv_perut_maslulei_hashkaa.KOD_SUG_MASLUL)
                .input('KOD_SUG_HAFRASHA', sql.Int, taktziv_perut_maslulei_hashkaa.KOD_SUG_HAFRASHA)
                .input('ACHUZ_HAFKADA_LEHASHKAA', sql.Float, taktziv_perut_maslulei_hashkaa.ACHUZ_HAFKADA_LEHASHKAA)

                .input('SCHUM_TZVIRA_BAMASLUL', sql.Float, taktziv_perut_maslulei_hashkaa.SCHUM_TZVIRA_BAMASLUL)
                .input('SHEM_MASLUL_HASHKAA', sql.NVarChar, taktziv_perut_maslulei_hashkaa.SHEM_MASLUL_HASHKAA)
                .input('KOD_MASLUL_HASHKAA', sql.NVarChar, taktziv_perut_maslulei_hashkaa.KOD_MASLUL_HASHKAA)

                .input('SHEUR_DMEI_NIHUL_HAFKADA', sql.Float, taktziv_perut_maslulei_hashkaa.SHEUR_DMEI_NIHUL_HAFKADA)
                .input('SHEUR_DMEI_NIHUL_HISACHON', sql.Float, taktziv_perut_maslulei_hashkaa.SHEUR_DMEI_NIHUL_HISACHON)
                .input('DMEI_NIHUL_ACHERIM', sql.Float, taktziv_perut_maslulei_hashkaa.DMEI_NIHUL_ACHERIM)

                .input('TSUA_NETO', sql.Float, taktziv_perut_maslulei_hashkaa.TSUA_NETO)


                .query(sql_insert_taktziv_perut_maslulei_hashkaa);


            return " taktziv_perut_maslulei_hashkaa was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
