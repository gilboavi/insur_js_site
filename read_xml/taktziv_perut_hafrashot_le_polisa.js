


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_hafrashot_le_polisa = "INSERT INTO [InsurDB].[dbo].[PerutHafrashotLePolisaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " ,SUG_HAMAFKID, SUG_HAFRASHA, ACHUZ_HAFRASHA  "+
  "  , SCHUM_HAFRASHA, TAARICH_MADAD) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
 
    " ,@SUG_HAMAFKID, @SUG_HAFRASHA , @ACHUZ_HAFRASHA  " +
    "  , @SCHUM_HAFRASHA, @TAARICH_MADAD) " 
    ;

function get_my_taktziv_perut_hafrashot_le_polisa(params) {

    var taktziv_perut_hafrashot_le_polisa = {};

    taktziv_perut_hafrashot_le_polisa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_hafrashot_le_polisa.MyNoPolice = params.my_no_police;
    taktziv_perut_hafrashot_le_polisa.TypeRec = params.type_rec;
    //    taktziv_perut_hafrashot_le_polisa.IdClient = params.id_client;
  
     

     params.xml_node_name = "SUG-HAMAFKID";
    taktziv_perut_hafrashot_le_polisa.SUG_HAMAFKID = entities.get_field_val(params);
    params.xml_node_name = "SUG-HAFRASHA";
    taktziv_perut_hafrashot_le_polisa.SUG_HAFRASHA = entities.get_field_val(params);
    params.xml_node_name = "ACHUZ-HAFRASHA";
    taktziv_perut_hafrashot_le_polisa.ACHUZ_HAFRASHA = entities.get_field_val(params);
   
        params.xml_node_name = "SCHUM-HAFRASHA";
    taktziv_perut_hafrashot_le_polisa.SCHUM_HAFRASHA = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-MADAD";
    taktziv_perut_hafrashot_le_polisa.TAARICH_MADAD = entities.get_date_field_val(params);

    

    return taktziv_perut_hafrashot_le_polisa;
}


module.exports = {
    async extract_taktziv_perut_hafrashot_le_polisa_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_hafrashot_le_polisa(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_hafrashot_le_polisa(params) {
        try {
            var taktziv_perut_hafrashot_le_polisa = get_my_taktziv_perut_hafrashot_le_polisa(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, taktziv_perut_hafrashot_le_polisa.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_perut_hafrashot_le_polisa.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_hafrashot_le_polisa.TypeRec)

                .input('SUG_HAMAFKID', sql.Int, taktziv_perut_hafrashot_le_polisa.SUG_HAMAFKID)
                .input('SUG_HAFRASHA', sql.Int, taktziv_perut_hafrashot_le_polisa.SUG_HAFRASHA)
                .input('ACHUZ_HAFRASHA', sql.Float, taktziv_perut_hafrashot_le_polisa.ACHUZ_HAFRASHA)

                .input('SCHUM_HAFRASHA', sql.Float, taktziv_perut_hafrashot_le_polisa.SCHUM_HAFRASHA)
                .input('TAARICH_MADAD', sql.NVarChar, taktziv_perut_hafrashot_le_polisa.TAARICH_MADAD)



                .query(sql_insert_taktziv_perut_hafrashot_le_polisa);


            return " taktziv_perut_hafrashot_le_polisa was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
