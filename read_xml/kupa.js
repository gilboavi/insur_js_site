

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_kupa = " INSERT INTO InsurDB.dbo.KupaDB " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  "  ,MoneYitraLefiGilPrisha, SUG_KUPA, SCHUM_KITZVAT_ZIKNA "+
    "  , KITZVAT_HODSHIT_TZFUYA  ,   ACHUZ_TSUA_BATACHAZIT  " +
    " , TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT " +
    " , TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT " +
    ", TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT " +
   " , TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT) "+
    " VALUES " +
    "  (@MyNoPolice ,@KOD_MEZAHE_YATZRAN ,@TypeRec " +
    "  ,@MoneYitraLefiGilPrisha, @SUG_KUPA, @SCHUM_KITZVAT_ZIKNA " +
    "  , @KITZVAT_HODSHIT_TZFUYA  ,   @ACHUZ_TSUA_BATACHAZIT  " +
    " , @TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT " +
    " , @TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT " +
    ", @TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT " +
    " , @TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT) " 
;

function get_my_kupa(params) {

    var my_kupa = {};

    my_kupa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    my_kupa.MoneYitraLefiGilPrisha = params.mone_gil_prisha;
    my_kupa.MyNoPolice = params.my_no_police;
    my_kupa.TypeRec = params.type_rec;
    my_kupa.SerialYitraLefiGilPrisha = params.serial_gil_prisha;
    //    my_kupa.IdClient = params.id_client;


    params.xml_node_name = "SUG-KUPA";
    my_kupa.SUG_KUPA = entities.get_field_val(params);
    
    params.xml_node_name = "SCHUM-KITZVAT-ZIKNA";
    my_kupa.SCHUM_KITZVAT_ZIKNA = entities.get_field_val(params);

    params.xml_node_name = "KITZVAT-HODSHIT-TZFUYA";
    my_kupa.KITZVAT_HODSHIT_TZFUYA = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-TSUA-BATACHAZIT";
    my_kupa.ACHUZ_TSUA_BATACHAZIT = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-ITRA-TZFUYA-MECHUSHAV-LEHON-IM-PREMIOT";
    my_kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-CHISACHON-TZFUYA-LEHON-LELO-PREMIYOT";
    my_kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-SCHUM-MTZBR-TZAFUY-LEGIL-PRISHA-MECHUSHAV-LEKITZBA-IM-PREMIYOT";
    my_kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-SCHUM-MITZVTABER-TZFUY-LEGIL-PRISHA-MECHUSHAV-HAMEYOAD-LEKITZBA-LELO-PREMIYOT";
    my_kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT = entities.get_field_val(params);




    return my_kupa;
}


module.exports = {
    async extract_kupa_from_xml(params) {
        try {
            var data = get_my_kupa(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_kupa(params) {
        try {
            var kupa = get_my_kupa(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, kupa.KOD_MEZAHE_YATZRAN)
                .input('MoneYitraLefiGilPrisha', sql.Int, kupa.MoneYitraLefiGilPrisha)
                .input('MyNoPolice', sql.NVarChar, kupa.MyNoPolice)
                .input('TypeRec', sql.Int, kupa.TypeRec)
              

                .input('SUG_KUPA', sql.Int, kupa.SUG_KUPA)
                .input('SCHUM_KITZVAT_ZIKNA', sql.Float, kupa.SCHUM_KITZVAT_ZIKNA)
                   //      SCHUM_KITZVAT_ZIKNA
                .input('KITZVAT_HODSHIT_TZFUYA', sql.Float, kupa.KITZVAT_HODSHIT_TZFUYA)
                .input('ACHUZ_TSUA_BATACHAZIT', sql.Float, kupa.ACHUZ_TSUA_BATACHAZIT)
                .input('TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT',
                           sql.Float, kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT)
                .input('TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT',
                sql.Float, kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT)
                .input('TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT',
                sql.Float, kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT)
                .input('TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT',
                sql.Float, kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT)

                .query(sql_insert_kupa);


            return "kupa was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
