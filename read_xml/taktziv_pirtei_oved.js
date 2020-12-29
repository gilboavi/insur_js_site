
var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_pirtei_oved = "INSERT INTO [InsurDB].[dbo].[PirteiOvedDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
  " ,SUG_TOCHNIT_O_CHESHBON, MPR_MAASIK_BE_YATZRAN, STATUS_MAASIK  "+
  "  , SUG_BAAL_HAPOLISA_SHE_EINO_HAMEVUTACH, MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH " +
  "  , SHEM_BAAL_POLISA_SHEEINO_MEVUTAH) "+
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    " ,@SUG_TOCHNIT_O_CHESHBON , @MPR_MAASIK_BE_YATZRAN, @STATUS_MAASIK  " +
    "  , @SUG_BAAL_HAPOLISA_SHE_EINO_HAMEVUTACH ,  @MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH " +
    "  , @SHEM_BAAL_POLISA_SHEEINO_MEVUTAH) "
    ;

function get_my_taktziv_pirtei_oved(params) {

    var taktziv_pirtei_oved = {};

    taktziv_pirtei_oved.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_pirtei_oved.MyNoPolice = params.my_no_police;
    taktziv_pirtei_oved.TypeRec = params.type_rec;
    //    taktziv_pirtei_oved.IdClient = params.id_client;

  

    params.xml_node_name = "SUG-TOCHNIT-O-CHESHBON";
    taktziv_pirtei_oved.SUG_TOCHNIT_O_CHESHBON = entities.get_field_val(params);
    params.xml_node_name = "MPR-MAASIK-BE-YATZRAN";
    taktziv_pirtei_oved.MPR_MAASIK_BE_YATZRAN = entities.get_field_val(params);
    params.xml_node_name = "STATUS-MAASIK";
    taktziv_pirtei_oved.STATUS_MAASIK = entities.get_field_val(params);
 
        params.xml_node_name = "SUG-BAAL-HAPOLISA-SHE-EINO-HAMEVUTACH";
    taktziv_pirtei_oved.SUG_BAAL_HAPOLISA_SHE_EINO_HAMEVUTACH = entities.get_field_val(params);
    params.xml_node_name = "MISPAR-BAAL-POLISA-SHEEINO-MEVUTAH";
    taktziv_pirtei_oved.MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH = entities.get_field_val(params);

    params.xml_node_name = "SHEM-BAAL-POLISA-SHEEINO-MEVUTAH";
    taktziv_pirtei_oved.SHEM_BAAL_POLISA_SHEEINO_MEVUTAH = entities.get_field_val(params);




    return taktziv_pirtei_oved;
}


module.exports = {
    async extract_taktziv_pirtei_oved_from_xml(params) {
        try {
            var data = get_my_taktziv_pirtei_oved(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_pirtei_oved(params) {
        try {
            var taktziv_pirtei_oved = get_my_taktziv_pirtei_oved(params);

            let pool = params.connection
            let result = await pool.request()

                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_pirtei_oved.KOD_MEZAHE_YATZRAN)
                .input('MyNoPolice', sql.NVarChar, taktziv_pirtei_oved.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_pirtei_oved.TypeRec)

                .input('SUG_TOCHNIT_O_CHESHBON', sql.Int, taktziv_pirtei_oved.SUG_TOCHNIT_O_CHESHBON)
                .input('MPR_MAASIK_BE_YATZRAN', sql.NVarChar, taktziv_pirtei_oved.MPR_MAASIK_BE_YATZRAN)
                .input('STATUS_MAASIK', sql.Int, taktziv_pirtei_oved.STATUS_MAASIK)

                .input('SUG_BAAL_HAPOLISA_SHE_EINO_HAMEVUTACH', sql.Int, taktziv_pirtei_oved.SUG_BAAL_HAPOLISA_SHE_EINO_HAMEVUTACH)
                .input('MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH', sql.NVarChar, taktziv_pirtei_oved.MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH)
                .input('SHEM_BAAL_POLISA_SHEEINO_MEVUTAH', sql.NVarChar, taktziv_pirtei_oved.SHEM_BAAL_POLISA_SHEEINO_MEVUTAH)

               


                .query(sql_insert_taktziv_pirtei_oved);


            return " taktziv_pirtei_oved was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}