





var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_hafkadot_shnatiyot = "INSERT INTO [InsurDB].[dbo].[HafkadotShnatiyotDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 " ,TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT "+
 "   , TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT "+
 "   , TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT) " +

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    " ,@TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT " +
    "   , @TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT " +
    "   , @TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT) "

    ;

function get_my_taktziv_hafkadot_shnatiyot(params) {

    var taktziv_hafkadot_shnatiyot = {};

    taktziv_hafkadot_shnatiyot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_hafkadot_shnatiyot.MyNoPolice = params.my_no_police;
    taktziv_hafkadot_shnatiyot.TypeRec = params.type_rec;
    //    taktziv_hafkadot_shnatiyot .IdClient = params.id_client;

    params.xml_node_name = "TOTAL-HAFKADOT-OVED-TAGMULIM-SHANA-NOCHECHIT";
    taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-HAFKADOT-MAAVID-TAGMULIM-SHANA-NOCHECHIT";
    taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-HAFKADOT-PITZUIM-SHANA-NOCHECHIT";
    taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT = entities.get_field_val(params);


    return taktziv_hafkadot_shnatiyot;
}


module.exports = {
    async extract_taktziv_hafkadot_shnatiyot_from_xml(params) {
        try {
            var data = get_my_taktziv_hafkadot_shnatiyot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_hafkadot_shnatiyot(params) {
        try {
            var taktziv_hafkadot_shnatiyot = get_my_taktziv_hafkadot_shnatiyot(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_hafkadot_shnatiyot.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_hafkadot_shnatiyot.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_hafkadot_shnatiyot.TypeRec)

                .input('TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT', sql.Float, taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT)
                .input('TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT', sql.Float, taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT)
                .input('TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT', sql.Float, taktziv_hafkadot_shnatiyot.TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT)

                 .query(sql_insert_taktziv_hafkadot_shnatiyot);


            return " taktziv_hafkadot_shnatiyot  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
