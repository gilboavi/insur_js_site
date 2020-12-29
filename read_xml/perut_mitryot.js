
var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_perut_mitryot = "INSERT INTO [InsurDB].[dbo].[PerutMitryotDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
   " ,KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM, SHEM_MEVATACHAT, TAARICH_TCHILAT_HABITUACH "+
  "  , TAARICH_TOM_TKUFAT_HABITUAH, KOD_SUG_MUTZAR_BITUACH, SCHUM_BITUACH "+
  "  , ALUT_KISUI, MESHALEM_DMEI_HABITUAH, TADIRUT_HATSHLUM "+
  "  , HAIM_NECHTAM_TOFES_HITZTARFUT) "+
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    " ,@KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM, @SHEM_MEVATACHAT, @TAARICH_TCHILAT_HABITUACH " +
    "  , @TAARICH_TOM_TKUFAT_HABITUAH, @KOD_SUG_MUTZAR_BITUACH, @SCHUM_BITUACH " +
    "  , @ALUT_KISUI, @MESHALEM_DMEI_HABITUAH, @TADIRUT_HATSHLUM " +
    "  , @HAIM_NECHTAM_TOFES_HITZTARFUT) "  
    ;

function get_my_perut_mitryot(params) {

    var perut_mitryot = {};

    perut_mitryot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    perut_mitryot.MyNoPolice = params.my_no_police;
    perut_mitryot.TypeRec = params.type_rec;
    //    perut_mitryot.IdClient = params.id_client;

  
    params.xml_node_name = "KAYAM-KISUY-BITUCHI-COLECTIVI-LEAMITIM";
    perut_mitryot.KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM = entities.get_field_val(params);
    params.xml_node_name = "SHEM-MEVATACHAT";
    perut_mitryot.SHEM_MEVATACHAT = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-TCHILAT-HABITUACH";
    perut_mitryot.TAARICH_TCHILAT_HABITUACH = entities.get_date_field_val(params);
   

    params.xml_node_name = "TAARICH-TOM-TKUFAT-HABITUAH";
    perut_mitryot.TAARICH_TOM_TKUFAT_HABITUAH = entities.get_date_field_val(params);
    params.xml_node_name = "KOD-SUG-MUTZAR-BITUACH";
    perut_mitryot.KOD_SUG_MUTZAR_BITUACH = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-BITUACH";
    perut_mitryot.SCHUM_BITUACH = entities.get_field_val(params);


    params.xml_node_name = "ALUT-KISUI";
    perut_mitryot.ALUT_KISUI = entities.get_field_val(params);
    params.xml_node_name = "MESHALEM-DMEI-HABITUAH";
    perut_mitryot.MESHALEM_DMEI_HABITUAH = entities.get_field_val(params);
    params.xml_node_name = "TADIRUT-HATSHLUM";
    perut_mitryot.TADIRUT_HATSHLUM = entities.get_field_val(params);

    params.xml_node_name = "HAIM-NECHTAM-TOFES-HITZTARFUT";
    perut_mitryot.HAIM_NECHTAM_TOFES_HITZTARFUT = entities.get_field_val(params);
    



    return perut_mitryot;
}


module.exports = {
    async extract_perut_mitryot_from_xml(params) {
        try {
            var data = get_my_perut_mitryot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_perut_mitryot(params) {
        try {
            var perut_mitryot = get_my_perut_mitryot(params);
            
            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, perut_mitryot.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, perut_mitryot.MyNoPolice)
                .input('TypeRec', sql.Int, perut_mitryot.TypeRec)

                .input('KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM', sql.Int, perut_mitryot.KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM)
                .input('SHEM_MEVATACHAT', sql.NVarChar, perut_mitryot.SHEM_MEVATACHAT)
                .input('TAARICH_TCHILAT_HABITUACH', sql.NVarChar, perut_mitryot.TAARICH_TCHILAT_HABITUACH)

                .input('TAARICH_TOM_TKUFAT_HABITUAH', sql.NVarChar, perut_mitryot.TAARICH_TOM_TKUFAT_HABITUAH)
                .input('KOD_SUG_MUTZAR_BITUACH', sql.Int, perut_mitryot.KOD_SUG_MUTZAR_BITUACH)
                .input('SCHUM_BITUACH', sql.Float, perut_mitryot.SCHUM_BITUACH)

                .input('ALUT_KISUI', sql.Float, perut_mitryot.ALUT_KISUI)
                .input('MESHALEM_DMEI_HABITUAH', sql.Int, perut_mitryot.MESHALEM_DMEI_HABITUAH)
                .input('TADIRUT_HATSHLUM', sql.Int, perut_mitryot.TADIRUT_HATSHLUM)

                .input('HAIM_NECHTAM_TOFES_HITZTARFUT', sql.Int, perut_mitryot.HAIM_NECHTAM_TOFES_HITZTARFUT)
                




                .query(sql_insert_perut_mitryot);


            return " perut_mitryot was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}