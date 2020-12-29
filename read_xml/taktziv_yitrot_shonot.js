// taktziv_yitrot_shonot


var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_yitrot_shonot = "INSERT INTO [InsurDB].[dbo].[YitrotShonotDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec , MoneYitra" +
    " ,MOED_NEZILUT_TAGMULIM    , YITRAT_KASPEY_TAGMULIM " +
    ", TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM " +

   " ,  ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM "+
  "  ,  TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA "+
    "   ,  TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT " +

 "   ,  TZVIRAT_PITZUIM_31_12_1999_LEKITZBA "+
 "   ,  ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI "+
    "    ,  ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT " +

 "   ,  ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM "+
"    ,  KAYAM_RETZEF_PITZUIM_KITZBA "+
    "   ,  KAYAM_RETZEF_ZECHUYOT_PITZUIM " +

 "   ,  ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI "+
  "  , TAARICH_ERECH_TZVIROT) "+
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  , @MoneYitra " +
    " ,@MOED_NEZILUT_TAGMULIM    , @YITRAT_KASPEY_TAGMULIM " +
    ", @TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM " +
    " ,  @ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM " +
    "  ,  @TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA " +
    "   ,  @TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT " +
    "   ,  @TZVIRAT_PITZUIM_31_12_1999_LEKITZBA " +

    "   ,  @ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI " +
    "    ,  @ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT " +
    "   ,  @ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM " +

    "    ,  @KAYAM_RETZEF_PITZUIM_KITZBA " +
    "   ,  @KAYAM_RETZEF_ZECHUYOT_PITZUIM " +
    "   ,  @ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI " +
    "  , @TAARICH_ERECH_TZVIROT) "
    ;
let yey_no_object={1:"כן",2:"לא",3:"לא ידוע"};

function get_yes_no(index){
 let my_answer="";

  switch(index){
    case 1 :
        my_answer="כן";
        break;
    case 2 :
    my_answer="לא";
    break;
    case 3 :
    my_answer="לא ידוע";
    break;
  }
  return my_answer;
}    

function get_my_taktziv_yitrot_shonot(params) {
    let temp=0;
    var taktziv_yitrot_shonot = {};

    taktziv_yitrot_shonot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_yitrot_shonot.MyNoPolice = params.my_no_police;
    taktziv_yitrot_shonot.TypeRec = params.type_rec;
    taktziv_yitrot_shonot.MoneYitra = params.mone;
    //    taktziv_yitrot_shonot .IdClient = params.id_client;

    // params.xml_node_name = "MOED-NEZILUT-TAGMULIM";
    // taktziv_yitrot_shonot.MOED_NEZILUT_TAGMULIM = entities.get_field_val(params);
    // params.xml_node_name = "YITRAT-KASPEY-TAGMULIM";
    // taktziv_yitrot_shonot.YITRAT_KASPEY_TAGMULIM = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-PITZUIM-PTURIM-MAAVIDIM-KODMIM";
    taktziv_yitrot_shonot.TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM = entities.get_field_val(params);

    
    params.xml_node_name = "ERECH-PIDION-PITZUIM-LEKITZBA-MAAVIDIM-KODMIM";
    taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-PITZUIM-MAAVIDIM-KODMIM-BERETZEF-KITZBA";
    taktziv_yitrot_shonot.TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA = entities.get_field_val(params);
    params.xml_node_name = "TZVIRAT-PITZUIM-MAAVIDIM-KODMIM-BERETZEF-ZECHUYOT";
    taktziv_yitrot_shonot.TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT = entities.get_field_val(params);

    params.xml_node_name = "TZVIRAT-PITZUIM-31-12-1999-LEKITZBA";
    taktziv_yitrot_shonot.TZVIRAT_PITZUIM_31_12_1999_LEKITZBA = entities.get_field_val(params);
    params.xml_node_name = "ERECH-PIDION-MARKIV-PITZUIM-LEMAS-NOCHECHI";
    taktziv_yitrot_shonot.ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI = entities.get_field_val(params);
    params.xml_node_name = "ERECH-PIDION-PITZUIM-MAAVIDIM-KODMIM-RETZEF-ZEHUYUT";
    taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT = entities.get_field_val(params);

    params.xml_node_name = "ERECH-PIDION-PITZUIM-LEHON-MAAVIDIM-KODMIM";
    taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM = entities.get_field_val(params);
    params.xml_node_name = "KAYAM-RETZEF-PITZUIM-KITZBA";
    taktziv_yitrot_shonot.KAYAM_RETZEF_PITZUIM_KITZBA = entities.get_field_val(params);
    try{
        temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
        taktziv_yitrot_shonot.KayamRetzfPizuimKitzva = yey_no_object[temp];
    }
    catch (e) {
        schumei_bituah_sesodi.KayamRetzfPizuimKitzva = "";
    };
    params.xml_node_name = "KAYAM-RETZEF-ZECHUYOT-PITZUIM";
    taktziv_yitrot_shonot.KAYAM_RETZEF_ZECHUYOT_PITZUIM = entities.get_field_val(params);
    try{
        temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
        taktziv_yitrot_shonot.KayamRetzfZechuyotPizuim = yey_no_object[temp];
    }
    catch (e) {
        schumei_bituah_sesodi.KayamRetzfZechuyotPizuim = "";
    };
    params.xml_node_name = "ERECH-PIDION-PITZUIM-MAASIK-NOCHECHI";
    taktziv_yitrot_shonot.ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI = entities.get_field_val(params);
    taktziv_yitrot_shonot.TAARICH_ERECH_TZVIROT = entities.convert_date(params.taarich_erech_tzvirt);
   
    return taktziv_yitrot_shonot;
}


module.exports = {
    async extract_taktziv_yitrot_shonot_from_xml(params) {
        try {
            var data = get_my_taktziv_yitrot_shonot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_yitrot_shonot(params) {
        try {
            var taktziv_yitrot_shonot = get_my_taktziv_yitrot_shonot(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_yitrot_shonot.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_yitrot_shonot.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_yitrot_shonot.TypeRec)
                .input('MoneYitra', sql.Int, taktziv_yitrot_shonot.MoneYitra)


                .input('MOED_NEZILUT_TAGMULIM', sql.NVarChar, taktziv_yitrot_shonot.MOED_NEZILUT_TAGMULIM)
                .input('YITRAT_KASPEY_TAGMULIM', sql.Float, taktziv_yitrot_shonot.YITRAT_KASPEY_TAGMULIM)
                .input('TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM', sql.Float, taktziv_yitrot_shonot.TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM)


                .input('ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM', sql.Float, taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM)
                .input('TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA', sql.Float, taktziv_yitrot_shonot.TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA)
                .input('TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT', sql.Float, taktziv_yitrot_shonot.TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT)


                .input('TZVIRAT_PITZUIM_31_12_1999_LEKITZBA', sql.Float, taktziv_yitrot_shonot.TZVIRAT_PITZUIM_31_12_1999_LEKITZBA)
                .input('ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI', sql.Float, taktziv_yitrot_shonot.ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI)
                .input('ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT', sql.Float, taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT)

                .input('ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM', sql.Float, taktziv_yitrot_shonot.ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM)
                .input('KAYAM_RETZEF_PITZUIM_KITZBA', sql.Int, taktziv_yitrot_shonot.KAYAM_RETZEF_PITZUIM_KITZBA)
                .input('KAYAM_RETZEF_ZECHUYOT_PITZUIM', sql.Int, taktziv_yitrot_shonot.KAYAM_RETZEF_ZECHUYOT_PITZUIM)


               
                .input('ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI', sql.Float, taktziv_yitrot_shonot.ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI)
                .input('TAARICH_ERECH_TZVIROT', sql.NVarChar, taktziv_yitrot_shonot.TAARICH_ERECH_TZVIROT)



                .query(sql_insert_taktziv_yitrot_shonot);


            return " taktziv_yitrot_shonot  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


