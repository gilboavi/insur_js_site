// taktziv_yitrot

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_yitrot = "INSERT INTO [InsurDB].[dbo].[YitrotDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
   " , TAARICH_ERECH_TZVIROT , Mone) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +


    ", @TAARICH_ERECH_TZVIROT , @Mone) "

    ;

function get_my_taktziv_yitrot(params) {

    var taktziv_yitrot = {};

    taktziv_yitrot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_yitrot.MyNoPolice = params.my_no_police;
    taktziv_yitrot.TypeRec = params.type_rec;
    taktziv_yitrot.Mone = params.mone;
    //    taktziv_yitrot .IdClient = params.id_client;

    params.xml_node_name = "TAARICH-ERECH-TZVIROT";
    taktziv_yitrot.TAARICH_ERECH_TZVIROT = entities.get_date_field_val(params);
   
    return taktziv_yitrot;
}


module.exports = {
    async extract_taktziv_yitrot_from_xml(params) {
        try {
            var data = get_my_taktziv_yitrot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_yitrot(params) {
        try {
            var taktziv_yitrot = get_my_taktziv_yitrot(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_yitrot.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_yitrot.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_yitrot.TypeRec)

                .input('TAARICH_ERECH_TZVIROT', sql.NVarChar, taktziv_yitrot.TAARICH_ERECH_TZVIROT)
                .input('Mone', sql.Int, taktziv_yitrot.Mone)
               

                .query(sql_insert_taktziv_yitrot);


            return " taktziv_yitrot  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


