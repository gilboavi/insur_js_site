

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_perut_shiabud_ikul = " INSERT INTO InsurDB.dbo.PerutShiabudIkulDB " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
    "  , HUTAL_SHIABUD, HUTAL_IKUL) " +
    " VALUES " +
    "  (@MyNoPolice ,@KOD_MEZAHE_YATZRAN ,@TypeRec " +
    "  ,@HUTAL_SHIABUD, @HUTAL_IKUL) ";
;

function get_my_perut_shiabud_ikul(params) {

    var my_perut_shiabud_ikul = {};

    my_perut_shiabud_ikul.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    my_perut_shiabud_ikul.MyNoPolice = params.my_no_police;
    my_perut_shiabud_ikul.TypeRec = params.type_rec;
    //    my_perut_shiabud_ikul.IdClient = params.id_client;


    params.xml_node_name = "HUTAL-SHIABUD";
    my_perut_shiabud_ikul.HUTAL_SHIABUD = entities.get_field_val(params);

    params.xml_node_name = "HUTAL-IKUL";
    my_perut_shiabud_ikul.HUTAL_IKUL = entities.get_field_val(params);


    return my_perut_shiabud_ikul;
}


module.exports = {
    async extract_perut_shiabud_ikul_from_xml(params) {
        try {
            var data = get_my_perut_shiabud_ikul(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_perut_shiabud_ikul(params) {
        try {
            var perut_shiabud_ikul = get_my_perut_shiabud_ikul(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.Int, perut_shiabud_ikul.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, perut_shiabud_ikul.MyNoPolice)
                .input('TypeRec', sql.Int, perut_shiabud_ikul.TypeRec)
                .input('HUTAL_SHIABUD', sql.Int, perut_shiabud_ikul.HUTAL_SHIABUD)
                .input('HUTAL_IKUL', sql.Int, perut_shiabud_ikul.HUTAL_IKUL)

                .query(sql_insert_perut_shiabud_ikul);


            return "perut_shiabud_ikul was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}
