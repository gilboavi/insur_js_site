


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_hafkada_achrona = "INSERT INTO [InsurDB].[dbo].[PerutHafkadaAchronaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " , KOD_SUG_HAFKADA, SUG_HAFRASHA, SUG_MAFKID "+
   " , SCHUM_HAFKADA_SHESHULAM, CHODESH_SACHAR, SACHAR_BERAMAT_HAFKADA "+
   "  , Serial_PerutPirteiHafkadaAchronaDB) " +

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    " , @KOD_SUG_HAFKADA, @SUG_HAFRASHA, @SUG_MAFKID " +
    " , @SCHUM_HAFKADA_SHESHULAM, @CHODESH_SACHAR, @SACHAR_BERAMAT_HAFKADA " +
    "  , @Serial_PerutPirteiHafkadaAchronaDB) "

    ;

function get_my_taktziv_perut_hafkada_achrona(params) {

    var taktziv_perut_hafkada_achrona  = {};

    taktziv_perut_hafkada_achrona .KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_hafkada_achrona .MyNoPolice = params.my_no_police;
    taktziv_perut_hafkada_achrona .TypeRec = params.type_rec;
    //    taktziv_perut_hafkada_achrona .IdClient = params.id_client;
    taktziv_perut_hafkada_achrona.Serial_PerutPirteiHafkadaAchronaDB = params.mone;

    

     params.xml_node_name = "KOD-SUG-HAFKADA";
    taktziv_perut_hafkada_achrona.KOD_SUG_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "SUG-HAFRASHA";
    taktziv_perut_hafkada_achrona.SUG_HAFRASHA = entities.get_field_val(params);
    params.xml_node_name = "SUG-MAFKID";
    taktziv_perut_hafkada_achrona.SUG_MAFKID = entities.get_field_val(params);

    
    params.xml_node_name = "SCHUM-HAFKADA-SHESHULAM";
    taktziv_perut_hafkada_achrona.SCHUM_HAFKADA_SHESHULAM = entities.get_field_val(params);
    params.xml_node_name = "CHODESH-SACHAR";
    taktziv_perut_hafkada_achrona.CHODESH_SACHAR = entities.get_field_val(params);
    params.xml_node_name = "SACHAR-BERAMAT-HAFKADA";
    taktziv_perut_hafkada_achrona.SACHAR_BERAMAT_HAFKADA = entities.get_field_val(params);

  







    return taktziv_perut_hafkada_achrona ;
}


module.exports = {
    async extract_taktziv_perut_hafkada_achrona_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_hafkada_achrona(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_hafkada_achrona(params) {
        try {
            var taktziv_perut_hafkada_achrona = get_my_taktziv_perut_hafkada_achrona(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_perut_hafkada_achrona .KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_perut_hafkada_achrona .MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_hafkada_achrona .TypeRec)

                .input('KOD_SUG_HAFKADA', sql.Int, taktziv_perut_hafkada_achrona.KOD_SUG_HAFKADA)
                .input('SUG_HAFRASHA', sql.Int, taktziv_perut_hafkada_achrona.SUG_HAFRASHA)
                .input('SUG_MAFKID', sql.Int, taktziv_perut_hafkada_achrona.SUG_MAFKID)

                .input('SCHUM_HAFKADA_SHESHULAM', sql.Float, taktziv_perut_hafkada_achrona.SCHUM_HAFKADA_SHESHULAM)
                .input('CHODESH_SACHAR', sql.NVarChar, taktziv_perut_hafkada_achrona.CHODESH_SACHAR)
                .input('SACHAR_BERAMAT_HAFKADA', sql.Float, taktziv_perut_hafkada_achrona.SUG_MAFKID)

                .input('Serial_PerutPirteiHafkadaAchronaDB', sql.Float, taktziv_perut_hafkada_achrona.Serial_PerutPirteiHafkadaAchronaDB)
            

                .query(sql_insert_taktziv_perut_hafkada_achrona);


            return " taktziv_perut_hafkada_achrona  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
