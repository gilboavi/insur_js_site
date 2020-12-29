

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_pirtei_hafkada_achrona = "INSERT INTO [InsurDB].[dbo].[PerutPirteiHafkadaAchronaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    ", TAARICH_HAFKADA_ACHARON, TOTAL_HAFKADA, TAARICH_ERECH_HAFKADA "+
   "  , SUG_HAFKADA, TOTAL_HAFKADA_ACHRONA, HAFKADA_LEHISCHON_A "+
   "  , HAFKADA_LEHISCHON_B, SerialStr) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    ", @TAARICH_HAFKADA_ACHARON , @TOTAL_HAFKADA , @TAARICH_ERECH_HAFKADA " +
    "  , @SUG_HAFKADA , @TOTAL_HAFKADA_ACHRONA , @HAFKADA_LEHISCHON_A " +
    "  , @HAFKADA_LEHISCHON_B, @SerialStr) "
   
    ;

function get_my_taktziv_pirtei_hafkada_achrona(params) {

    var taktziv_pirtei_hafkada_achrona = {};

    taktziv_pirtei_hafkada_achrona.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_pirtei_hafkada_achrona.MyNoPolice = params.my_no_police;
    taktziv_pirtei_hafkada_achrona.TypeRec = params.type_rec;
    //    taktziv_pirtei_hafkada_achrona.IdClient = params.id_client;
    taktziv_pirtei_hafkada_achrona.SerialStr = params.mone;

    params.xml_node_name = "TAARICH-HAFKADA-ACHARON";
    taktziv_pirtei_hafkada_achrona.TAARICH_HAFKADA_ACHARON = entities.get_date_field_val(params);
    params.xml_node_name = "TOTAL-HAFKADA";
    taktziv_pirtei_hafkada_achrona.TOTAL_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-ERECH-HAFKADA";
    taktziv_pirtei_hafkada_achrona.TAARICH_ERECH_HAFKADA = entities.get_date_field_val(params);

  
    params.xml_node_name = "SUG-HAFKADA";
    taktziv_pirtei_hafkada_achrona.SUG_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-HAFKADA-ACHRONA";
    taktziv_pirtei_hafkada_achrona.TOTAL_HAFKADA_ACHRONA = entities.get_field_val(params);
    params.xml_node_name = "HAFKADA-LEHISCHON-A";
    taktziv_pirtei_hafkada_achrona.HAFKADA_LEHISCHON_A = entities.get_field_val(params);

  
    params.xml_node_name = "HAFKADA-LEHISCHON-B";
    taktziv_pirtei_hafkada_achrona.HAFKADA_LEHISCHON_B = entities.get_field_val(params);
    
  
   




    return taktziv_pirtei_hafkada_achrona;
}


module.exports = {
    async extract_taktziv_pirtei_hafkada_achrona_from_xml(params) {
        try {
            var data = get_my_taktziv_pirtei_hafkada_achrona(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_pirtei_hafkada_achrona(params) {
        try {
            var taktziv_pirtei_hafkada_achrona = get_my_taktziv_pirtei_hafkada_achrona(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, taktziv_pirtei_hafkada_achrona.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_pirtei_hafkada_achrona.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_pirtei_hafkada_achrona.TypeRec)
            
                .input('TAARICH_HAFKADA_ACHARON', sql.NVarChar, taktziv_pirtei_hafkada_achrona.TAARICH_HAFKADA_ACHARON)
                    .input('TOTAL_HAFKADA', sql.Float, taktziv_pirtei_hafkada_achrona.TOTAL_HAFKADA)
                .input('TAARICH_ERECH_HAFKADA', sql.NVarChar, taktziv_pirtei_hafkada_achrona.HAFKADA_LEHISCHON_A)

                .input('SUG_HAFKADA', sql.Int, taktziv_pirtei_hafkada_achrona.SUG_HAFKADA)
                .input('TOTAL_HAFKADA_ACHRONA', sql.Float, taktziv_pirtei_hafkada_achrona.TOTAL_HAFKADA_ACHRONA)
                .input('HAFKADA_LEHISCHON_A', sql.Float, taktziv_pirtei_hafkada_achrona.HAFKADA_LEHISCHON_A)

                .input('HAFKADA_LEHISCHON_B', sql.Float, taktziv_pirtei_hafkada_achrona.HAFKADA_LEHISCHON_B)
                .input('SerialStr', sql.NVarChar, taktziv_pirtei_hafkada_achrona.SerialStr)
               



                .query(sql_insert_taktziv_pirtei_hafkada_achrona);


            return " taktziv_pirtei_hafkada_achrona was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
