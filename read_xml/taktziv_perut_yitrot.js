// taktziv_perut_yitrot

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_yitrot = "INSERT INTO [InsurDB].[dbo].[PerutYitrotDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec , MoneYitra" +
    
    "  ,KOD_SUG_ITRA     , KOD_SUG_HAFRASHA     , TOTAL_CHISACHON_MTZBR" +
"   , TOTAL_ERKEI_PIDION  , TAARICH_ERECH_TZVIROT    ) "+
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  , @MoneYitra " +
    "  ,@KOD_SUG_ITRA     , @KOD_SUG_HAFRASHA     , @TOTAL_CHISACHON_MTZBR  " +
    "   , @TOTAL_ERKEI_PIDION  , @TAARICH_ERECH_TZVIROT    ) "

    ;
// KOD-SUG-HAFRASHA get_kod_sug_hafrasha
function get_kod_sug_hafrasha(no_police){
    var ob={
                "full":0,
                "NoPolice":no_police,
                "1":0,
                "2":0,
                "3":0,
                "4":0,
                "5":0,
                "6":0,
                "7":0,
                "8":0,
                "9":0,
                "10":0,
                "11":0,
                "12":0
            
            }   
    return ob;
} 

function get_my_taktziv_perut_yitrot(params) {

    var taktziv_perut_yitrot = {};

    taktziv_perut_yitrot.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_yitrot.MyNoPolice = params.my_no_police;
    taktziv_perut_yitrot.TypeRec = params.type_rec;
    taktziv_perut_yitrot.MoneYitra = params.mone;
    //    taktziv_perut_yitrot .IdClient = params.id_client;
 
    params.xml_node_name = "KOD-SUG-ITRA";
    taktziv_perut_yitrot.KOD_SUG_ITRA = entities.get_field_val(params);
    params.xml_node_name = "KOD-SUG-HAFRASHA";
    taktziv_perut_yitrot.KOD_SUG_HAFRASHA = entities.get_field_val(params);
    params.xml_node_name = "TOTAL-CHISACHON-MTZBR";
    taktziv_perut_yitrot.TOTAL_CHISACHON_MTZBR = entities.get_field_val(params);
 
    params.xml_node_name = "TOTAL-ERKEI-PIDION";
    taktziv_perut_yitrot.TOTAL_ERKEI_PIDION = entities.get_field_val(params);
  
    taktziv_perut_yitrot.TAARICH_ERECH_TZVIROT = entities.convert_date(params.taarich_erech_tzvirt);

    return taktziv_perut_yitrot;
}


module.exports = {
    async get_perut_yitrot_cross_tab(params){
        let perut_yitra_object={};
        let perut_yitra_hon=get_kod_sug_hafrasha(params.my_no_police);
        let perut_yitra_kitzva=get_kod_sug_hafrasha(params.my_no_police);
        try {
             let index=params.perut_yitrot_list.length;
             for(i=0 ;index>i; i++){
                
                let my_perut_yitra=params.perut_yitrot_list[i];
             //   for(let my_perut_yitra in params.perut_yitrot_list[i]){
                    let kod_sug_itra=my_perut_yitra.KOD_SUG_ITRA;
                    let kod_sug_hafrasha=my_perut_yitra.KOD_SUG_HAFRASHA;
                    let yitra=0;
                    if(my_perut_yitra.TOTAL_CHISACHON_MTZBR>0){
                        yitra=my_perut_yitra.TOTAL_CHISACHON_MTZBR;
                    }
                    if(my_perut_yitra.TOTAL_CHISACHON__PIDION>0){
                        yitra=my_perut_yitra.TOTAL_CHISACHON__PIDION ;
                    }
                    if (kod_sug_itra==1){
                        perut_yitra_hon[kod_sug_hafrasha]=yitra;
                        perut_yitra_hon.full=1;
                    } else {
                        perut_yitra_kitzva[kod_sug_hafrasha]=yitra;
                        perut_yitra_kitzva.full=1;
                    }
                   
                    perut_yitra_object.hon=perut_yitra_hon;
                    perut_yitra_object.kitzva=perut_yitra_kitzva;
              //  }
            }
           
            return perut_yitra_object;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async extract_taktziv_perut_yitrot_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_yitrot(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_yitrot(params) {
        try {
            var taktziv_perut_yitrot = get_my_taktziv_perut_yitrot(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_perut_yitrot.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_perut_yitrot.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_yitrot.TypeRec)
                .input('MoneYitra', sql.Int, taktziv_perut_yitrot.MoneYitra)

                .input('KOD_SUG_ITRA', sql.Int, taktziv_perut_yitrot.KOD_SUG_ITRA)
                .input('KOD_SUG_HAFRASHA', sql.Int, taktziv_perut_yitrot.KOD_SUG_HAFRASHA)
                .input('TOTAL_CHISACHON_MTZBR', sql.Float, taktziv_perut_yitrot.TOTAL_CHISACHON_MTZBR)
                .input('TOTAL_ERKEI_PIDION', sql.Float, taktziv_perut_yitrot.TOTAL_ERKEI_PIDION)

                .input('TAARICH_ERECH_TZVIROT', sql.NVarChar, taktziv_perut_yitrot.TAARICH_ERECH_TZVIROT)
               


                .query(sql_insert_taktziv_perut_yitrot);


            return " taktziv_perut_yitrot  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


