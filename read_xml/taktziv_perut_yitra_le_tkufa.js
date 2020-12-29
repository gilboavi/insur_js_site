// taktziv_perut_yitra_le_tkufa

var entities = require('../read_xml/entities');
const sql = require('mssql');

const sql_insert_taktziv_perut_yitra_le_tkufa = "INSERT INTO [InsurDB].[dbo].[PerutYitraLeTkufaDB] " +
    "  (MyNoPolice, KOD_MEZAHE_YATZRAN, TypeRec , MoneYitra" +
   "  ,KOD_TECHULAT_SHICHVA  , REKIV_ITRA_LETKUFA     , SUG_ITRA_LETKUFA "+
  "  , SACH_ITRA_LESHICHVA_BESHACH     , TAARICH_ERECH_TZVIROT) " +
    " VALUES " +
    "    (@MyNoPolice , @KOD_MEZAHE_YATZRAN , @TypeRec  , @MoneYitra " +
    "  ,@KOD_TECHULAT_SHICHVA  , @REKIV_ITRA_LETKUFA     , @SUG_ITRA_LETKUFA " +
    "  , @SACH_ITRA_LESHICHVA_BESHACH     , @TAARICH_ERECH_TZVIROT) " 

    ;
// KOD_TECHULAT_SHICHVA
function get_kod_techulat_shichva(){
    var ob1={
    "1":"עד חוק ההסדרים (1997 2000)",
    "2":"לאחר חוק ההסדרים (1997 2000)",
    "3":"כעד 31.12.2004",
   "4" :"עד 31.12.2005",
    "5":"מ-01.01.2005 עד 31.12.2007 ",
    "6":"מ-01.01.2006 עד 31.12.2007",
    "7":"מ- 01.01.2008",
    "8":"עד 31.12.2002",
    "9":"פיצויים",
    "10":"נדרש חישוב ידני"
    }
    return ob1;
}
// REKIV_ITRA_LETKUFA
function get_rekiv_itra_letkufa(no_police){
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
                "12":0,

                "21":0,
                "28":0,
                "29":0,
                "30":0,
                "32":0
            
            }   
    return ob;
}

function get_my_taktziv_perut_yitra_le_tkufa(params) {

    var taktziv_perut_yitra_le_tkufa = {};

    taktziv_perut_yitra_le_tkufa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    taktziv_perut_yitra_le_tkufa.MyNoPolice = params.my_no_police;
    taktziv_perut_yitra_le_tkufa.TypeRec = params.type_rec;
    taktziv_perut_yitra_le_tkufa.MoneYitra = params.mone;
    //    taktziv_perut_yitra_le_tkufa .IdClient = params.id_client;
 
    params.xml_node_name = "KOD-TECHULAT-SHICHVA";
    taktziv_perut_yitra_le_tkufa.KOD_TECHULAT_SHICHVA = entities.get_field_val(params);
    params.xml_node_name = "REKIV-ITRA-LETKUFA";
    taktziv_perut_yitra_le_tkufa.REKIV_ITRA_LETKUFA = entities.get_field_val(params);
    params.xml_node_name = "SUG-ITRA-LETKUFA";
    taktziv_perut_yitra_le_tkufa.SUG_ITRA_LETKUFA = entities.get_field_val(params);

    params.xml_node_name = "SACH-ITRA-LESHICHVA-BESHACH";
    taktziv_perut_yitra_le_tkufa.SACH_ITRA_LESHICHVA_BESHACH = entities.get_field_val(params);
   
    taktziv_perut_yitra_le_tkufa.TAARICH_ERECH_TZVIROT = entities.convert_date(params.taarich_erech_tzvirt);

    return taktziv_perut_yitra_le_tkufa;
}


module.exports = {
    async get_perut_yitrot_le_tkufa_cross_tab(params){
        let perut_yitra_le_tkufa_object={};
        let perut_yitra_le_tkufa_hon=get_rekiv_itra_letkufa(params.my_no_police);
        let perut_yitra_le_tkufa_kitzva_not_pay=get_rekiv_itra_letkufa(params.my_no_police);
        let perut_yitra_le_tkufa_kitzva=get_rekiv_itra_letkufa(params.my_no_police);
        let perut_yitra_le_tkufa_depend=get_rekiv_itra_letkufa(params.my_no_police);
        try {
             let index=params.perut_yitrot_le_tkufa_list.length;
             for(var i=0 ;index>i; i++){
                
                let my_perut_yitra_le_tkufa=params.perut_yitrot_le_tkufa_list[i];
             //   for(let my_perut_yitra_le_tkufa in params.perut_yitrot_le_tkufa_list[i]){
                    let kod_sug_itra=my_perut_yitra_le_tkufa.SUG_ITRA_LETKUFA;
                    let rekiv_itra_letkupa=my_perut_yitra_le_tkufa.REKIV_ITRA_LETKUFA;
                    let kod_techulat_shichva=my_perut_yitra_le_tkufa.KOD_TECHULAT_SHICHVA;
                    let yitra=0;
                   
                    yitra=my_perut_yitra_le_tkufa.SACH_ITRA_LESHICHVA_BESHACH;
                   
                    switch(kod_sug_itra) {
                        case "1":
                            perut_yitra_le_tkufa_hon[kod_techulat_shichva]=yitra;
                            perut_yitra_le_tkufa_hon.full=1;
                            break;
                        case "2":
                            perut_yitra_le_tkufa_kitzva_not_pay[kod_techulat_shichva]=yitra;
                            perut_yitra_le_tkufa_kitzva_not_pay.full=1;
                            break;
                        case "3":
                            perut_yitra_le_tkufa_kitzva[kod_techulat_shichva]=yitra;
                            perut_yitra_le_tkufa_kitzva.full=1;
                            break;
                            case "4":
                            perut_yitra_le_tkufa_depend[kod_techulat_shichva]=yitra;
                            perut_yitra_le_tkufa_depend.full=1;
                            break;
                       
                       
                    }
                   
                   
                   
                    perut_yitra_le_tkufa_object.hon=perut_yitra_le_tkufa_hon;
                    perut_yitra_le_tkufa_object.kitzva_not_pay=perut_yitra_le_tkufa_kitzva_not_pay;
                    perut_yitra_le_tkufa_object.kitzva=perut_yitra_le_tkufa_kitzva;
                    perut_yitra_le_tkufa_object.depend=perut_yitra_le_tkufa_depend;
              //  }
            }
           
            return perut_yitra_le_tkufa_object;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async extract_taktziv_perut_yitra_le_tkufa_from_xml(params) {
        try {
            var data = get_my_taktziv_perut_yitra_le_tkufa(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async insert_taktziv_perut_yitra_le_tkufa(params) {
        try {
            var taktziv_perut_yitra_le_tkufa = get_my_taktziv_perut_yitra_le_tkufa(params);

            let pool = params.connection
            let result = await pool.request()
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, taktziv_perut_yitra_le_tkufa.KOD_MEZAHE_YATZRAN)

                .input('MyNoPolice', sql.NVarChar, taktziv_perut_yitra_le_tkufa.MyNoPolice)
                .input('TypeRec', sql.Int, taktziv_perut_yitra_le_tkufa.TypeRec)
                .input('MoneYitra', sql.Int, taktziv_perut_yitra_le_tkufa.MoneYitra)

                .input('KOD_TECHULAT_SHICHVA', sql.Int, taktziv_perut_yitra_le_tkufa.KOD_TECHULAT_SHICHVA)
                .input('REKIV_ITRA_LETKUFA', sql.Int, taktziv_perut_yitra_le_tkufa.REKIV_ITRA_LETKUFA)
                .input('SUG_ITRA_LETKUFA', sql.Int, taktziv_perut_yitra_le_tkufa.SUG_ITRA_LETKUFA)

                .input('SACH_ITRA_LESHICHVA_BESHACH', sql.Float, taktziv_perut_yitra_le_tkufa.SACH_ITRA_LESHICHVA_BESHACH)

                .input('TAARICH_ERECH_TZVIROT', sql.NVarChar, taktziv_perut_yitra_le_tkufa.TAARICH_ERECH_TZVIROT)



                .query(sql_insert_taktziv_perut_yitra_le_tkufa);


            return " taktziv_perut_yitra_le_tkufa  was insert";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }

}


