
var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_meshicha_niud = "INSERT INTO [InsurDB].[dbo].[MeshichaNiudDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  " ,KOD_SUG_PEULA  , RACHIV_NIMSHACH_NUYAD  , SCHOOM_MESHICHA_NIUD "+
   " , TAARICH_BIZOA , TAARICH_ERECH  , KNAS_MESHICHA_NIUD) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    " ,@KOD_SUG_PEULA  , @RACHIV_NIMSHACH_NUYAD  , @SCHOOM_MESHICHA_NIUD " +
    " , @TAARICH_BIZOA , @TAARICH_ERECH  , @KNAS_MESHICHA_NIUD) "

    ;

function get_my_taktziv_meshicha_niud(params) {

    var taktziv_meshicha_niud = {};

    taktziv_meshicha_niud.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_meshicha_niud.MyNoPolice = params.my_no_police;
    taktziv_meshicha_niud.TypeRec = params.type_rec;
    //    taktziv_meshicha_niud .IdClient = params.id_client;
  

    params.xml_node_name = "KOD-SUG-PEULA";
    taktziv_meshicha_niud.KOD_SUG_PEULA = entities.get_field_val(params);
    params.xml_node_name = "RACHIV-NIMSHACH-NUYAD";
    taktziv_meshicha_niud.RACHIV_NIMSHACH_NUYAD = entities.get_field_val(params);
    params.xml_node_name = "SCHOOM-MESHICHA-NIUD";
    taktziv_meshicha_niud.SCHOOM_MESHICHA_NIUD = entities.get_field_val(params);

    

    params.xml_node_name = "TAARICH-BIZOA";
    taktziv_meshicha_niud.TAARICH_BIZOA = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-ERECH";
    taktziv_meshicha_niud.TAARICH_ERECH = entities.get_date_field_val(params);
    params.xml_node_name = "KNAS-MESHICHA-NIUD";
    taktziv_meshicha_niud.KNAS_MESHICHA_NIUD = entities.get_field_val(params);

    return taktziv_meshicha_niud;
}


module.exports = {
    async extract_taktziv_meshicha_niud_from_xml(params) {
        try {
            var data = get_my_taktziv_meshicha_niud(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_meshicha_niud(params) {
        try {
            var taktziv_meshicha_niud = get_my_taktziv_meshicha_niud(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_meshicha_niud.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_meshicha_niud.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_meshicha_niud.TypeRec)

                .input('KOD_SUG_PEULA', sql.Int, taktziv_meshicha_niud.KOD_SUG_PEULA)
                .input('RACHIV_NIMSHACH_NUYAD', sql.Int, taktziv_meshicha_niud.RACHIV_NIMSHACH_NUYAD)
                .input('SCHOOM_MESHICHA_NIUD', sql.Float, taktziv_meshicha_niud.SCHOOM_MESHICHA_NIUD)

                .input('TAARICH_BIZOA', sql.NVarChar, taktziv_meshicha_niud.TAARICH_BIZOA)
                .input('TAARICH_ERECH', sql.NVarChar, taktziv_meshicha_niud.TAARICH_ERECH)
                .input('KNAS_MESHICHA_NIUD', sql.Float, taktziv_meshicha_niud.KNAS_MESHICHA_NIUD)
                .query(sql_insert_taktziv_meshicha_niud);


            return " taktziv_meshicha_niud  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}

