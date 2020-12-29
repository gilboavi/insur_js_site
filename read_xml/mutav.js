// mutav



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_mutav = "INSERT INTO [InsurDB].[dbo].[MutavDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  " ,SUG_ZIHUY_MUTAV    , KOD_ZIHUY_MUTAV    , MISPAR_ZIHUY_MUTAV "+
 "   , SHEM_PRATI_MUTAV    , SHEM_MISHPACHA_MUTAV    , SUG_ZIKA "+
 "   , ACHUZ_MUTAV    , HAGDARAT_MUTAV    , MAHUT_MUTAV) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
   
    " ,@SUG_ZIHUY_MUTAV    , @KOD_ZIHUY_MUTAV    , @MISPAR_ZIHUY_MUTAV " +
    "   , @SHEM_PRATI_MUTAV    , @SHEM_MISHPACHA_MUTAV    , @SUG_ZIKA " +
    "   , @ACHUZ_MUTAV    , @HAGDARAT_MUTAV    , @MAHUT_MUTAV) "

    ;

function get_my_mutav(params) {

    var mutav = {};

    mutav.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    mutav.MyNoPolice = params.my_no_police;
    mutav.TypeRec = params.type_rec;

    //    mutav .IdClient = params.id_client;

   
   params.xml_node_name = "SUG-ZIHUY-MUTAV";
    mutav.SUG_ZIHUY_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "KOD-ZIHUY-MUTAV";
    mutav.KOD_ZIHUY_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-ZIHUY-MUTAV";
    mutav.MISPAR_ZIHUY_MUTAV = entities.get_field_val(params);

   

     params.xml_node_name = "SHEM-PRATI-MUTAV";
    mutav.SHEM_PRATI_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "SHEM-MISHPACHA-MUTAV";
    mutav.SHEM_MISHPACHA_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "SUG-ZIKA";
    mutav.SUG_ZIKA = entities.get_field_val(params);

   

    params.xml_node_name = "ACHUZ-MUTAV";
    mutav.ACHUZ_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "HAGDARAT-MUTAV";
    mutav.HAGDARAT_MUTAV = entities.get_field_val(params);
    params.xml_node_name = "MAHUT-MUTAV";
    mutav.MAHUT_MUTAV = entities.get_field_val(params);

    return mutav;
}


module.exports = {
    async extract_tmutav_from_xml(params) {
        try {
            var data = get_my_mutav(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_mutav(params) {
        try {
            var mutav = get_my_mutav(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, mutav.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, mutav.MyNoPolice)
                .input('TypeRec', sql.Int, mutav.TypeRec)
                .input('MoneYitra', sql.Int, mutav.MoneYitra)



                .input('SUG_ZIHUY_MUTAV', sql.Int, mutav.SUG_ZIHUY_MUTAV)
                .input('KOD_ZIHUY_MUTAV', sql.Int, mutav.KOD_ZIHUY_MUTAV)
                .input('MISPAR_ZIHUY_MUTAV', sql.NVarChar, mutav.MISPAR_ZIHUY_MUTAV)

            
                .input('SHEM_PRATI_MUTAV', sql.NVarChar, mutav.SHEM_PRATI_MUTAV)
                .input('SHEM_MISHPACHA_MUTAV', sql.NVarChar, mutav.SHEM_MISHPACHA_MUTAV)
                .input('SUG_ZIKA', sql.Int, mutav.SUG_ZIKA)

              
                .input('ACHUZ_MUTAV', sql.Float, mutav.ACHUZ_MUTAV)
                .input('HAGDARAT_MUTAV', sql.Int, mutav.HAGDARAT_MUTAV)
                .input('MAHUT_MUTAV', sql.Int, mutav.MAHUT_MUTAV)




                .query(sql_insert_mutav);


            return " mutav  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}



