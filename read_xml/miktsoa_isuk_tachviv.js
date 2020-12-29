// miktsoa_isuk_tachviv



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_miktsoa_isuk_tachviv = "INSERT INTO [InsurDB].[dbo].[MiktsoaIsukTachvivDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  "  ,TACHVIVIM_O_ISUKIM    , KOD_MIKTZOA     , TCHUM_ISUK_CHADASH) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  " +
    "  ,@TACHVIVIM_O_ISUKIM    , @KOD_MIKTZOA     , @TCHUM_ISUK_CHADASH) "

    ;

function get_my_miktsoa_isuk_tachviv(params) {

    var miktsoa_isuk_tachviv = {};

    miktsoa_isuk_tachviv.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    miktsoa_isuk_tachviv.MyNoPolice = params.my_no_police;
    miktsoa_isuk_tachviv.TypeRec = params.type_rec;

    //    miktsoa_isuk_tachviv .IdClient = params.id_client;
   

     params.xml_node_name = "TACHVIVIM-O-ISUKIM";
    miktsoa_isuk_tachviv.TACHVIVIM_O_ISUKIM = entities.get_field_val(params);
    params.xml_node_name = "KOD-MIKTZOA";
    miktsoa_isuk_tachviv.KOD_MIKTZOA = entities.get_field_val(params);
    params.xml_node_name = "TCHUM-ISUK-CHADASH";
    miktsoa_isuk_tachviv.TCHUM_ISUK_CHADASH = entities.get_field_val(params);



    return miktsoa_isuk_tachviv;
}


module.exports = {
    async extract_miktsoa_isuk_tachviv_from_xml(params) {
        try {
            var data = get_my_miktsoa_isuk_tachviv(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_miktsoa_isuk_tachviv(params) {
        try {
            var miktsoa_isuk_tachviv = get_my_miktsoa_isuk_tachviv(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, miktsoa_isuk_tachviv.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, miktsoa_isuk_tachviv.MyNoPolice)
                .input('TypeRec', sql.Int, miktsoa_isuk_tachviv.TypeRec)
                .input('MoneYitra', sql.Int, miktsoa_isuk_tachviv.MoneYitra)



                .input('TACHVIVIM_O_ISUKIM', sql.NVarChar, miktsoa_isuk_tachviv.TACHVIVIM_O_ISUKIM)
                .input('KOD_MIKTZOA', sql.NVarChar, miktsoa_isuk_tachviv.KOD_MIKTZOA)
                .input('TCHUM_ISUK_CHADASH', sql.NVarChar, miktsoa_isuk_tachviv.TCHUM_ISUK_CHADASH)




                .query(sql_insert_miktsoa_isuk_tachviv);


            return " miktsoa_isuk_tachviv  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}



