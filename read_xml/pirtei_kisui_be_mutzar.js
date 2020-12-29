// pirtei_kisui_be_mutzar



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_pirtei_kisui_be_mutzar = "INSERT INTO [InsurDB].[dbo].[PirteiKisuiBeMutzarDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " ,KOD_MIUTZAR_LAKISUY    , SUG_MEVUTACH    , TAARICH_TCHILAT_KISUY " +
  "  , TAARICH_TOM_KISUY    , TAARICH_HAFSAKAT_TASHLUM     , ACHUZ_ME_SCM_BTH_YESODI "+
    "  , ACHUZ_MESACHAR    , OFEN_TASHLUM_SCHUM_BITUACH    , SCHUM_BITUACH " +
  "  , MESHALEM_HAKISUY    , KOD_ISHUN    , IND_CHITUM "+
"  , TAARICH_CHITUM    , HACHRAGA    , SUG_HACHRAGA "+
   "   , TKUFAT_ACHSHARA    , TKUFAT_HAMTANA_CHODASHIM     , HANACHA " +
 "   , HATNAYA_LAHANACHA_DMEI_BITUAH    , DMEI_BITUAH_LETASHLUM_BAPOAL  , TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM "+
 "   , TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH    , SUG_KISUY_BITOCHI    , KOD_NISPACH_KISUY " +
 "   , SUG_ISUK    , KOLEL_PRENZISA    , SUG_HANACHA_KISUY "+
"    , SHIUR_HANACHA_BEKISUI    , ERECH_HANACHA_BEKISUI    , SHEM_KISUI_YATZRAN) "+


    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    " ,@KOD_MIUTZAR_LAKISUY    , @SUG_MEVUTACH    , @TAARICH_TCHILAT_KISUY " +
    "  , @TAARICH_TOM_KISUY    , @TAARICH_HAFSAKAT_TASHLUM     , @ACHUZ_ME_SCM_BTH_YESODI " +
    "  , @ACHUZ_MESACHAR    , @OFEN_TASHLUM_SCHUM_BITUACH    , @SCHUM_BITUACH " +
    "  , @MESHALEM_HAKISUY    , @KOD_ISHUN    , @IND_CHITUM " +
    "  , @TAARICH_CHITUM    , @HACHRAGA    , @SUG_HACHRAGA " +
    "   , @TKUFAT_ACHSHARA    , @TKUFAT_HAMTANA_CHODASHIM     , @HANACHA " +
"   , @HATNAYA_LAHANACHA_DMEI_BITUAH    , @DMEI_BITUAH_LETASHLUM_BAPOAL  , @TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM " +
    "   , @TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH    , @SUG_KISUY_BITOCHI    , @KOD_NISPACH_KISUY " +
    "   , @SUG_ISUK    , @KOLEL_PRENZISA    , @SUG_HANACHA_KISUY " +
    "    , @SHIUR_HANACHA_BEKISUI    , @ERECH_HANACHA_BEKISUI    , @SHEM_KISUI_YATZRAN) "

    ;

function get_my_pirtei_kisui_be_mutzar(params) {

    var pirtei_kisui_be_mutzar = {};

    pirtei_kisui_be_mutzar.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    pirtei_kisui_be_mutzar.MyNoPolice = params.my_no_police;
    pirtei_kisui_be_mutzar.TypeRec = params.type_rec;
    pirtei_kisui_be_mutzar.SHEM_KISUI_YATZRAN = params.shem_kisui_tatzran;
    //    pirtei_kisui_be_mutzar .IdClient = params.id_client;
   

    params.xml_node_name = "KOD-MIUTZAR-LAKISUY";
    pirtei_kisui_be_mutzar.KOD_MIUTZAR_LAKISUY = entities.get_field_val(params);
    params.xml_node_name = "SUG-MEVUTACH";
    pirtei_kisui_be_mutzar.SUG_MEVUTACH = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-TCHILAT-KISUY";
    pirtei_kisui_be_mutzar.TAARICH_TCHILAT_KISUY = entities.get_date_field_val(params);



     params.xml_node_name = "TAARICH-TOM-KISUY";
    pirtei_kisui_be_mutzar.TAARICH_TOM_KISUY = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-HAFSAKAT-TASHLUM";
    pirtei_kisui_be_mutzar.TAARICH_HAFSAKAT_TASHLUM = entities.get_date_field_val(params);
    params.xml_node_name = "ACHUZ-ME-SCM-BTH-YESODI";
    pirtei_kisui_be_mutzar.ACHUZ_ME_SCM_BTH_YESODI = entities.get_field_val(params);


    params.xml_node_name = "ACHUZ-MESACHAR";
    pirtei_kisui_be_mutzar.ACHUZ_MESACHAR = entities.get_field_val(params);
    params.xml_node_name = "OFEN-TASHLUM-SCHUM-BITUACH";
    pirtei_kisui_be_mutzar.OFEN_TASHLUM_SCHUM_BITUACH = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-BITUACH";
    pirtei_kisui_be_mutzar.SCHUM_BITUACH = entities.get_field_val(params);

 

     params.xml_node_name = "MESHALEM-HAKISUY";
    pirtei_kisui_be_mutzar.MESHALEM_HAKISUY = entities.get_field_val(params);
    params.xml_node_name = "KOD-ISHUN";
    pirtei_kisui_be_mutzar.KOD_ISHUN = entities.get_field_val(params);
    params.xml_node_name = "IND-CHITUM";
    pirtei_kisui_be_mutzar.IND_CHITUM = entities.get_field_val(params);



    params.xml_node_name = "TAARICH-CHITUM";
    pirtei_kisui_be_mutzar.TAARICH_CHITUM = entities.get_date_field_val(params);
    params.xml_node_name = "HACHRAGA";
    pirtei_kisui_be_mutzar.HACHRAGA = entities.get_field_val(params);
    params.xml_node_name = "SUG-HACHRAGA";
    pirtei_kisui_be_mutzar.SUG_HACHRAGA = entities.get_field_val(params);


    params.xml_node_name = "TKUFAT-ACHSHARA";
    pirtei_kisui_be_mutzar.TKUFAT_ACHSHARA = entities.get_field_val(params);
    params.xml_node_name = "TKUFAT-HAMTANA-CHODASHIM";
    pirtei_kisui_be_mutzar.TKUFAT_HAMTANA_CHODASHIM = entities.get_field_val(params);
    params.xml_node_name = "HANACHA";
    pirtei_kisui_be_mutzar.HANACHA = entities.get_field_val(params);


    params.xml_node_name = "HATNAYA-LAHANACHA-DMEI-BITUAH";
    pirtei_kisui_be_mutzar.HATNAYA_LAHANACHA_DMEI_BITUAH = entities.get_field_val(params);
    params.xml_node_name = "DMEI-BITUAH-LETASHLUM-BAPOAL";
    pirtei_kisui_be_mutzar.DMEI_BITUAH_LETASHLUM_BAPOAL = entities.get_field_val(params);
    params.xml_node_name = "TADIRUT-SHINUY-DMEI-HABITUAH-BESHANIM";
    pirtei_kisui_be_mutzar.TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM = entities.get_field_val(params);

     params.xml_node_name = "TAARICH-IDKUN-HABA-SHEL-DMEI-HABITUAH";
    pirtei_kisui_be_mutzar.TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH = entities.get_date_field_val(params);
    params.xml_node_name = "SUG-KISUY-BITOCHI";
    pirtei_kisui_be_mutzar.SUG_KISUY_BITOCHI = entities.get_field_val(params);
    params.xml_node_name = "KOD-NISPACH-KISUY";
    pirtei_kisui_be_mutzar.KOD_NISPACH_KISUY = entities.get_field_val(params);

   
    params.xml_node_name = "SUG-ISUK";
    pirtei_kisui_be_mutzar.SUG_ISUK = entities.get_field_val(params);
    params.xml_node_name = "KOLEL-PRENZISA";
    pirtei_kisui_be_mutzar.KOLEL_PRENZISA = entities.get_field_val(params);
    params.xml_node_name = "SUG-HANACHA-KISUY";
    pirtei_kisui_be_mutzar.SUG_HANACHA_KISUY = entities.get_field_val(params);

  
        params.xml_node_name = "SHIUR-HANACHA-BEKISUI";
    pirtei_kisui_be_mutzar.SHIUR_HANACHA_BEKISUI = entities.get_field_val(params);
    params.xml_node_name = "ERECH-HANACHA-BEKISUI";
    pirtei_kisui_be_mutzar.ERECH_HANACHA_BEKISUI = entities.get_field_val(params);
  //  params.xml_node_name = "SHEM-KISUI-YATZRAN";
 //   pirtei_kisui_be_mutzar.SHEM_KISUI_YATZRAN = entities.get_field_val(params);

    


    return pirtei_kisui_be_mutzar;
}

function get_my_pirtei_kisui_be_mutzar_object(params) {
    
        var pirtei_kisui_be_mutzar = {};
    
        pirtei_kisui_be_mutzar.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
        pirtei_kisui_be_mutzar.MyNoPolice = params.my_no_police;
        pirtei_kisui_be_mutzar.TypeRec = params.type_rec;
        pirtei_kisui_be_mutzar.SHEM_KISUI_YATZRAN = params.shem_kisui_tatzran;
        //    pirtei_kisui_be_mutzar .IdClient = params.id_client;
       
    
        params.xml_node_name = "KOD-MIUTZAR-LAKISUY";
        pirtei_kisui_be_mutzar.KOD_MIUTZAR_LAKISUY = entities.get_field_val(params);
        params.xml_node_name = "SUG-MEVUTACH";
        pirtei_kisui_be_mutzar.SUG_MEVUTACH = entities.get_field_val(params);
        params.xml_node_name = "TAARICH-TCHILAT-KISUY";
        pirtei_kisui_be_mutzar.TAARICH_TCHILAT_KISUY = entities.get_date_field_val(params);
    
    
    
         params.xml_node_name = "TAARICH-TOM-KISUY";
        pirtei_kisui_be_mutzar.TAARICH_TOM_KISUY = entities.get_date_field_val(params);
        params.xml_node_name = "TAARICH-HAFSAKAT-TASHLUM";
        pirtei_kisui_be_mutzar.TAARICH_HAFSAKAT_TASHLUM = entities.get_date_field_val(params);
        params.xml_node_name = "ACHUZ-ME-SCM-BTH-YESODI";
        pirtei_kisui_be_mutzar.ACHUZ_ME_SCM_BTH_YESODI = entities.get_field_val(params);
    
    
        params.xml_node_name = "ACHUZ-MESACHAR";
        pirtei_kisui_be_mutzar.ACHUZ_MESACHAR = entities.get_field_val(params);
        params.xml_node_name = "OFEN-TASHLUM-SCHUM-BITUACH";
        pirtei_kisui_be_mutzar.OFEN_TASHLUM_SCHUM_BITUACH = entities.get_field_val(params);
        params.xml_node_name = "SCHUM-BITUACH";
        pirtei_kisui_be_mutzar.SCHUM_BITUACH = entities.get_field_val(params);
    
     
    
         params.xml_node_name = "MESHALEM-HAKISUY";
        pirtei_kisui_be_mutzar.MESHALEM_HAKISUY = entities.get_field_val(params);
        params.xml_node_name = "KOD-ISHUN";
        pirtei_kisui_be_mutzar.KOD_ISHUN = entities.get_field_val(params);
        params.xml_node_name = "IND-CHITUM";
        pirtei_kisui_be_mutzar.IND_CHITUM = entities.get_field_val(params);
    
    
    
        params.xml_node_name = "TAARICH-CHITUM";
        pirtei_kisui_be_mutzar.TAARICH_CHITUM = entities.get_date_field_val(params);
        params.xml_node_name = "HACHRAGA";
        pirtei_kisui_be_mutzar.HACHRAGA = entities.get_field_val(params);
        params.xml_node_name = "SUG-HACHRAGA";
        pirtei_kisui_be_mutzar.SUG_HACHRAGA = entities.get_field_val(params);
    
    
        params.xml_node_name = "TKUFAT-ACHSHARA";
        pirtei_kisui_be_mutzar.TKUFAT_ACHSHARA = entities.get_field_val(params);
        params.xml_node_name = "TKUFAT-HAMTANA-CHODASHIM";
        pirtei_kisui_be_mutzar.TKUFAT_HAMTANA_CHODASHIM = entities.get_field_val(params);
        params.xml_node_name = "HANACHA";
        pirtei_kisui_be_mutzar.HANACHA = entities.get_field_val(params);
    
    
        params.xml_node_name = "HATNAYA-LAHANACHA-DMEI-BITUAH";
        pirtei_kisui_be_mutzar.HATNAYA_LAHANACHA_DMEI_BITUAH = entities.get_field_val(params);
        params.xml_node_name = "DMEI-BITUAH-LETASHLUM-BAPOAL";
        pirtei_kisui_be_mutzar.DMEI_BITUAH_LETASHLUM_BAPOAL = entities.get_field_val(params);
        params.xml_node_name = "TADIRUT-SHINUY-DMEI-HABITUAH-BESHANIM";
        pirtei_kisui_be_mutzar.TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM = entities.get_field_val(params);
    
         params.xml_node_name = "TAARICH-IDKUN-HABA-SHEL-DMEI-HABITUAH";
        pirtei_kisui_be_mutzar.TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH = entities.get_date_field_val(params);
        params.xml_node_name = "SUG-KISUY-BITOCHI";
        pirtei_kisui_be_mutzar.SUG_KISUY_BITOCHI = entities.get_field_val(params);
        params.xml_node_name = "KOD-NISPACH-KISUY";
        pirtei_kisui_be_mutzar.KOD_NISPACH_KISUY = entities.get_field_val(params);
    
       
        params.xml_node_name = "SUG-ISUK";
        pirtei_kisui_be_mutzar.SUG_ISUK = entities.get_field_val(params);
        params.xml_node_name = "KOLEL-PRENZISA";
        pirtei_kisui_be_mutzar.KOLEL_PRENZISA = entities.get_field_val(params);
        params.xml_node_name = "SUG-HANACHA-KISUY";
        pirtei_kisui_be_mutzar.SUG_HANACHA_KISUY = entities.get_field_val(params);
    
      
            params.xml_node_name = "SHIUR-HANACHA-BEKISUI";
        pirtei_kisui_be_mutzar.SHIUR_HANACHA_BEKISUI = entities.get_field_val(params);
        params.xml_node_name = "ERECH-HANACHA-BEKISUI";
        pirtei_kisui_be_mutzar.ERECH_HANACHA_BEKISUI = entities.get_field_val(params);
      //  params.xml_node_name = "SHEM-KISUI-YATZRAN";
     //   pirtei_kisui_be_mutzar.SHEM_KISUI_YATZRAN = entities.get_field_val(params);
    
        
    
    
        return pirtei_kisui_be_mutzar;
}


module.exports = {
    async extract_pirtei_kisui_be_mutzar_from_xml(params) {
        try {
            var data = get_my_pirtei_kisui_be_mutzar_object(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_pirtei_kisui_be_mutzar(params) {
        try {
            var pirtei_kisui_be_mutzar = get_my_pirtei_kisui_be_mutzar(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, pirtei_kisui_be_mutzar.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, pirtei_kisui_be_mutzar.MyNoPolice)
                .input('TypeRec', sql.Int, pirtei_kisui_be_mutzar.TypeRec)


                .input('KOD_MIUTZAR_LAKISUY', sql.NVarChar, pirtei_kisui_be_mutzar.KOD_MIUTZAR_LAKISUY)
                .input('SUG_MEVUTACH', sql.Int, pirtei_kisui_be_mutzar.SUG_MEVUTACH)
                .input('TAARICH_TCHILAT_KISUY', sql.NVarChar, pirtei_kisui_be_mutzar.TAARICH_TCHILAT_KISUY)

                .input('TAARICH_TOM_KISUY', sql.NVarChar, pirtei_kisui_be_mutzar.TAARICH_TOM_KISUY)
                .input('TAARICH_HAFSAKAT_TASHLUM', sql.NVarChar, pirtei_kisui_be_mutzar.TAARICH_HAFSAKAT_TASHLUM)
                .input('ACHUZ_ME_SCM_BTH_YESODI', sql.Float, pirtei_kisui_be_mutzar.ACHUZ_ME_SCM_BTH_YESODI)
               
                .input('ACHUZ_MESACHAR', sql.Float, pirtei_kisui_be_mutzar.ACHUZ_MESACHAR)
                .input('OFEN_TASHLUM_SCHUM_BITUACH', sql.Int, pirtei_kisui_be_mutzar.OFEN_TASHLUM_SCHUM_BITUACH)
                .input('SCHUM_BITUACH', sql.Float, pirtei_kisui_be_mutzar.SCHUM_BITUACH)

                .input('MESHALEM_HAKISUY', sql.Int, pirtei_kisui_be_mutzar.MESHALEM_HAKISUY)
                .input('KOD_ISHUN', sql.Int, pirtei_kisui_be_mutzar.KOD_ISHUN)
                .input('IND_CHITUM', sql.Int, pirtei_kisui_be_mutzar.IND_CHITUM)

                .input('TAARICH_CHITUM', sql.NVarChar, pirtei_kisui_be_mutzar.TAARICH_CHITUM)
                .input('HACHRAGA', sql.Int, pirtei_kisui_be_mutzar.HACHRAGA)
                .input('SUG_HACHRAGA', sql.Int, pirtei_kisui_be_mutzar.SUG_HACHRAGA)

                .input('TKUFAT_ACHSHARA', sql.Int, pirtei_kisui_be_mutzar.TKUFAT_ACHSHARA)
                .input('TKUFAT_HAMTANA_CHODASHIM', sql.Int, pirtei_kisui_be_mutzar.TKUFAT_HAMTANA_CHODASHIM)
                .input('HANACHA', sql.Int, pirtei_kisui_be_mutzar.HANACHA)
           
                .input('HATNAYA_LAHANACHA_DMEI_BITUAH', sql.Int, pirtei_kisui_be_mutzar.HATNAYA_LAHANACHA_DMEI_BITUAH)
                .input('DMEI_BITUAH_LETASHLUM_BAPOAL', sql.Float, pirtei_kisui_be_mutzar.DMEI_BITUAH_LETASHLUM_BAPOAL)
                .input('TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM', sql.Int, pirtei_kisui_be_mutzar.TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM)
           
                .input('TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH', sql.NVarChar, pirtei_kisui_be_mutzar.TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH)
                .input('SUG_KISUY_BITOCHI', sql.Int, pirtei_kisui_be_mutzar.SUG_KISUY_BITOCHI)
                .input('KOD_NISPACH_KISUY', sql.NVarChar, pirtei_kisui_be_mutzar.KOD_NISPACH_KISUY)
           
                .input('SUG_ISUK', sql.Int, pirtei_kisui_be_mutzar.SUG_ISUK)
                .input('KOLEL_PRENZISA', sql.Int, pirtei_kisui_be_mutzar.KOLEL_PRENZISA)
                .input('SUG_HANACHA_KISUY', sql.Int, pirtei_kisui_be_mutzar.SUG_HANACHA_KISUY)
           
                .input('SHIUR_HANACHA_BEKISUI', sql.Float, pirtei_kisui_be_mutzar.SHIUR_HANACHA_BEKISUI)
                .input('ERECH_HANACHA_BEKISUI', sql.Float, pirtei_kisui_be_mutzar.ERECH_HANACHA_BEKISUI)
                .input('SHEM_KISUI_YATZRAN', sql.NVarChar, pirtei_kisui_be_mutzar.SHEM_KISUI_YATZRAN)
           
          






                .query(sql_insert_pirtei_kisui_be_mutzar);


            return " pirtei_kisui_be_mutzar  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


