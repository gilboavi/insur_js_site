var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_yitra_lefi_gil_prisha = "INSERT INTO [InsurDB].[dbo].[YitraLefiGilPrishaDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
    " ,Mone ,GIL_PRISHA, TOTAL_CHISACHON_MITZTABER_TZAFUY, TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT " +
    " , SHEUR_PNS_ZIKNA_TZFUYA, MEKADEM_MOVTACH_LEPRISHA, MEKADEM_HAVTACHST_TOCHELET " +
    "  , MEKADEM_HAVTACHST_TOCHELETPRISHA, SHEM_MASLOL, MEKADEM_HAVTACHAT_TSUA " +
    "  , MEKADEM_HAVTACHAT_TSUATKUFA, TKUFAT_HAGBALA_BESHANIM, TOCHELET_MASHPIA_KITZBA " +
    "   , TSUA_MASHPIA_KITZBA) " +
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    " ,@Mone ,@GIL_PRISHA, @TOTAL_CHISACHON_MITZTABER_TZAFUY, @TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT " +
    " , @SHEUR_PNS_ZIKNA_TZFUYA, @MEKADEM_MOVTACH_LEPRISHA, @MEKADEM_HAVTACHST_TOCHELET " +
    "  , @MEKADEM_HAVTACHST_TOCHELETPRISHA, @SHEM_MASLOL, @MEKADEM_HAVTACHAT_TSUA " +
    "  , @MEKADEM_HAVTACHAT_TSUATKUFA, @TKUFAT_HAGBALA_BESHANIM, @TOCHELET_MASHPIA_KITZBA " +
    "   , @TSUA_MASHPIA_KITZBA) "
    ;

let yes_no={
    1:"כן",
    2:"לא"
}    

function get_my_yitra_lefi_gil_prisha(params) {

    var yitra_lefi_gil_prisha = {};

    yitra_lefi_gil_prisha.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    yitra_lefi_gil_prisha.Mone = params.mone_gil_prisha;
    yitra_lefi_gil_prisha.MyNoPolice = params.my_no_police;
    yitra_lefi_gil_prisha.TypeRec = params.type_rec;
    //    yitra_lefi_gil_prisha.IdClient = params.id_client;


    params.xml_node_name = "GIL-PRISHA";
    yitra_lefi_gil_prisha.GIL_PRISHA = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-CHISACHON-MITZTABER-TZAFUY";
    yitra_lefi_gil_prisha.TOTAL_CHISACHON_MITZTABER_TZAFUY = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-CHISACHON-CHAZUYA-LELO-PREMIYOT";
    yitra_lefi_gil_prisha.TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT = entities.get_field_val(params);
                                    

    params.xml_node_name = "SHEUR-PNS-ZIKNA-TZFUYA";
    yitra_lefi_gil_prisha.SHEUR_PNS_ZIKNA_TZFUYA = entities.get_field_val(params);
    params.xml_node_name = "MEKADEM-MOVTACH-LEPRISHA";
    yitra_lefi_gil_prisha.MEKADEM_MOVTACH_LEPRISHA = entities.get_field_val(params);

    params.xml_node_name = "MEKADEM-HAVTACHST-TOCHELET";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELET = entities.get_field_val(params);
    yitra_lefi_gil_prisha.mekadem_havtachat_tochelet =yes_no[ yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELET];

    params.xml_node_name = "MEKADEM-HAVTACHST-TOCHELETPRISHA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELETPRISHA = entities.get_field_val(params);
    yitra_lefi_gil_prisha.mekadem_havtachst_tocheletprisha=yes_no[yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELETPRISHA ];
    params.xml_node_name = "SHEM-MASLOL";
    yitra_lefi_gil_prisha.SHEM_MASLOL = entities.get_field_val(params);
    params.xml_node_name = "MEKADEM-HAVTACHAT-TSUA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUA = entities.get_field_val(params);
    yitra_lefi_gil_prisha.mekadem_havtachat_tsua=yes_no[yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUA ];


    params.xml_node_name = "MEKADEM-HAVTACHAT-TSUATKUFA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUATKUFA = entities.get_field_val(params);
    yitra_lefi_gil_prisha.mekadem_havtachat_tsuatkufa=yes_no[yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUATKUFA ];

    params.xml_node_name = "TKUFAT-HAGBALA-BESHANIM";
    yitra_lefi_gil_prisha.TKUFAT_HAGBALA_BESHANIM = entities.get_field_val(params);
    params.xml_node_name = "TOCHELET-MASHPIA-KITZBA";
    yitra_lefi_gil_prisha.TOCHELET_MASHPIA_KITZBA = entities.get_field_val(params);
    yitra_lefi_gil_prisha.tochelet_mashpia_kitzva=yes_no[yitra_lefi_gil_prisha.TOCHELET_MASHPIA_KITZBA ];

    params.xml_node_name = "TSUA-MASHPIA-KITZBA";
    yitra_lefi_gil_prisha.TSUA_MASHPIA_KITZBA = entities.get_field_val(params);
    yitra_lefi_gil_prisha.tsua_mashpia_kitzva=yes_no[yitra_lefi_gil_prisha.TSUA_MASHPIA_KITZBA ];

    params.xml_node_name = "SHEUR-PNS-ZIKNA-TZFUYA";
    yitra_lefi_gil_prisha.SHEUR_PNS_ZIKNA_TZFUYA = entities.get_field_val(params);


    return yitra_lefi_gil_prisha;
}


module.exports = {

    async get_yitra_lefi_gil_prisha_with_kupa(params) {
        let yitra_lefi_gil_prisha_object={};
        let kupa_object={};
        try {
            // let yitra_lefi_gil_prisha_and_kupa=params[0];                       
            // let yitrot_lefi_gil_prisha_with_kupa=yitra_lefi_gil_prisha_and_kupa.yitra_lefi_gil_prisha;
                                 
            let yitra_lefi_gil_prisha_and_kupa=params[0].yitra_lefi_gil_prisha;
            let kupa_array=params[0].kupa_array;
           
          
            let index=kupa_array.length;

            yitra_lefi_gil_prisha_and_kupa.SUG_KUPA=0;
            yitra_lefi_gil_prisha_and_kupa.ACHUZ_TSUA_BATACHAZIT= 0;
            yitra_lefi_gil_prisha_and_kupa.SCHUM_KITZVAT_ZIKNA=0;
            yitra_lefi_gil_prisha_and_kupa.KITZVAT_HODSHIT_TZFUYA=0;
            yitra_lefi_gil_prisha_and_kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT=0;
            yitra_lefi_gil_prisha_and_kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT= 0;
            yitra_lefi_gil_prisha_and_kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT=0;
            yitra_lefi_gil_prisha_and_kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT=0;

            for(var i=0 ;index>i; i++){
               let my_kupa=kupa_array[i];
               yitra_lefi_gil_prisha_and_kupa.SUG_KUPA=my_kupa.SUG_KUPA;
               yitra_lefi_gil_prisha_and_kupa.ACHUZ_TSUA_BATACHAZIT= my_kupa.ACHUZ_TSUA_BATACHAZIT;
               let SCHUM_KITZVAT_ZIKNA=(Number(my_kupa.SCHUM_KITZVAT_ZIKNA))?Number(my_kupa.SCHUM_KITZVAT_ZIKNA) :0;
               yitra_lefi_gil_prisha_and_kupa.SCHUM_KITZVAT_ZIKNA=Number(yitra_lefi_gil_prisha_and_kupa.SCHUM_KITZVAT_ZIKNA)+SCHUM_KITZVAT_ZIKNA;
               let KITZVAT_HODSHIT_TZFUYA=Number(my_kupa.KITZVAT_HODSHIT_TZFUYA) ? Number(my_kupa.KITZVAT_HODSHIT_TZFUYA):0;
               yitra_lefi_gil_prisha_and_kupa.KITZVAT_HODSHIT_TZFUYA+=KITZVAT_HODSHIT_TZFUYA;
               let TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT=Number(my_kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT)?Number(my_kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT):0;
               yitra_lefi_gil_prisha_and_kupa.TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT+= TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT;
              let TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT=Number(my_kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT)?Number(my_kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT):0;
               yitra_lefi_gil_prisha_and_kupa.TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT+= TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT;
               let TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT=Number(my_kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT)?Number(my_kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT):0;
               yitra_lefi_gil_prisha_and_kupa.TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT+=TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT;
               let TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT=Number(my_kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT)?Number(my_kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT):0;
               yitra_lefi_gil_prisha_and_kupa.TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT+=TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT;
              
              
              
              
              
               // yitra_lefi_gil_prisha_arry
                // yitra_lefi_gil_prisha
                // for(let kupa in kupa_array){
                //     yitra_lefi_gil_prisha_object=  yitra_lefi_gil_prisha.yitra_lefi_gil_prisha;
                // }
            }
           
            return yitra_lefi_gil_prisha_and_kupa;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async extract_yitra_lefi_gil_prisha_from_xml(params) {
        try {
            var data = get_my_yitra_lefi_gil_prisha(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_yitra_lefi_gil_prisha(params) {
        try {
            var yitra_lefi_gil_prisha = get_my_yitra_lefi_gil_prisha(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, yitra_lefi_gil_prisha.KOD_MEZAHE_YATZRAN)
                .input('Mone', sql.Int, yitra_lefi_gil_prisha.Mone)
                .input('MyNoPolice', sql.NVarChar, yitra_lefi_gil_prisha.MyNoPolice)
                .input('TypeRec', sql.Int, yitra_lefi_gil_prisha.TypeRec)

                .input('GIL_PRISHA', sql.Int, yitra_lefi_gil_prisha.GIL_PRISHA)
                .input('TOTAL_CHISACHON_MITZTABER_TZAFUY', sql.Float, yitra_lefi_gil_prisha.TOTAL_CHISACHON_MITZTABER_TZAFUY)
                .input('TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT', sql.Float, yitra_lefi_gil_prisha.TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT)
                           
                .input('SHEUR_PNS_ZIKNA_TZFUYA', sql.Float, yitra_lefi_gil_prisha.SHEUR_PNS_ZIKNA_TZFUYA)
                .input('MEKADEM_MOVTACH_LEPRISHA', sql.Int, yitra_lefi_gil_prisha.MEKADEM_MOVTACH_LEPRISHA)
                .input('MEKADEM_HAVTACHST_TOCHELET', sql.Int, yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELET)

                .input('MEKADEM_HAVTACHST_TOCHELETPRISHA', sql.Int, yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELETPRISHA)
                .input('SHEM_MASLOL', sql.NVarChar, yitra_lefi_gil_prisha.SHEM_MASLOL)
                .input('MEKADEM_HAVTACHAT_TSUA', sql.Int, yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUA)

                .input('MEKADEM_HAVTACHAT_TSUATKUFA', sql.Int, yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUATKUFA)
                .input('TKUFAT_HAGBALA_BESHANIM', sql.Float, yitra_lefi_gil_prisha.TKUFAT_HAGBALA_BESHANIM)
                .input('TOCHELET_MASHPIA_KITZBA', sql.Int, yitra_lefi_gil_prisha.TOCHELET_MASHPIA_KITZBA)

                .input('TSUA_MASHPIA_KITZBA', sql.Int, yitra_lefi_gil_prisha.TSUA_MASHPIA_KITZBA)





                .query(sql_insert_yitra_lefi_gil_prisha);
           

            return "yitra_lefi_gil_prisha was save";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}