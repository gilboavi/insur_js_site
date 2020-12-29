var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_pirtey_tvia = "INSERT INTO [InsurDB].[dbo].[PirteyTviaDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
   " ,YESH_TVIA , MISPAR_TVIA_BE_YATZRAN , MISPAR_KISUI_BE_YATZRAN "+
   " , SHEM_KISUI_BE_YATZRAN , SUG_HATVIAA  , OFEN_TASHLUM " +
   " , KOD_STATUS_TVIAA , TAARICH_STATUS_TVIA , TAARICH_TECHILAT_TASHLUM "+
   " , ACHUZ_MEUSHAR_O_K_A_SHICHRUR , SCHUM_TVIA_MEUSHAR , ACHUZ_NECHUT) "+
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    " ,@YESH_TVIA , @MISPAR_TVIA_BE_YATZRAN , @MISPAR_KISUI_BE_YATZRAN " +
    " , @SHEM_KISUI_BE_YATZRAN , @SUG_HATVIAA  ,@OFEN_TASHLUM " +
    " , @KOD_STATUS_TVIAA , @TAARICH_STATUS_TVIA , @TAARICH_TECHILAT_TASHLUM " +
    " , @ACHUZ_MEUSHAR_O_K_A_SHICHRUR , @SCHUM_TVIA_MEUSHAR , @ACHUZ_NECHUT) "
    ;

function get_my_pirtey_tvia(params) {

    var pirtey_tvia = {};

    pirtey_tvia.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    pirtey_tvia.MyNoPolice = params.my_no_police;
    pirtey_tvia.TypeRec = params.type_rec;
    //    pirtey_tvia.IdClient = params.id_client;
    

    params.xml_node_name = "YESH-TVIA";
    pirtey_tvia.YESH_TVIA = entities.get_field_val(params);
    params.xml_node_name = "MISPAR_TVIA-BE-YATZRAN";
    pirtey_tvia.MISPAR_TVIA_BE_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "MISPAR_KISUI-BE-YATZRAN";
    pirtey_tvia.MISPAR_KISUI_BE_YATZRAN = entities.get_field_val(params);
  

    params.xml_node_name = "SHEM-KISUI-BE-YATZRAN";
    pirtey_tvia.SHEM_KISUI_BE_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "SUG-HATVIAA";
    pirtey_tvia.SUG_HATVIAA = entities.get_field_val(params);
    params.xml_node_name = "OFEN-TASHLUM";
    pirtey_tvia.OFEN_TASHLUM = entities.get_field_val(params);
   
    
        params.xml_node_name = "KOD-STATUS-_TVIAA";
    pirtey_tvia.KOD_STATUS_TVIAA = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-STATUS-TVIA";
    pirtey_tvia.TAARICH_STATUS_TVIA = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-TECHILAT-_TASHLUM";
    pirtey_tvia.TAARICH_TECHILAT_TASHLUM = entities.get_date_field_val(params);

    params.xml_node_name = "ACHUZ_MEUSHAR-O-K-A-SHICHRUR";
    pirtey_tvia.ACHUZ_MEUSHAR_O_K_A_SHICHRUR = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-TVIA-_MEUSHAR";
    pirtey_tvia.SCHUM_TVIA_MEUSHAR = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-NECHUT";
    pirtey_tvia.ACHUZ_NECHUT = entities.get_field_val(params);




    return pirtey_tvia;
}


module.exports = {
    async extract_pirtey_tvia_from_xml(params) {
        try {
            var data = get_my_pirtey_tvia(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_pirtey_tvia(params) {
        try {
            var pirtey_tvia = get_my_pirtey_tvia(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, pirtey_tvia.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, pirtey_tvia.MyNoPolice)
                .input('TypeRec', sql.Int, pirtey_tvia.TypeRec)

                .input('YESH_TVIA', sql.Int, pirtey_tvia.YESH_TVIA)
                .input('MISPAR_TVIA_BE_YATZRAN', sql.Int, pirtey_tvia.MISPAR_TVIA_BE_YATZRAN)
                .input('MISPAR_KISUI_BE_YATZRAN', sql.NVarChar, pirtey_tvia.MISPAR_KISUI_BE_YATZRAN)

                .input('SHEM_KISUI_BE_YATZRAN', sql.NVarChar, pirtey_tvia.SHEM_KISUI_BE_YATZRAN)
                .input('SUG_HATVIAA', sql.Int, pirtey_tvia.SUG_HATVIAA)
                .input('OFEN_TASHLUM', sql.Int, pirtey_tvia.OFEN_TASHLUM)

                .input('KOD_STATUS_TVIAA', sql.Int, pirtey_tvia.KOD_STATUS_TVIAA)
                .input('TAARICH_STATUS_TVIA', sql.NVarChar, pirtey_tvia.TAARICH_STATUS_TVIA)
                .input('TAARICH_TECHILAT_TASHLUM', sql.NVarChar, pirtey_tvia.TAARICH_TECHILAT_TASHLUM)

                .input('ACHUZ_MEUSHAR_O_K_A_SHICHRUR', sql.Float, pirtey_tvia.ACHUZ_MEUSHAR_O_K_A_SHICHRUR)
                .input('SCHUM_TVIA_MEUSHAR', sql.Float, pirtey_tvia.SCHUM_TVIA_MEUSHAR)
                .input('ACHUZ_NECHUT', sql.Float, pirtey_tvia.ACHUZ_NECHUT)

               


                .query(sql_insert_pirtey_tvia);


            return " pirtey_tvia was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}