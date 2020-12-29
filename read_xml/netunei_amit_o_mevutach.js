var entities = require('../read_xml/entities');
const sql = require('mssql');
const dbConn = require("../dal/dbConn");

const sql_insert_netunei_amit_o_mevutach = "INSERT INTO [InsurDB].[dbo].[NetuneiAmitOmevutachDB] " +
    " (MyNoPolice  , KOD_MEZAHE_YATZRAN  , TypeRec " +
    "    , KOD_ZIHUY_LAKOACH    , MISPAR_ZIHUY ) " +
    " VALUES " +
    "    (@MyNoPolice, @KOD_MEZAHE_YATZRAN ,@TypeRec, " +
    "   @KOD_ZIHUY_LAKOACH, @MISPAR_ZIHUY ) "
    ;

function get_my_netunei_amit_o_mevutach(params) {

    var my_netunei_amit_o_mevutach = {};

    my_netunei_amit_o_mevutach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    my_netunei_amit_o_mevutach.MyNoPolice = params.my_no_police;
    my_netunei_amit_o_mevutach.TypeRec = params.type_rec;
    //    my_netunei_amit_o_mevutach.IdClient = params.id_client;


    params.xml_node_name = "KOD-ZIHUY-LAKOACH";
    my_netunei_amit_o_mevutach.KOD_ZIHUY_LAKOACH = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-ZIHUY";
    my_netunei_amit_o_mevutach.MISPAR_ZIHUY = entities.get_field_val(params);

  
    

    return my_netunei_amit_o_mevutach;
}


module.exports = {

    async extract_netunei_amit_o_mevutach_from_xml(params) {
        try {
            var data = get_my_netunei_amit_o_mevutach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_netunei_amit_o_mevutach(params) {
        try {
            var netunei_amit_o_mevutach = get_my_netunei_amit_o_mevutach(params);

            let pool = params.connection
            let result = await pool.request()
              // let result = await dbConn.getPool().request()
                .input('KOD_MEZAHE_YATZRAN', sql.Int, netunei_amit_o_mevutach.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, netunei_amit_o_mevutach.MyNoPolice)
                .input('TypeRec', sql.Int, netunei_amit_o_mevutach.TypeRec)
                .input('KOD_ZIHUY_LAKOACH', sql.Int, netunei_amit_o_mevutach.KOD_ZIHUY_LAKOACH)
                .input('MISPAR_ZIHUY', sql.NVarChar, netunei_amit_o_mevutach.MISPAR_ZIHUY)
               
                .query(sql_insert_netunei_amit_o_mevutach);


            return " netunei_amit_o_mevutach was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}