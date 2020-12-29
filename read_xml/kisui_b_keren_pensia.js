//kisui_b_keren_pensia




var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_kisui_b_keren_pensia = "INSERT INTO [InsurDB].[dbo].[KisuiBKerenPensiaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    "  ,ALUT_KISUI_NECHUT    , ALUT_KISUI_PNS_SHRM_NECHE    , SHEUR_KISUY_NECHUT " +
  "   , SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM    , TAARICH_MASKORET_NECHUT_VE_SHEERIM  " +
    "    ,   SACH_PENSIAT_NECHUT    " +

  "    , ALUT_KISUY_SHEERIM    , SHIUR_KISUY_YATOM    , KITZBAT_SHEERIM_LEALMAN_O_ALMANA "+
"    , KITZBAT_SHEERIM_LEYATOM    , KITZBAT_SHEERIM_LEHORE_NITMACH    , SHIUR_KISUY_ALMAN_O_ALMANA "+
"    , SHIUR_KISUY_HORE_NITMACH    , GIL_PRISHA_LEPENSIYAT_ZIKNA    , SACH_PENSIYAT_ALMAN_O_ALMANA "+
"    , MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA    , MENAT_PENSIA_TZVURA    , AHUZ_PENSIYA_TZVURA " +
"    , TAARICH_TCHILAT_HAVERUT    , TAARICH_ERECH_LANENTUNIM    , HATAVA_BITUCHIT "+
    "  , SUG_VITOR_SHAERIM  , TAARICH_VITOR_SHEERIM    , TAARICH_CIUM_VITOR_SEERIM  " +
    ", MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA)" +


    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    "  ,@ALUT_KISUI_NECHUT    , @ALUT_KISUI_PNS_SHRM_NECHE    , @SHEUR_KISUY_NECHUT " +
    "   , @SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM    , @TAARICH_MASKORET_NECHUT_VE_SHEERIM  " +
    "    ,   @SACH_PENSIAT_NECHUT    " +

    "    , @ALUT_KISUY_SHEERIM    , @SHIUR_KISUY_YATOM    , @KITZBAT_SHEERIM_LEALMAN_O_ALMANA " +
    "    , @KITZBAT_SHEERIM_LEYATOM    , @KITZBAT_SHEERIM_LEHORE_NITMACH    , @SHIUR_KISUY_ALMAN_O_ALMANA " +
    "    , @SHIUR_KISUY_HORE_NITMACH    , @GIL_PRISHA_LEPENSIYAT_ZIKNA    , @SACH_PENSIYAT_ALMAN_O_ALMANA " +
    "    , @MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA    ,@MENAT_PENSIA_TZVURA    ,@AHUZ_PENSIYA_TZVURA " +
    "    , @TAARICH_TCHILAT_HAVERUT    , @TAARICH_ERECH_LANENTUNIM    , @HATAVA_BITUCHIT " +
    "  , @SUG_VITOR_SHAERIM  , @TAARICH_VITOR_SHEERIM    , @TAARICH_CIUM_VITOR_SEERIM  " +
    ", @MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA)"

    ;

function get_my_kisui_b_keren_pensia(params) {

    var kisui_b_keren_pensia = {};

    kisui_b_keren_pensia.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    kisui_b_keren_pensia.MyNoPolice = params.my_no_police;
    kisui_b_keren_pensia.TypeRec = params.type_rec;
    
    //    kisui_b_keren_pensia .IdClient = params.id_client;
  

    params.xml_node_name = "ALUT-KISUI-NECHUT";
    kisui_b_keren_pensia.ALUT_KISUI_NECHUT = entities.get_field_val(params);
    params.xml_node_name = "ALUT-KISUI-PNS-SHRM-NECHE";
    kisui_b_keren_pensia.ALUT_KISUI_PNS_SHRM_NECHE = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-KISUY-NECHUT";
    kisui_b_keren_pensia.SHEUR_KISUY_NECHUT = entities.get_field_val(params);

  
    params.xml_node_name = "SACHAR-KOVEA-LE-NECHUT-VE-SHEERIM";
    kisui_b_keren_pensia.SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-MASKORET-NECHUT-VE-SHEERIM";
    kisui_b_keren_pensia.TAARICH_MASKORET_NECHUT_VE_SHEERIM = entities.get_date_field_val(params);
  // new
    params.xml_node_name = "SUG-VITOR-SHAERIM";
    kisui_b_keren_pensia.SUG_VITOR_SHAERIM = entities.get_field_val(params);

    params.xml_node_name = "SACH-PENSIAT-NECHUT";
    kisui_b_keren_pensia.SACH_PENSIAT_NECHUT = entities.get_field_val(params);

    

    params.xml_node_name = "ALUT-KISUY-SHEERIM";
    kisui_b_keren_pensia.ALUT_KISUY_SHEERIM = entities.get_field_val(params);
    params.xml_node_name = "SHIUR-KISUY-YATOM";
    kisui_b_keren_pensia.SHIUR_KISUY_YATOM = entities.get_field_val(params);
    params.xml_node_name = "KITZBAT-SHEERIM-LEALMAN-O-ALMANA";
    kisui_b_keren_pensia.KITZBAT_SHEERIM_LEALMAN_O_ALMANA = entities.get_field_val(params);

    

    params.xml_node_name = "KITZBAT-SHEERIM-LEYATOM";
    kisui_b_keren_pensia.KITZBAT_SHEERIM_LEYATOM = entities.get_field_val(params);
    params.xml_node_name = "KITZBAT-SHEERIM-LEHORE-NITMACH";
    kisui_b_keren_pensia.KITZBAT_SHEERIM_LEHORE_NITMACH = entities.get_field_val(params);
  
    
    params.xml_node_name = "SHIUR-KISUY-ALMAN-O-ALMANA";
    kisui_b_keren_pensia.SHIUR_KISUY_ALMAN_O_ALMANA = entities.get_field_val(params);

   

    params.xml_node_name = "SHIUR-KISUY-HORE-NITMACH";
    kisui_b_keren_pensia.SHIUR_KISUY_HORE_NITMACH = entities.get_field_val(params);
    params.xml_node_name = "GIL-PRISHA-LEPENSIYAT-ZIKNA";
    kisui_b_keren_pensia.GIL_PRISHA_LEPENSIYAT_ZIKNA = entities.get_field_val(params);
    params.xml_node_name = "SACH-PENSIYAT-ALMAN-O-ALMANA";
    kisui_b_keren_pensia.SACH_PENSIYAT_ALMAN_O_ALMANA = entities.get_field_val(params);

   

    params.xml_node_name = "MISPAR-HODSHEI-HAVERUT-BEKEREN-HAPENSIYA";
    kisui_b_keren_pensia.MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA = entities.get_field_val(params);
   // new
   params.xml_node_name = "MISPAR-HODSHEI-HAVERUT-MITZ-BEKEREN-HAPENSIYA";
   kisui_b_keren_pensia.MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA = entities.get_field_val(params);

    params.xml_node_name = "MENAT-PENSIA-TZVURA";
    kisui_b_keren_pensia.MENAT_PENSIA_TZVURA = entities.get_field_val(params);
    params.xml_node_name = "AHUZ-PENSIYA-TZVURA";
    kisui_b_keren_pensia.AHUZ_PENSIYA_TZVURA = entities.get_field_val(params);

   

     params.xml_node_name = "TAARICH-TCHILAT-HAVERUT";
    kisui_b_keren_pensia.TAARICH_TCHILAT_HAVERUT = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-ERECH-LANENTUNIM";
    kisui_b_keren_pensia.TAARICH_ERECH_LANENTUNIM = entities.get_date_field_val(params);
    params.xml_node_name = "HATAVA-BITUCHIT";
    kisui_b_keren_pensia.HATAVA_BITUCHIT = entities.get_field_val(params);


  
    params.xml_node_name = "SUG-VITOR-SHAERIM";
    kisui_b_keren_pensia.SUG_VITOR_SHAERIM = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-VITOR-SHEERIM";
    kisui_b_keren_pensia.TAARICH_VITOR_SHEERIM = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-CIUM-VITOR-SEERIM";
    kisui_b_keren_pensia.TAARICH_CIUM_VITOR_SEERIM = entities.get_date_field_val(params);


    params.xml_node_name = "MISPAR-HODSHEI-HAVERUT-MITZ-BEKEREN-HAPENSIYA";
    kisui_b_keren_pensia.MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA = entities.get_field_val(params);

    // new
    params.xml_node_name = "NECHUT-MITPATAHAT";
    kisui_b_keren_pensia.NECHUT_MITPATAHAT = entities.get_field_val(params);
    // new
    params.xml_node_name = "VITUR-KISUY-BITUCHI";
    kisui_b_keren_pensia.VITUR_KISUY_BITUCHI = entities.get_field_val(params);

    
    params.xml_node_name = "TAARICH-CIUM-VITOR-SEERIM";
    kisui_b_keren_pensia.TAARICH_CIUM_VITOR_SEERIM = entities.get_date_field_val(params);

  



    return kisui_b_keren_pensia;
}


module.exports = {
    async extract_kisui_b_keren_pensia_from_xml(params) {
        try {
            var data = get_my_kisui_b_keren_pensia(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_kisui_b_keren_pensia(params) {
        try {
            var kisui_b_keren_pensia = get_my_kisui_b_keren_pensia(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, kisui_b_keren_pensia.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, kisui_b_keren_pensia.MyNoPolice)
                .input('TypeRec', sql.Int, kisui_b_keren_pensia.TypeRec)


                .input('ALUT_KISUI_NECHUT', sql.Float, kisui_b_keren_pensia.ALUT_KISUI_NECHUT)
                .input('ALUT_KISUI_PNS_SHRM_NECHE', sql.Float, kisui_b_keren_pensia.ALUT_KISUI_PNS_SHRM_NECHE)
                .input('SHEUR_KISUY_NECHUT', sql.Float, kisui_b_keren_pensia.SHEUR_KISUY_NECHUT)

           

                .input('SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM', sql.Float, kisui_b_keren_pensia.SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM)
                .input('TAARICH_MASKORET_NECHUT_VE_SHEERIM', sql.NVarChar, kisui_b_keren_pensia.TAARICH_MASKORET_NECHUT_VE_SHEERIM)
                .input('SACH_PENSIAT_NECHUT', sql.Float, kisui_b_keren_pensia.SACH_PENSIAT_NECHUT)

              

                .input('ALUT_KISUY_SHEERIM', sql.Float, kisui_b_keren_pensia.ALUT_KISUY_SHEERIM)
                .input('SHIUR_KISUY_YATOM', sql.Float, kisui_b_keren_pensia.SHIUR_KISUY_YATOM)
                .input('KITZBAT_SHEERIM_LEALMAN_O_ALMANA', sql.Float, kisui_b_keren_pensia.KITZBAT_SHEERIM_LEALMAN_O_ALMANA)


                .input('KITZBAT_SHEERIM_LEYATOM', sql.Float, kisui_b_keren_pensia.KITZBAT_SHEERIM_LEYATOM)
                .input('KITZBAT_SHEERIM_LEHORE_NITMACH', sql.Float, kisui_b_keren_pensia.KITZBAT_SHEERIM_LEHORE_NITMACH)
                .input('SHIUR_KISUY_ALMAN_O_ALMANA', sql.Float, kisui_b_keren_pensia.SHIUR_KISUY_ALMAN_O_ALMANA)


                .input('SHIUR_KISUY_HORE_NITMACH', sql.Float, kisui_b_keren_pensia.SHIUR_KISUY_HORE_NITMACH)
                .input('GIL_PRISHA_LEPENSIYAT_ZIKNA', sql.Float, kisui_b_keren_pensia.GIL_PRISHA_LEPENSIYAT_ZIKNA)
                .input('SACH_PENSIYAT_ALMAN_O_ALMANA', sql.Float, kisui_b_keren_pensia.SACH_PENSIYAT_ALMAN_O_ALMANA)

          

                .input('MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA', sql.Int, kisui_b_keren_pensia.MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA)
                .input('MENAT_PENSIA_TZVURA', sql.Float, kisui_b_keren_pensia.MENAT_PENSIA_TZVURA)
                .input('AHUZ_PENSIYA_TZVURA', sql.Float, kisui_b_keren_pensia.AHUZ_PENSIYA_TZVURA)


                .input('TAARICH_TCHILAT_HAVERUT', sql.NVarChar, kisui_b_keren_pensia.TAARICH_TCHILAT_HAVERUT)
                .input('TAARICH_ERECH_LANENTUNIM', sql.NVarChar, kisui_b_keren_pensia.TAARICH_ERECH_LANENTUNIM)
                .input('HATAVA_BITUCHIT', sql.Int, kisui_b_keren_pensia.HATAVA_BITUCHIT)


                .input('SUG_VITOR_SHAERIM', sql.Int, kisui_b_keren_pensia.SUG_VITOR_SHAERIM)
                .input('TAARICH_VITOR_SHEERIM', sql.NVarChar, kisui_b_keren_pensia.TAARICH_VITOR_SHEERIM)
                .input('TAARICH_CIUM_VITOR_SEERIM', sql.NVarChar, kisui_b_keren_pensia.TAARICH_CIUM_VITOR_SEERIM)

                .input('MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA', sql.Int, kisui_b_keren_pensia.MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA)
             








                .query(sql_insert_kisui_b_keren_pensia);


            return " kisui_b_keren_pensia  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


