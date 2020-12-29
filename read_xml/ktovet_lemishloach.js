var entities = require('../read_xml/entities');
const sql = require('mssql');
const dbConn = require("../dal/dbConn");

const sql_insert_ktovet_lemishloach = "INSERT INTO [InsurDB].[dbo].[KtovetLemishloachDB] " +
   " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec "+
    "    , ERETZ    , SHEM_YISHUV , SEMEL_YESHUV "+
     "   , SHEM_RECHOV  , MISPAR_BAIT , MISPAR_KNISA "+
     "   , MISPAR_DIRA   , MIKUD  , TA_DOAR) " +
" VALUES "+
"    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec, " +
"   @ERETZ, @SHEM_YISHUV, @SEMEL_YESHUV,  "+
"   @SHEM_RECHOV, @MISPAR_BAIT, @MISPAR_KNISA, "+
"   @MISPAR_DIRA, @MIKUD, @TA_DOAR) "
    ;

function get_my_ktovet_lemishloach(params) {

    var my_ktovet_lemishloach = {};

    my_ktovet_lemishloach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    my_ktovet_lemishloach.MyNoPolice = params.my_no_police;
    my_ktovet_lemishloach.TypeRec = params.type_rec;
//    my_ktovet_lemishloach.IdClient = params.id_client;

 
    params.xml_node_name = "ERETZ";
    my_ktovet_lemishloach.ERETZ = entities.get_field_val(params);

    params.xml_node_name = "SHEM-YESHUV";
    my_ktovet_lemishloach.SHEM_YISHUV = entities.get_field_val(params);

    params.xml_node_name = "SEMEL-YISHUV";
    my_ktovet_lemishloach.SEMEL_YESHUV = entities.get_field_val(params);


    params.xml_node_name = "SHEM-RECHOV";
    my_ktovet_lemishloach.SHEM_RECHOV = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-BAIT";
    my_ktovet_lemishloach.MISPAR_BAIT = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-KNISA";
    my_ktovet_lemishloach.MISPAR_KNISA = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-DIRA";
    my_ktovet_lemishloach.MISPAR_DIRA = entities.get_field_val(params);

    params.xml_node_name = "MIKUD";
    my_ktovet_lemishloach.MIKUD = entities.get_field_val(params);

    params.xml_node_name = "TA-DOAR";
    my_ktovet_lemishloach.TA_DOAR = entities.get_field_val(params);

   

   






    return my_ktovet_lemishloach;
}


module.exports = {

    async extract_ktovet_lemishloach_from_xml(params) {
        try {
            var data = get_my_ktovet_lemishloach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async insert_ktovet_lemishloach(params) {
        try {
            var ktovet_lemishloach = get_my_ktovet_lemishloach(params);
           
            let pool = params.connection
            let result = await pool.request()
                //let result = await dbConn.getPool().request()
               
                .input('KOD_MEZAHE_YATZRAN', sql.Int, ktovet_lemishloach.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, ktovet_lemishloach.MyNoPolice)
                .input('TypeRec', sql.Int, ktovet_lemishloach.TypeRec)
                .input('ERETZ', sql.NVarChar, ktovet_lemishloach.ERETZ)
                .input('SHEM_YISHUV', sql.NVarChar, ktovet_lemishloach.SHEM_YISHUV)
                .input('SEMEL_YESHUV', sql.Int, ktovet_lemishloach.SEMEL_YESHUV)
                .input('SHEM_RECHOV', sql.NVarChar, ktovet_lemishloach.SHEM_RECHOV)
                .input('MISPAR_BAIT', sql.NVarChar, ktovet_lemishloach.MISPAR_BAIT)
                .input('MISPAR_KNISA', sql.NVarChar, ktovet_lemishloach.MISPAR_KNISA)
                .input('MISPAR_DIRA', sql.Int, ktovet_lemishloach.MISPAR_DIRA)
                .input('MIKUD', sql.Int, ktovet_lemishloach.MIKUD)
                .input('TA_DOAR', sql.Int, ktovet_lemishloach.TA_DOAR)
              




                .query(sql_insert_ktovet_lemishloach);


            return " ktovet_lemishloach was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}