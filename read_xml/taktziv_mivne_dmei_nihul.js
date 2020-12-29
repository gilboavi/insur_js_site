



var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_mivne_dmei_nihul = "INSERT INTO [InsurDB].[dbo].[PerutMivneDmeiNihulDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec " +
 "  ,GOVA_DMEI_NIHUL_NIKBA_AL_PI_HOTZAOT_BAPOAL    , SUG_HOTZAA    , KOD_MASLUL_DMEI_NIHUL "+
"  , MEAFYENEI_MASLUL_DMEI_NIHUL    , SHEUR_DMEI_NIHUL    "+
"  , DMEI_NIHUL_ACHIDIM    , KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM    , OFEN_HAFRASHA "+
"  , SCHUM_MAX_DNHL_HAFKADA    , SACH_DMEI_NIHUL_MASLUL    , DMEI_NIHUL_ACHERIM "+
"    , KAYEMET_HATAVA    , TAARICH_IDKUN_SHEUR_DNHL    , KENAS_MESHICHAT_KESAFIM "+
"    , SUG_HATAVA    , ACHOZ_HATAVA    , TAARICH_SIUM_HATAVA) "+

    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec " +
    "  ,@GOVA_DMEI_NIHUL_NIKBA_AL_PI_HOTZAOT_BAPOAL    , @SUG_HOTZAA    , @KOD_MASLUL_DMEI_NIHUL " +
    "  , @MEAFYENEI_MASLUL_DMEI_NIHUL    , @SHEUR_DMEI_NIHUL    " +
    "  , @DMEI_NIHUL_ACHIDIM    , @KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM    , @OFEN_HAFRASHA " +
    "  , @SCHUM_MAX_DNHL_HAFKADA    , @SACH_DMEI_NIHUL_MASLUL    , @DMEI_NIHUL_ACHERIM " +
    "    , @KAYEMET_HATAVA    , @TAARICH_IDKUN_SHEUR_DNHL    , @KENAS_MESHICHAT_KESAFIM " +
    "    , @SUG_HATAVA    ,@ACHOZ_HATAVA    , @TAARICH_SIUM_HATAVA) " 

    ;

function get_my_taktziv_mivne_dmei_nihul(params) {

    var taktziv_mivne_dmei_nihul = {};

    taktziv_mivne_dmei_nihul.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_mivne_dmei_nihul.MyNoPolice = params.my_no_police;
    taktziv_mivne_dmei_nihul.TypeRec = params.type_rec;
    //    taktziv_mivne_dmei_nihul .IdClient = params.id_client;
     

    params.xml_node_name = "GOVA-DMEI-NIHUL-NIKBA-AL-PI-HOTZAOT-BAPOAL";
    taktziv_mivne_dmei_nihul.GOVA_DMEI_NIHUL_NIKBA_AL_PI_HOTZAOT_BAPOAL = entities.get_field_val(params);
    params.xml_node_name = "SUG-HOTZAA";
    taktziv_mivne_dmei_nihul.SUG_HOTZAA = entities.get_field_val(params);
    params.xml_node_name = "KOD-MASLUL-DMEI-NIHUL";
    taktziv_mivne_dmei_nihul.KOD_MASLUL_DMEI_NIHUL = entities.get_field_val(params);

   

    params.xml_node_name = "MEAFYENEI-MASLUL-DMEI-NIHUL";
    taktziv_mivne_dmei_nihul.MEAFYENEI_MASLUL_DMEI_NIHUL = entities.get_field_val(params);
    params.xml_node_name = "SHEUR-DMEI-NIHUL";
    taktziv_mivne_dmei_nihul.SHEUR_DMEI_NIHUL = entities.get_field_val(params);
   

   

    params.xml_node_name = "DMEI-NIHUL-ACHIDIM";
    taktziv_mivne_dmei_nihul.DMEI_NIHUL_ACHIDIM = entities.get_field_val(params);
    params.xml_node_name = "KOD-MASLUL-HASHKAA-BAAL-DMEI-NIHUL-YECHUDIIM";
    taktziv_mivne_dmei_nihul.KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM = entities.get_field_val(params);
    params.xml_node_name = "OFEN-HAFRASHA";
    taktziv_mivne_dmei_nihul.OFEN_HAFRASHA = entities.get_field_val(params);

  

    params.xml_node_name = "SCHUM-MAX-DNHL-HAFKADA";
    taktziv_mivne_dmei_nihul.SCHUM_MAX_DNHL_HAFKADA = entities.get_field_val(params);
    params.xml_node_name = "SACH-DMEI-NIHUL-MASLUL";
    taktziv_mivne_dmei_nihul.SACH_DMEI_NIHUL_MASLUL = entities.get_field_val(params);
    params.xml_node_name = "DMEI-NIHUL-ACHERIM";
    taktziv_mivne_dmei_nihul.DMEI_NIHUL_ACHERIM = entities.get_field_val(params);

   

    params.xml_node_name = "KAYEMET-HATAVA";
    taktziv_mivne_dmei_nihul.KAYEMET_HATAVA = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-IDKUN-SHEUR-DNHL";
    taktziv_mivne_dmei_nihul.TAARICH_IDKUN_SHEUR_DNHL = entities.get_date_field_val(params);
    params.xml_node_name = "KENAS-MESHICHAT-KESAFIM";
    taktziv_mivne_dmei_nihul.KENAS_MESHICHAT_KESAFIM = entities.get_field_val(params);

    

    params.xml_node_name = "SUG-HATAVA";
    taktziv_mivne_dmei_nihul.SUG_HATAVA = entities.get_field_val(params);
    params.xml_node_name = "ACHOZ-HATAVA";
    taktziv_mivne_dmei_nihul.ACHOZ_HATAVA = entities.get_field_val(params);
    params.xml_node_name = "TAARICH-SIUM-HATAVA";
    taktziv_mivne_dmei_nihul.TAARICH_SIUM_HATAVA = entities.get_date_field_val(params);


    return taktziv_mivne_dmei_nihul;
}


module.exports = {
    async extract_taktziv_mivne_dmei_nihul_from_xml(params) {
        try {
            var taktziv_mivne_dmei_nihul = get_my_taktziv_mivne_dmei_nihul(params);
            var data = get_my_taktziv_meshicha_niud(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_mivne_dmei_nihul(params) {
        try {
            var taktziv_mivne_dmei_nihul = get_my_taktziv_mivne_dmei_nihul(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_mivne_dmei_nihul.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_mivne_dmei_nihul.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_mivne_dmei_nihul.TypeRec)

                .input('GOVA_DMEI_NIHUL_NIKBA_AL_PI_HOTZAOT_BAPOAL', sql.Int, taktziv_mivne_dmei_nihul.GOVA_DMEI_NIHUL_NIKBA_AL_PI_HOTZAOT_BAPOAL)
                .input('SUG_HOTZAA', sql.Int, taktziv_mivne_dmei_nihul.SUG_HOTZAA)
                .input('KOD_MASLUL_DMEI_NIHUL', sql.NVarChar, taktziv_mivne_dmei_nihul.KOD_MASLUL_DMEI_NIHUL)

                .input('MEAFYENEI_MASLUL_DMEI_NIHUL', sql.Int, taktziv_mivne_dmei_nihul.MEAFYENEI_MASLUL_DMEI_NIHUL)
                .input('SHEUR_DMEI_NIHUL', sql.Float, taktziv_mivne_dmei_nihul.SHEUR_DMEI_NIHUL)
             


                .input('DMEI_NIHUL_ACHIDIM', sql.Int, taktziv_mivne_dmei_nihul.DMEI_NIHUL_ACHIDIM)
                .input('KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM', sql.NVarChar, taktziv_mivne_dmei_nihul.KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM)
                .input('OFEN_HAFRASHA', sql.Int, taktziv_mivne_dmei_nihul.OFEN_HAFRASHA)

                .input('SCHUM_MAX_DNHL_HAFKADA', sql.Float, taktziv_mivne_dmei_nihul.SCHUM_MAX_DNHL_HAFKADA)
                .input('SACH_DMEI_NIHUL_MASLUL', sql.Float, taktziv_mivne_dmei_nihul.SACH_DMEI_NIHUL_MASLUL)
                .input('DMEI_NIHUL_ACHERIM', sql.Float, taktziv_mivne_dmei_nihul.DMEI_NIHUL_ACHERIM)

                .input('KAYEMET_HATAVA', sql.Int, taktziv_mivne_dmei_nihul.KAYEMET_HATAVA)
                .input('TAARICH_IDKUN_SHEUR_DNHL', sql.NVarChar, taktziv_mivne_dmei_nihul.TAARICH_IDKUN_SHEUR_DNHL)
                .input('KENAS_MESHICHAT_KESAFIM', sql.Int, taktziv_mivne_dmei_nihul.KENAS_MESHICHAT_KESAFIM)

                .input('SUG_HATAVA', sql.Int, taktziv_mivne_dmei_nihul.SUG_HATAVA)
                .input('ACHOZ_HATAVA', sql.Float, taktziv_mivne_dmei_nihul.ACHOZ_HATAVA)
                .input('TAARICH_SIUM_HATAVA', sql.NVarChar, taktziv_mivne_dmei_nihul.TAARICH_SIUM_HATAVA)


               


                .query(sql_insert_taktziv_mivne_dmei_nihul);


            return " taktziv_mivne_dmei_nihul  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}

