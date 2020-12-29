
var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_netunei_gvia = "INSERT INTO [InsurDB].[dbo].[NetuneiGviaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " ,SHEM_MESHALEM, SUG_TEUDA_MESHALEM, MISPAR_ZIHUY_MESHALEM "+
   " , KOD_EMTZAEI_TASHLUM, TADIRUT_TASHLUM, CHODESH_YECHUS "+
  "  , YOM_GVIYA_BECHODESH, OFEN_HATZMADAT_GVIA, ACHUZ_TAT_SHNATIYOT) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +

    " , @SHEM_MESHALEM , @SUG_TEUDA_MESHALEM , @MISPAR_ZIHUY_MESHALEM " +
    " , @KOD_EMTZAEI_TASHLUM , @TADIRUT_TASHLUM , @CHODESH_YECHUS " +
    "  , @YOM_GVIYA_BECHODESH , @OFEN_HATZMADAT_GVIA , @ACHUZ_TAT_SHNATIYOT) " 
    ;

function get_my_taktziv_netunei_gvia(params) {

    var taktziv_netunei_gvia = {};

    taktziv_netunei_gvia.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_netunei_gvia.MyNoPolice = params.my_no_police;
    taktziv_netunei_gvia.TypeRec = params.type_rec;
    //    taktziv_netunei_gvia.IdClient = params.id_client;
    

    params.xml_node_name = "SHEM-MESHALEM";
    taktziv_netunei_gvia.SHEM_MESHALEM = entities.get_field_val(params);
    params.xml_node_name = "SUG-TEUDA-MESHALEM";
    taktziv_netunei_gvia.SUG_TEUDA_MESHALEM = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-ZIHUY-MESHALEM";
    taktziv_netunei_gvia.MISPAR_ZIHUY_MESHALEM = entities.get_field_val(params);
   

    params.xml_node_name = "KOD-EMTZAEI-TASHLUM";
    taktziv_netunei_gvia.KOD_EMTZAEI_TASHLUM = entities.get_field_val(params);
    params.xml_node_name = "TADIRUT-TASHLUM";
    taktziv_netunei_gvia.TADIRUT_TASHLUM = entities.get_field_val(params);
    params.xml_node_name = "CHODESH-YECHUS";
    taktziv_netunei_gvia.CHODESH_YECHUS = entities.get_field_val(params);
 

    params.xml_node_name = "YOM-GVIYA-BECHODESH";
    taktziv_netunei_gvia.YOM_GVIYA_BECHODESH = entities.get_field_val(params);
    params.xml_node_name = "OFEN-HATZMADAT-GVIA";
    taktziv_netunei_gvia.OFEN_HATZMADAT_GVIA = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-TAT-SHNATIYOT";
    taktziv_netunei_gvia.ACHUZ_TAT_SHNATIYOT = entities.get_field_val(params);

   


    return taktziv_netunei_gvia;
}


module.exports = {
    async insert_taktziv_netunei_gvia(params) {
        try {
            var taktziv_netunei_gvia = get_my_taktziv_netunei_gvia(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, taktziv_netunei_gvia.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_netunei_gvia.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_netunei_gvia.TypeRec)

                .input('SHEM_MESHALEM', sql.NVarChar, taktziv_netunei_gvia.SHEM_MESHALEM)
                .input('SUG_TEUDA_MESHALEM', sql.Int, taktziv_netunei_gvia.SUG_TEUDA_MESHALEM)
                .input('MISPAR_ZIHUY_MESHALEM', sql.NVarChar, taktziv_netunei_gvia.MISPAR_ZIHUY_MESHALEM)

                .input('KOD_EMTZAEI_TASHLUM', sql.Int, taktziv_netunei_gvia.KOD_EMTZAEI_TASHLUM)
                .input('TADIRUT_TASHLUM', sql.Int, taktziv_netunei_gvia.TADIRUT_TASHLUM)
                .input('CHODESH_YECHUS', sql.Int, taktziv_netunei_gvia.CHODESH_YECHUS)

                .input('YOM_GVIYA_BECHODESH', sql.Int, taktziv_netunei_gvia.YOM_GVIYA_BECHODESH)
                .input('OFEN_HATZMADAT_GVIA', sql.Int, taktziv_netunei_gvia.OFEN_HATZMADAT_GVIA)
                .input('ACHUZ_TAT_SHNATIYOT', sql.Float, taktziv_netunei_gvia.ACHUZ_TAT_SHNATIYOT)

              


                .query(sql_insert_taktziv_netunei_gvia);


            return " taktziv_netunei_gvia was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
