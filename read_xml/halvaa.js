var entities = require('../read_xml/entities');
const sql = require('mssql');
const dbConn = require("../dal/dbConn");

const sql_insert_halvaa = "INSERT INTO [InsurDB].[dbo].[HalvaaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 " ,YESH_HALVAA_BAMUTZAR , MISDAR_SIDURI_SHEL_HAHALVAA  , SCHUM_HALVAA "+
 "   , TAARICH_KABALAT_HALVAA , TAARICH_SIYUM_HALVAA  , YITRAT_HALVAA "+
  "  , TKUFAT_HALVAA , RIBIT    , SUG_RIBIT " +
  "  , SUG_HATZNMADA  , TADIRUT_HECHZER_HALVAA     , SUG_HECHZER  "+
  "  , SCHUM_HECHZER_TKUFATI   , RAMAT_HALVAA)  "+
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec " +
    " ,@YESH_HALVAA_BAMUTZAR , @MISDAR_SIDURI_SHEL_HAHALVAA  , @SCHUM_HALVAA " +
    "   , @TAARICH_KABALAT_HALVAA , @TAARICH_SIYUM_HALVAA  , @YITRAT_HALVAA " +
    "  , @TKUFAT_HALVAA , @RIBIT    , @SUG_RIBIT " +
    "  , @SUG_HATZNMADA  , @TADIRUT_HECHZER_HALVAA     , @SUG_HECHZER  " +
    "  , @SCHUM_HECHZER_TKUFATI   , @RAMAT_HALVAA)  "
    ;

function get_my_halvaa(params) {

    var halvaa = {};

    halvaa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    halvaa.MyNoPolice = params.my_no_police;
    halvaa.TypeRec = params.type_rec;
    //    halvaa.IdClient = params.id_client;
   
       

    params.xml_node_name = "YESH-HALVAA-BAMUTZAR";
    halvaa.YESH_HALVAA_BAMUTZAR = entities.get_field_val(params);
    params.xml_node_name = "MISDAR-SIDURI-SHEL-HAHALVAA";
    halvaa.MISDAR_SIDURI_SHEL_HAHALVAA = entities.get_field_val(params);
    params.xml_node_name = "SCHUM-HALVAA";
    halvaa.SCHUM_HALVAA = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-KABALAT-HALVAA";
    halvaa.TAARICH_KABALAT_HALVAA = entities.get_date_field_val(params);
    params.xml_node_name = "TAARICH-SIYUM-HALVAA";
    halvaa.TAARICH_SIYUM_HALVAA = entities.get_date_field_val(params);
    params.xml_node_name = "YITRAT-HALVAA";
    halvaa.YITRAT_HALVAA = entities.get_field_val(params);

    params.xml_node_name = "TKUFAT-HALVAA";
    halvaa.TKUFAT_HALVAA = entities.get_date_field_val(params);
    params.xml_node_name = "RIBIT";
    halvaa.RIBIT = entities.get_date_field_val(params);
    params.xml_node_name = "SUG-RIBIT";
    halvaa.SUG_RIBIT = entities.get_date_field_val(params);

    params.xml_node_name = "SUG-HATZNMADA";
    halvaa.SUG_HATZNMADA = entities.get_date_field_val(params);
    params.xml_node_name = "TADIRUT-HECHZER-HALVAA";
    halvaa.TADIRUT_HECHZER_HALVAA = entities.get_date_field_val(params);
    params.xml_node_name = "SUG-HECHZER";
    halvaa.SUG_HECHZER = entities.get_date_field_val(params);
    
    params.xml_node_name = "SCHUM-HECHZER-TKUFATI";
    halvaa.SCHUM_HECHZER_TKUFATI = entities.get_date_field_val(params);
    params.xml_node_name = "RAMAT-HALVAA";
    halvaa.RAMAT_HALVAA = entities.get_date_field_val(params);



    return halvaa;
}


module.exports = {
    async extract_halvaa_from_xml(params) {
        try {
            var data = get_my_halvaa(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_halvaa(params) {
        try {
            var halvaa = get_my_halvaa(params);

            // let pool = params.connection
            // let result = await pool.request()
            let result = await dbConn.getPool().request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, halvaa.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, halvaa.MyNoPolice)
                .input('TypeRec', sql.Int, halvaa.TypeRec)

                .input('YESH_HALVAA_BAMUTZAR', sql.Int, halvaa.YESH_HALVAA_BAMUTZAR)
                .input('MISDAR_SIDURI_SHEL_HAHALVAA', sql.NVarChar, halvaa.MISDAR_SIDURI_SHEL_HAHALVAA)
                .input('SCHUM_HALVAA', sql.Float, halvaa.SCHUM_HALVAA)

                .input('TAARICH_KABALAT_HALVAA', sql.NVarChar, halvaa.TAARICH_KABALAT_HALVAA)
                .input('TAARICH_SIYUM_HALVAA', sql.NVarChar, halvaa.TAARICH_SIYUM_HALVAA)
                .input('YITRAT_HALVAA', sql.Float, halvaa.YITRAT_HALVAA)
            
                .input('TKUFAT_HALVAA', sql.Int, halvaa.TKUFAT_HALVAA)
                .input('RIBIT', sql.Float, halvaa.RIBIT)
                .input('SUG_RIBIT', sql.Int, halvaa.SUG_RIBIT)

                .input('SUG_HATZNMADA', sql.Int, halvaa.SUG_HATZNMADA)
                .input('TADIRUT_HECHZER_HALVAA', sql.Int, halvaa.TADIRUT_HECHZER_HALVAA)
                .input('SUG_HECHZER', sql.Int, halvaa.SUG_HECHZER)

                .input('SCHUM_HECHZER_TKUFATI', sql.Float, halvaa.SCHUM_HECHZER_TKUFATI)
                .input('RAMAT_HALVAA', sql.Int, halvaa.RAMAT_HALVAA)



                .query(sql_insert_halvaa);


            return " halvaa was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}