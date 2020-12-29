


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_hotzaot_bafoal_lehodesh_divoach = "INSERT INTO [InsurDB].[dbo].[HotzaotBafoalLehodeshDivoachDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  "  ,SHEUR_DMEI_NIHUL_HAFKADA  , TOTAL_DMEI_NIHUL_HAFKADA, SHEUR_DMEI_NIHUL_TZVIRA "+
 "   , TOTAL_DMEI_NIHUL_TZVIRA    , SACH_DMEI_NIHUL_ACHERIM    , TOTAL_DMEI_NIHUL_POLISA_O_HESHBON "+
 "   , SACH_DMEI_BITUAH_SHENIGBOO    , HOTZOT_NIHUL_ASHKAOT    , DEMI_AAVARAT_MASLOL "+
 "   , DMEI_NIUL_MENAEL_TIKIM    , OFEN_GEVIAT_DMEI_BITUACH) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    "  ,@SHEUR_DMEI_NIHUL_HAFKADA  , @TOTAL_DMEI_NIHUL_HAFKADA, @SHEUR_DMEI_NIHUL_TZVIRA " +
    "   , @TOTAL_DMEI_NIHUL_TZVIRA    , @SACH_DMEI_NIHUL_ACHERIM    , @TOTAL_DMEI_NIHUL_POLISA_O_HESHBON " +
    "   , @SACH_DMEI_BITUAH_SHENIGBOO    , @HOTZOT_NIHUL_ASHKAOT   , @DEMI_AAVARAT_MASLOL " +
    "   , @DMEI_NIUL_MENAEL_TIKIM    , @OFEN_GEVIAT_DMEI_BITUACH) "

    ;

function get_my_taktziv_hotzaot_bafoal_lehodesh_divoach(params) {

    var taktziv_hotzaot_bafoal_lehodesh_divoach = {};

    taktziv_hotzaot_bafoal_lehodesh_divoach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_hotzaot_bafoal_lehodesh_divoach.MyNoPolice = params.my_no_police;
    taktziv_hotzaot_bafoal_lehodesh_divoach.TypeRec = params.type_rec;
    //    taktziv_hotzaot_bafoal_lehodesh_divoach .IdClient = params.id_client;
    

    params.xml_node_name = "SHEUR-DMEI-NIHUL-HAFKADA";
    taktziv_hotzaot_bafoal_lehodesh_divoach.SHEUR_DMEI_NIHUL_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-DMEI-NIHUL-HAFKADA";
    taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-DMEI-NIHUL-TZVIRA";
    taktziv_hotzaot_bafoal_lehodesh_divoach.SHEUR_DMEI_NIHUL_TZVIRA = entities.get_field_val(params);

   

    params.xml_node_name = "TOTAL-DMEI-NIHUL-TZVIRA";
    taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_TZVIRA = entities.get_field_val(params);
    params.xml_node_name = "SACH-DMEI-NIHUL-ACHERIM";
    taktziv_hotzaot_bafoal_lehodesh_divoach.SACH_DMEI_NIHUL_ACHERIM = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-DMEI-NIHUL-POLISA-O-HESHBON";
    taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_POLISA_O_HESHBON = entities.get_field_val(params);

    

    params.xml_node_name = "SACH-DMEI-BITUAH-SHENIGBOO";
    taktziv_hotzaot_bafoal_lehodesh_divoach.SACH_DMEI_BITUAH_SHENIGBOO = entities.get_field_val(params);
    params.xml_node_name = "HOTZOT-NIHUL-ASHKAOT";
    taktziv_hotzaot_bafoal_lehodesh_divoach.HOTZOT_NIHUL_ASHKAOT = entities.get_field_val(params);
    params.xml_node_name = "DEMI-AAVARAT-MASLOL";
    taktziv_hotzaot_bafoal_lehodesh_divoach.DEMI_AAVARAT_MASLOL = entities.get_field_val(params);

  

    params.xml_node_name = "DMEI-NIUL-MENAEL-TIKIM";
    taktziv_hotzaot_bafoal_lehodesh_divoach.DMEI_NIUL_MENAEL_TIKIM = entities.get_field_val(params);
    params.xml_node_name = "OFEN-GEVIAT-DMEI-BITUACH";
    taktziv_hotzaot_bafoal_lehodesh_divoach.OFEN_GEVIAT_DMEI_BITUACH = entities.get_field_val(params);

    return taktziv_hotzaot_bafoal_lehodesh_divoach;
}


module.exports = {
    async extract_taktziv_hotzaot_bafoal_lehodesh_divoach_from_xml(params) {
        try {
            var taktziv_hotzaot_bafoal_lehodesh_divoach = get_my_taktziv_hotzaot_bafoal_lehodesh_divoach(params);
            var data = get_my_taktziv_meshicha_niud(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_hotzaot_bafoal_lehodesh_divoach(params) {
        try {
            var taktziv_hotzaot_bafoal_lehodesh_divoach = get_my_taktziv_hotzaot_bafoal_lehodesh_divoach(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_hotzaot_bafoal_lehodesh_divoach.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_hotzaot_bafoal_lehodesh_divoach.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_hotzaot_bafoal_lehodesh_divoach.TypeRec)

                .input('SHEUR_DMEI_NIHUL_HAFKADA', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.SHEUR_DMEI_NIHUL_HAFKADA)
                .input('TOTAL_DMEI_NIHUL_HAFKADA', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_HAFKADA)
                .input('SHEUR_DMEI_NIHUL_TZVIRA', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.SHEUR_DMEI_NIHUL_TZVIRA)

                .input('TOTAL_DMEI_NIHUL_TZVIRA', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_TZVIRA)
                .input('SACH_DMEI_NIHUL_ACHERIM', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.SACH_DMEI_NIHUL_ACHERIM)
                .input('TOTAL_DMEI_NIHUL_POLISA_O_HESHBON', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.TOTAL_DMEI_NIHUL_POLISA_O_HESHBON)
               

                .input('SACH_DMEI_BITUAH_SHENIGBOO', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.SACH_DMEI_BITUAH_SHENIGBOO)
                .input('HOTZOT_NIHUL_ASHKAOT', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.HOTZOT_NIHUL_ASHKAOT)
                .input('DEMI_AAVARAT_MASLOL', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.DEMI_AAVARAT_MASLOL)
               

                .input('DMEI_NIUL_MENAEL_TIKIM', sql.Float, taktziv_hotzaot_bafoal_lehodesh_divoach.DMEI_NIUL_MENAEL_TIKIM)
                .input('OFEN_GEVIAT_DMEI_BITUACH', sql.Int, taktziv_hotzaot_bafoal_lehodesh_divoach.OFEN_GEVIAT_DMEI_BITUACH)
                
 
                .query(sql_insert_taktziv_hotzaot_bafoal_lehodesh_divoach);


            return " taktziv_hotzaot_bafoal_lehodesh_divoach  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}

