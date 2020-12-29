var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_yitra_lefi_gil_prisha = "INSERT INTO [InsurDB].[dbo].[YitraLefiGilPrishaDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
  " ,GIL_PRISHA, TOTAL_CHISACHON_MITZTABER_TZAFUY, TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT "+
   " , SHEUR_PNS_ZIKNA_TZFUYA, MEKADEM_MOVTACH_LEPRISHA, MEKADEM_HAVTACHST_TOCHELET "+
  "  , MEKADEM_HAVTACHST_TOCHELETPRISHA, SHEM_MASLOL, MEKADEM_HAVTACHAT_TSUA "+
  "  , MEKADEM_HAVTACHAT_TSUATKUFA, TKUFAT_HAGBALA_BESHANIM, TOCHELET_MASHPIA_KITZBA "+
 "   , TSUA_MASHPIA_KITZBA) "+
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    " ,@GIL_PRISHA, @TOTAL_CHISACHON_MITZTABER_TZAFUY, @TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT " +
    " , @SHEUR_PNS_ZIKNA_TZFUYA, @MEKADEM_MOVTACH_LEPRISHA, @MEKADEM_HAVTACHST_TOCHELET " +
    "  , @MEKADEM_HAVTACHST_TOCHELETPRISHA, @SHEM_MASLOL, @MEKADEM_HAVTACHAT_TSUA " +
    "  , @MEKADEM_HAVTACHAT_TSUATKUFA, @TKUFAT_HAGBALA_BESHANIM, @TOCHELET_MASHPIA_KITZBA " +
    "   , @TSUA_MASHPIA_KITZBA) "
    ;

function get_my_yitra_lefi_gil_prisha(params) {

    var yitra_lefi_gil_prisha = {};

    yitra_lefi_gil_prisha.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    yitra_lefi_gil_prisha.MyNoPolice = params.my_no_police;
    yitra_lefi_gil_prisha.TypeRec = params.type_rec;
    //    yitra_lefi_gil_prisha.IdClient = params.id_client;
   

    params.xml_node_name = "GIL-PRISHA";
    yitra_lefi_gil_prisha.GIL_PRISHA = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-CHISACHON-MITZTABER-TZAFUY";
    yitra_lefi_gil_prisha.TOTAL_CHISACHON_MITZTABER_TZAFUY = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-CHISACHON-CHAZUYA_LELO_PREMIYOT";
    yitra_lefi_gil_prisha.TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT = entities.get_field_val(params);

  
    params.xml_node_name = "SHEUR-PNS-ZIKNA-TZFUYA";
    yitra_lefi_gil_prisha.SHEUR_PNS_ZIKNA_TZFUYA = entities.get_field_val(params);
    params.xml_node_name = "MEKADEM-MOVTACH-LEPRISHA";
    yitra_lefi_gil_prisha.MEKADEM_MOVTACH_LEPRISHA = entities.get_field_val(params);
    params.xml_node_name = "MEKADEM-HAVTACHST-TOCHELET";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELET = entities.get_field_val(params);

   
    params.xml_node_name = "MEKADEM-HAVTACHST-TOCHELETPRISHA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHST_TOCHELETPRISHA = entities.get_field_val(params);
    params.xml_node_name = "SHEM-MASLOL";
    yitra_lefi_gil_prisha.SHEM_MASLOL = entities.get_field_val(params);
    params.xml_node_name = "MEKADEM-HAVTACHAT-TSUA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUA = entities.get_field_val(params);

  

    params.xml_node_name = "MEKADEM-HAVTACHAT-TSUATKUFA";
    yitra_lefi_gil_prisha.MEKADEM_HAVTACHAT_TSUATKUFA = entities.get_field_val(params);
    params.xml_node_name = "TKUFAT-HAGBALA-BESHANIM";
    yitra_lefi_gil_prisha.TKUFAT_HAGBALA_BESHANIM = entities.get_field_val(params);
    params.xml_node_name = "TOCHELET-MASHPIA-KITZBA";
    yitra_lefi_gil_prisha.TOCHELET_MASHPIA_KITZBA = entities.get_field_val(params);


    params.xml_node_name = "TSUA-MASHPIA-KITZBA";
    yitra_lefi_gil_prisha.TSUA_MASHPIA_KITZBA = entities.get_field_val(params);




    return yitra_lefi_gil_prisha;
}


module.exports = {
    async insert_yitra_lefi_gil_prisha(params) {
        try {
            var yitra_lefi_gil_prisha = get_my_yitra_lefi_gil_prisha(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, yitra_lefi_gil_prisha.KOD_MEZAHE_YATZRAN)
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
            var sql_select = "Select Serial FROM [InsurDB].[dbo].[YitraLefiGilPrishaDB] " +
                " WHERE " +
                " MyNoPolice= @MyNoPolice AND  KOD_MEZAHE_YATZRAN=@KOD_MEZAHE_YATZRAN " +
            " AND  TypeRec= @TypeRec ";
            result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, yitra_lefi_gil_prisha.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, yitra_lefi_gil_prisha.MyNoPolice)
                .input('TypeRec', sql.Int, yitra_lefi_gil_prisha.TypeRec)
                .query(sql_select);

            return  result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}