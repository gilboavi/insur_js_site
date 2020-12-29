// schumei_bituah_sesodi


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_schumei_bituah_sesodi = "INSERT INTO [InsurDB].[dbo].[SchumeiBituahYesodiDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    "  ,KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI , SUG_HATZMADA_SCHUM_BITUAH " +
    " ,SUG_HATZMADA_DMEI_BITUAH " +
    ", SUG_MASLUL_LEBITUAH    , IND_SCHUM_BITUAH_KOLEL_CHISACHON " +
 "    , SCHUM_BITUACH_LEMASLUL    , MISPAR_MASKOROT " +
"   , ACHUZ_HAKTZAA_LE_CHISACHON    , TIKRAT_GAG_HATAM_LEMIKRE_MAVET   " +
 "  , TIKRAT_GAG_HATAM_LE_O_K_A    , SCHUM_BITUAH_LEMAVET) " +

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    "  ,@KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI , @SUG_HATZMADA_SCHUM_BITUAH " +
    " ,@SUG_HATZMADA_DMEI_BITUAH " +
    ", @SUG_MASLUL_LEBITUAH    , @IND_SCHUM_BITUAH_KOLEL_CHISACHON " +
    "    , @SCHUM_BITUACH_LEMASLUL    , @MISPAR_MASKOROT " +
"   ,@ACHUZ_HAKTZAA_LE_CHISACHON    , @TIKRAT_GAG_HATAM_LEMIKRE_MAVET   " +
    "  , @TIKRAT_GAG_HATAM_LE_O_K_A    , @SCHUM_BITUAH_LEMAVET) "

    ;

 var SugHatzmadaSchumBituah_list={
    1:"חצי שנתי",
    2:"חודשי",
    3:"מתואם",
    4:"לא צמוד",
    5:"רווחי הצמדה",
    6:"משתתף ברווחים",
    7:"דולר",
    8:"צמוד למדד הליבור",
    9:"צמוד למט''ח לא דולרי",
    10:""
    
} 

var SugMaslulLeBituah_list={
    0:"יסודי",
    1:"סכום ביטוח מבוקש",
    2:"כפולות שכר",
    3:"אחוז הקצאה לחסכון",
    4:"חסכון טהור"   
}

var SchumBituahKolelChisachon_list={
    1:"כן",
    2:"לא"

}

var  temp="";
function get_my_schumei_bituah_sesodi(params) {

    var schumei_bituah_sesodi = {};

    schumei_bituah_sesodi.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    schumei_bituah_sesodi.MyNoPolice = params.my_no_police;
    schumei_bituah_sesodi.TypeRec = params.type_rec;

    //    schumei_bituah_sesodi .IdClient = params.id_client;
   
    params.xml_node_name = "KOD-MUTZAR-LEFI-KIDUD-ACHID-LAYESODI";
    schumei_bituah_sesodi.KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI = entities.get_field_val(params);
    params.xml_node_name = "SUG-HATZMADA-SCHUM-BITUAH";
    schumei_bituah_sesodi.SUG_HATZMADA_SCHUM_BITUAH = entities.get_field_val(params);
   params.xml_node_name = "SUG-HATZMADA-DMEI-BITUAH";
   schumei_bituah_sesodi.SUG_HATZMADA_DMEI_BITUAH = entities.get_field_val(params);

    params.xml_node_name = "SUG-MASLUL-LEBITUAH";
    schumei_bituah_sesodi.SUG_MASLUL_LEBITUAH = entities.get_field_val(params);
    params.xml_node_name = "IND-SCHUM-BITUAH-KOLEL-CHISACHON";
    schumei_bituah_sesodi.IND_SCHUM_BITUAH_KOLEL_CHISACHON = entities.get_field_val(params);


    params.xml_node_name = "SCHUM-BITUACH-LEMASLUL";
    schumei_bituah_sesodi.SCHUM_BITUACH_LEMASLUL = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-MASKOROT";
    schumei_bituah_sesodi.MISPAR_MASKOROT = entities.get_field_val(params);

     params.xml_node_name = "ACHUZ-HAKTZAA-LE-CHISACHON";
    schumei_bituah_sesodi.ACHUZ_HAKTZAA_LE_CHISACHON = entities.get_field_val(params);
    params.xml_node_name = "TIKRAT-GAG-HATAM-LEMIKRE-MAVET";
    schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LEMIKRE_MAVET = entities.get_field_val(params);


    params.xml_node_name = "TIKRAT-GAG-HATAM-LE-O-K-A";
    schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LE_O_K_A = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-BITUAH-LEMAVET";
    schumei_bituah_sesodi.SCHUM_BITUAH_LEMAVET = entities.get_field_val(params);
   



    return schumei_bituah_sesodi;
}

function get_my_schumei_bituah_sesodi_object(params) {
    
        var schumei_bituah_sesodi = {};
    
        schumei_bituah_sesodi.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
        schumei_bituah_sesodi.MyNoPolice = params.my_no_police;
        schumei_bituah_sesodi.TypeRec = params.type_rec;
    
        //    schumei_bituah_sesodi .IdClient = params.id_client;
       
        params.xml_node_name = "KOD-MUTZAR-LEFI-KIDUD-ACHID-LAYESODI";
        schumei_bituah_sesodi.KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI = entities.get_field_val(params);
        params.xml_node_name = "SUG-HATZMADA-SCHUM-BITUAH";
        schumei_bituah_sesodi.SUG_HATZMADA_SCHUM_BITUAH = entities.get_field_val(params);
        try{
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
            schumei_bituah_sesodi.SugHatzmadaSchumBituah = SugHatzmadaSchumBituah_list[temp];
        }
        catch(e) {
            schumei_bituah_sesodi.SugHatzmadaSchumBituah ="";
        };
        params.xml_node_name = "SUG-HATZMADA-DMEI-BITUAH";
        schumei_bituah_sesodi.SUG_HATZMADA_DMEI_BITUAH = entities.get_field_val(params);
        try{
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
            schumei_bituah_sesodi.SugHatzmadaDmeiBituah = SugHatzmadaSchumBituah_list[temp];
        }
        catch (e) {
            schumei_bituah_sesodi.SugHatzmadaDmeiBituah = "";
        };
        params.xml_node_name = "SUG-MASLUL-LEBITUAH";
        schumei_bituah_sesodi.SUG_MASLUL_LEBITUAH = entities.get_field_val(params);
        try{
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
            schumei_bituah_sesodi.SugMaslulLeBituah = SugMaslulLeBituah_list[temp];
        }
        catch(e) {
            schumei_bituah_sesodi.SugMaslulLeBituah = "";
        };
        params.xml_node_name = "IND-SCHUM-BITUAH-KOLEL-CHISACHON";
        schumei_bituah_sesodi.IND_SCHUM_BITUAH_KOLEL_CHISACHON = entities.get_field_val(params);
        try{
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
            schumei_bituah_sesodi.SchumBituahKolelChisachon = SchumBituahKolelChisachon_list[temp];
        }
        catch (e){
            schumei_bituah_sesodi.SchumBituahKolelChisachon = "";
        };
        
        params.xml_node_name = "SCHUM-BITUACH-LEMASLUL";
        schumei_bituah_sesodi.SCHUM_BITUACH_LEMASLUL = entities.get_field_val(params);
        params.xml_node_name = "MISPAR-MASKOROT";
        schumei_bituah_sesodi.MISPAR_MASKOROT = entities.get_field_val(params);
    
         params.xml_node_name = "ACHUZ-HAKTZAA-LE-CHISACHON";
        schumei_bituah_sesodi.ACHUZ_HAKTZAA_LE_CHISACHON = entities.get_field_val(params);
        params.xml_node_name = "TIKRAT-GAG-HATAM-LEMIKRE-MAVET";
        schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LEMIKRE_MAVET = entities.get_field_val(params);
    
    
        params.xml_node_name = "TIKRAT-GAG-HATAM-LE-O-K-A";
        schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LE_O_K_A = entities.get_field_val(params);
        params.xml_node_name = "SCHUM-BITUAH-LEMAVET";
        schumei_bituah_sesodi.SCHUM_BITUAH_LEMAVET = entities.get_field_val(params);
       
    
    
    
        return schumei_bituah_sesodi;
    }
    

module.exports = {
    async extract_schumei_bituah_sesodi_from_xml(params) {
        try {
            var data = get_my_schumei_bituah_sesodi_object(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_schumei_bituah_sesodi(params) {
        try {
            var schumei_bituah_sesodi = get_my_schumei_bituah_sesodi(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, schumei_bituah_sesodi.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, schumei_bituah_sesodi.MyNoPolice)
                .input('TypeRec', sql.Int, schumei_bituah_sesodi.TypeRec)
            

                .input('KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI', sql.NVarChar, schumei_bituah_sesodi.KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI)
                .input('SUG_HATZMADA_SCHUM_BITUAH', sql.Int, schumei_bituah_sesodi.SUG_HATZMADA_SCHUM_BITUAH)
                .input('SUG_HATZMADA_DMEI_BITUAH', sql.Int, schumei_bituah_sesodi.SUG_HATZMADA_DMEI_BITUAH)
                .input('SUG_MASLUL_LEBITUAH', sql.Int, schumei_bituah_sesodi.SUG_MASLUL_LEBITUAH)

                .input('IND_SCHUM_BITUAH_KOLEL_CHISACHON', sql.Int, schumei_bituah_sesodi.IND_SCHUM_BITUAH_KOLEL_CHISACHON)
                .input('SCHUM_BITUACH_LEMASLUL', sql.Float, schumei_bituah_sesodi.SCHUM_BITUACH_LEMASLUL)
                .input('MISPAR_MASKOROT', sql.Int, schumei_bituah_sesodi.MISPAR_MASKOROT)

                .input('ACHUZ_HAKTZAA_LE_CHISACHON', sql.Float, schumei_bituah_sesodi.ACHUZ_HAKTZAA_LE_CHISACHON)
                .input('TIKRAT_GAG_HATAM_LEMIKRE_MAVET', sql.Float, schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LEMIKRE_MAVET)
                .input('TIKRAT_GAG_HATAM_LE_O_K_A', sql.Float, schumei_bituah_sesodi.TIKRAT_GAG_HATAM_LE_O_K_A)

                .input('SCHUM_BITUAH_LEMAVET', sql.Float, schumei_bituah_sesodi.SCHUM_BITUAH_LEMAVET)






                .query(sql_insert_schumei_bituah_sesodi);


            return " schumei_bituah_sesodi  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


