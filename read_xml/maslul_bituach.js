var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_maslul_bituach = " INSERT INTO InsurDB.dbo.MaslulBituachDB " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    "  , MASLUL_BITUACH_BAKEREN_PENSIA, SHEM_MASLUL_HABITUAH) " +
    " VALUES " +
    "  (@MyNoPolice ,@KOD_MEZAHE_YATZRAN ,@TypeRec " +
    "  ,@MASLUL_BITUACH_BAKEREN_PENSIA, @SHEM_MASLUL_HABITUAH) ";
    ;

function get_my_maslul_bituach(params) {

    var my_maslul_bituach = {};

    my_maslul_bituach.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    my_maslul_bituach.MyNoPolice = params.my_no_police;
    my_maslul_bituach.TypeRec = params.type_rec;
    //    my_maslul_bituach.IdClient = params.id_client;


    params.xml_node_name = "MASLUL-BITUACH-BAKEREN-PENSIA";
    my_maslul_bituach.MASLUL_BITUACH_BAKEREN_PENSIA = entities.get_field_val(params);

    params.xml_node_name = "SHEM-MASLUL-HABITUAH";
    my_maslul_bituach.SHEM_MASLUL_HABITUAH = entities.get_field_val(params);

   
    return my_maslul_bituach;
}


module.exports = {
    async extract_maslul_bituach_from_xml(params) {
        try {
            var data = get_my_maslul_bituach(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async insert_maslul_bituach(params) {
        try {
            var maslul_bituach = get_my_maslul_bituach(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, maslul_bituach.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, maslul_bituach.MyNoPolice)
                .input('TypeRec', sql.Int, maslul_bituach.TypeRec)
                .input('MASLUL_BITUACH_BAKEREN_PENSIA', sql.NVarChar, maslul_bituach.MASLUL_BITUACH_BAKEREN_PENSIA)
                .input('SHEM_MASLUL_HABITUAH', sql.NVarChar, maslul_bituach.SHEM_MASLUL_HABITUAH)
               
                .query(sql_insert_maslul_bituach);


            return "maslul_bituach was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}