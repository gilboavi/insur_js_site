var config = require("../config").config;
const sql = require('mssql');
var entities = require('../read_xml/entities');
const dbConn = require("../dal/dbConn");

const sql_selecte_heshbon_o_polisa =" SELECT "+
   " , [IdClient]  "+
  "  , [MISPAR_POLISA_O_HESHBON] " +
  "  , [CompanyName] "+
 "    , [TAARICH_NECHONUT] " +
 "   , [TAARICH_HITZTARFUT_MUTZAR] " +
 "   , [PensiaVatikaOHadasha] "+
 "   , [SugKerenPenNsia] " +
 "   , [SugPolisa] "+
 "   , [SugTochnit] "+
"    , [StatusPolisa] "+
 "   , [MPR_MEFITZ_BE_YATZRAN] "+
"    , [TAARICH_HITZTARFUT_RISHON "+
 "   , [TAARICH_IDKUN_STATUS]  "+
"    , [SHEM_TOCHNIT] "+
"    , [MADAD_BASIS] "+
"    , [KIDOD_ACHID] " +
 "   , [AZMADA_LEALVAHA]  "+
"    , [TAARICH_ACHRON_MOTAV_MUVET] "+
 "   , [KOLEL_ZAKAUT_AGACH] "+
"    , [SHIOR_AGACH_MEUADOT] " +
"    , [AVTACHT_TESOA] "+
"    , [TAARICH_CIUM_AVTACHT_TESOA] "+
"    , [MISPAR_GIMLAOT] "+
 "   , [KAYAM_KISUY_HIZONI] "+
"    , [KISUY_ISHY_KVOZATI]  "+
"   , [TAARICH_TCHILA_RISK_ZMANI] " +
    "    , [PENSIA_VATIKA_O_HADASHA] " +
    "    , [SUG_KEREN_PENSIA]  " +
    "    , [KOD_MEZAHE_YATZRAN] " +
    "    , [TOM_TOKEF_RISK_ZMANI] " +
    "    , [SugKupa]  " +
    "    , [SUG_KUPA] " +
    "   , [SugMuzar] " +
    "   , [SUG_TOCHNIT_O_CHESHBON] " +
    "  FROM[InsurDB].[dbo].[HeshbonOPolisaDBWithParams] ";

const sql_selecte_heshbon_o_polisa_params = "SELECT   " +
    " IdClient AS [מספר זהות] "
", MISPAR_POLISA_O_HESHBON AS [מספר פוליסה] " +
    " , CompanyName AS [שם חברה]"+
", TAARICH_NECHONUT AS [נכון לתאריך]"+
"    , TAARICH_HITZTARFUT_MUTZAR AS [תאריך הצטרפות]"+
"    ,  PensiaVatikaOHadasha AS [קרן פנסיה]"+
", SugKerenPenNsia AS [תוכנית פנסיה]"+
    "  , SugPolisa AS [סוג פוליסה]"
", SugTochnit AS [סוג תוכנית]" +
    " , StatusPolisa AS [סטטוס פוליסה]" +
    "   , MPR_MEFITZ_BE_YATZRAN AS [מספר סוכן]" +
    "    , TAARICH_HITZTARFUT_RISHON AS [ת.הצטרפות ראשון]" +
    ", TAARICH_IDKUN_STATUS AS [ת.עדכון סטטוס]" +
    ", SHEM_TOCHNIT AS [שם תוכנית]" +
    ", MADAD_BASIS AS [מדד בסיס]" +
    ", AZMADA_LEALVAHA AS [הצמדת הלוואה]" +
    ", TAARICH_ACHRON_MOTAV_MUVET AS [ת.אחרון מוטב]" +
    ", KOLEL_ZAKAUT_AGACH AS [זכאות לאגח מובטמ] " +
    "   ,  SHIOR_AGACH_MEUADOT AS [שיעור האגח]" +
    ", AVTACHT_TESOA AS [הבטחת תשואה]" +
    ", TAARICH_CIUM_AVTACHT_TESOA AS [ת.סיום הבטחת תשואה] " +
    ", MISPAR_GIMLAOT AS [מספר גימלאות] " +
    " , KAYAM_KISUY_HIZONI AS [כיסוי חיצוני] " +
    ", KISUY_ISHY_KVOZATI AS [כיסוי אישי קבוצתי]" +
    ", TAARICH_TCHILA_RISK_ZMANI AS [ת.תחילת ריסק זמני] " +
    ", PENSIA_VATIKA_O_HADASHA AS [פהסיה ותיקה או חדשה] " +
    " , SUG_KEREN_PENSIA AS [סוג ק. פנסיה] " +
    ", KOD_MEZAHE_YATZRAN " +
    " , TOM_TOKEF_RISK_ZMANI AS [תם ריסק זמני] " +
    ", SugKupa AS [סוג קופה] " +
    ", SUG_KUPA, SugMuzar AS [סוג מוצר] " +
    " ,  SUG_TOCHNIT_O_CHESHBON " +
    " FROM         dbo.HeshbonOPolisaDBWithParams " +
    " WHERE (IdClient = @idIdClient) ";


const sql_insert_to_heshbon_o_polisa = "INSERT INTO [InsurDB].[dbo].[HeshbonOPolisaDB] " +
   " (MISPAR_POLISA_O_HESHBON  , KOD_MEZAHE_YATZRAN "+
   " , TypeRec , ASMACHTA_MEKORIT , IdClient  , MPR_MEFITZ_BE_YATZRAN "+
   " , TAARICH_NECHONUT , TAARICH_HITZTARFUT_MUTZAR, TAARICH_HITZTARFUT_RISHON "+
   " , SUG_KEREN_PENSIA , PENSIA_VATIKA_O_HADASHA , TAARICH_IDKUN_STATUS "+
    ", STATUS_POLISA_O_CHESHBON, SUG_POLISA, SUG_TOCHNIT_O_CHESHBON "+
   " , SHEM_TOCHNIT, KIDOD_ACHID , MADAD_BASIS, AZMADA_LEALVAHA "+
   " , TAARICH_ACHRON_MOTAV_MUVET, KOLEL_ZAKAUT_AGACH, SHIOR_AGACH_MEUADOT"+
    ", AVTACHT_TESOA , TAARICH_CIUM_AVTACHT_TESOA, MISPAR_GIMLAOT"+
   " , KAYAM_KISUY_HIZONI , KISUY_ISHY_KVOZATI , TAARICH_TCHILA_RISK_ZMANI "+
   " , TOM_TOKEF_RISK_ZMANI , SUG_MUZAR) "+
"  VALUES " +
  "  (@MISPAR_POLISA_O_HESHBON , @KOD_MEZAHE_YATZRAN,@TypeRec ,@ASMACHTA_MEKORIT ,@IdClient "+
   "  ,@MPR_MEFITZ_BE_YATZRAN,@TAARICH_NECHONUT,@TAARICH_HITZTARFUT_MUTZAR"+
   "  ,@TAARICH_HITZTARFUT_RISHON,@SUG_KEREN_PENSIA,@PENSIA_VATIKA_O_HADASHA" +
  "   ,@TAARICH_IDKUN_STATUS ,@STATUS_POLISA_O_CHESHBON,@SUG_POLISA "+
   "  ,@SUG_TOCHNIT_O_CHESHBON,@SHEM_TOCHNIT,@KIDOD_ACHID,@MADAD_BASIS "+
   "  ,@AZMADA_LEALVAHA,@TAARICH_ACHRON_MOTAV_MUVET,@KOLEL_ZAKAUT_AGACH "+
   "  ,@SHIOR_AGACH_MEUADOT ,@AVTACHT_TESOA ,@TAARICH_CIUM_AVTACHT_TESOA "+
   "  ,@MISPAR_GIMLAOT ,@KAYAM_KISUY_HIZONI,@KISUY_ISHY_KVOZATI "+
    "  ,@TAARICH_TCHILA_RISK_ZMANI ,@TOM_TOKEF_RISK_ZMANI ,@SUG_MUZAR)"

const get_empty_heshbon_o_polisa_bak = (params) => {
    var my_client = {
        Serial: 0,
        MISPAR_POLISA_O_HESHBON: null,
        KOD_MEZAHE_YATZRAN: null,
        TypeRec: null,
        ASMACHTA: null,
        MPR_MEFITZ_BE_YATZRAN: null,
        TAARICH_NECHONUT: null,
        TAARICH_HITZTARFUT_MUTZAR: null,
        TAARICH_HITZTARFUT_RISHON: null,
        SUG_KEREN_PENSIA: null,
        PENSIA_VATIKA_O_HADASHA: null,
        TAARICH_IDKUN_STATUS: null,
        STATUS_POLISA_O_CHESHBON: null,
        SUG_POLISA: null,
        SUG_TOCHNIT_O_CHESHBON: null,
        SHEM_TOCHNIT: null,
        KIDOD_ACHID: null,
        MADAD_BASIS: null,
        AZMADA_LEALVAHA: null,
        TAARICH_ACHRON_MOTAV_MUVET: null,
        KOLEL_ZAKAUT_AGACH: null,
        SHIOR_AGACH_MEUADOT: null,
        AVTACHT_TESOA: null,
        TAARICH_CIUM_AVTACHT_TESOA: null,
        MISPAR_GIMLAOT: null,
        KAYAM_KISUY_HIZONI: null,
        KISUY_ISHY_KVOZATI: null,
        TAARICH_TCHILA_RISK_ZMANI: null,
        TOM_TOKEF_RISK_ZMANI: null,
        SUG_MUZAR: null
    }
    return my_client;
}

function get_field_val(params) {
    var temp = null;
    try {
        temp = params.entity[params.xml_node_name][0];
        if (typeof temp != 'string') {
            temp = null;
        }
    } catch (e) {

    }
    return temp;
}

function get_date_field_val(params) {
    var temp = null;
    try {
        temp = params.entity[params.xml_node_name][0];

        if (typeof temp == 'string') {
            if (temp.length == 8) {
                temp = temp.substring(6, 8) + "/" + temp.substring(4, 6) + "/" + temp.substring(0, 4);
            }
            else if (temp.length == 6) {
                temp = temp.substring(4, 6) + "/" + temp.substring(0, 4);
            }
            else {
                temp = null;
            }
        }
        else {
            temp = null;
        }

    } catch (e) {

    }
    return temp
}



function get_my_heshbon_o_polisa_bak(params) {


  //  var polisa = get_empty_heshbon_o_polisa();
    var polisa = entities.get_empty_heshbon_o_polisa();
    polisa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    polisa.id_client = params.id_client;
    polisa.sug_muzar = params.sug_muzar;

    params.xml_node_name = "ASMACHTA-MEKORIT"
    polisa.ASMACHTA_MEKORIT = get_field_val(params);
    //try {
    //    temp = params.entity["ASMACHTA-MEKORIT"][0];
    //    if (typeof temp == 'string') {
    //        polisa.ASMACHTA_MEKORIT = temp;
    //    }
    //} catch (e) {
    //    polisa.ASMACHTA_MEKORIT = null;
    //}

    try {
        temp = params.entity["MISPAR-POLISA-O-HESHBON"][0];
        if (typeof temp == 'string') {
            polisa.MISPAR_POLISA_O_HESHBON = temp;
        }
    } catch (e) { }

    try {
        temp = params.entity["MPR-MEFITZ-BE-YATZRAN"][0];
        if (typeof temp == 'string') {
            polisa.MPR_MEFITZ_BE_YATZRAN = temp;
        }
    } catch (e) {
        polisa.MPR_MEFITZ_BE_YATZRAN = null;
    }

    try {
        temp = params.entity["SHEM-TOCHNIT"][0];
        if (typeof temp == 'string') {
            polisa.SHEM_TOCHNIT = temp;
        }
    } catch (e) {
        polisa.SHEM_TOCHNIT = null;
    }

    try {
        temp = params.entity["KIDOD-ACHID"][0];
        if (typeof temp == 'string') {
            polisa.KIDOD_ACHID = temp;
        }
    } catch (e) {
        polisa.KIDOD_ACHID = null;
    }

    params.xml_node_name = "TAARICH-NECHONUT";
    polisa.TAARICH_NECHONUT = get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-MUTZAR";
    polisa.TAARICH_HITZTARFUT_MUTZAR = get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-RISHON";
    polisa.TAARICH_HITZTARFUT_RISHON = get_date_field_val(params);



    //try {
    //    temp = params.entity["TAARICH-NECHONUT"][0];

    //    if (typeof temp == 'string'  &&  temp.length==8) {
    //        temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
    //        polisa.TAARICH_NECHONUT = temp;
    //    }
    //} catch (e) {
    //    polisa.TAARICH_NECHONUT = null;
    //}

    //try {
    //    temp = params.entity["TAARICH-HITZTARFUT-MUTZAR"][0];

    //    if (typeof temp == 'string' && temp.length == 8) {
    //        temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
    //        polisa.TAARICH_HITZTARFUT_MUTZAR = temp;
    //    }
    //} catch (e) {
    //    polisa.TAARICH_HITZTARFUT_MUTZAR = null;
    //}

    //try {
    //    temp = params.entity["TAARICH-HITZTARFUT-RISHON"][0];

    //    if (typeof temp == 'string' && temp.length == 8) {
    //        temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
    //        polisa.TAARICH_HITZTARFUT_RISHON = temp;
    //    }
    //} catch (e) {
    //    polisa.TAARICH_HITZTARFUT_RISHON = null;
    //}

    try {
        temp = params.entity["SUG-KEREN-PENSIA"][0];
        if (typeof temp == 'string') {
            polisa.SUG_KEREN_PENSIA = temp;
        }
    } catch (e) {
        polisa.SUG_KEREN_PENSIA = null;
    }

    try {
        temp = params.entity["PENSIA-VATIKA-O-HADASHA"][0];
        if (typeof temp == 'string') {
            polisa.PENSIA_VATIKA_O_HADASHA = temp;
        }
    } catch (e) {
        polisa.PENSIA_VATIKA_O_HADASHA = null;
    }

    try {
        temp = params.entity["TAARICH-IDKUN-STATUS"][0];

        if (typeof temp == 'string' && temp.length == 8) {
            temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
            polisa.TAARICH_IDKUN_STATUS = temp;
        }
    } catch (e) {
        polisa.TAARICH_IDKUN_STATUS = null;
    }



    try {
        temp = params.entity["STATUS-POLISA-O-CHESHBON"][0];
        if (typeof temp == 'string') {
            polisa.STATUS_POLISA_O_CHESHBON = temp;
        }
    } catch (e) {
        polisa.STATUS_POLISA_O_CHESHBON = null;
    }
    // להוסיף את השדות לטבלה
    try {
        temp = params.entity["TAARICH-TCHILA-RISK-ZMANI"][0];

        if (typeof temp == 'string' && temp.length == 8) {
            temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
            polisa.TAARICH_TCHILA_RISK_ZMANI = temp;
        }
    } catch (e) {
        polisa.TAARICH_IDKUN_STATUS = null;
    }

    try {
        temp = params.entity["TOM-TOKEF-RISK-ZMANI"][0];

        if (typeof temp == 'string' && temp.length == 8) {
            temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
            polisa.TOM_TOKEF_RISK_ZMANI = temp;
        }
    } catch (e) {
        polisa.TOM_TOKEF_RISK_ZMANI = null;
    }

    try {
        temp = params.entity["SUG-POLISA"][0];
        if (typeof temp == 'string') {
            polisa.SUG_POLISA = temp;
        }
    } catch (e) {
        polisa.SUG_POLISA = null;
    }

    try {
        temp = params.entity["SUG-TOCHNIT-O-CHESHBON"][0];
        if (typeof temp == 'string') {
            polisa.SUG_TOCHNIT_O_CHESHBON = temp;
        }
    } catch (e) {
        polisa.SUG_TOCHNIT_O_CHESHBON = null;
    }

    try {
        temp = params.entity["MADAD-BASIS"][0];
        if (typeof temp == 'string') {
            polisa.MADAD_BASIS = temp;
        }
    } catch (e) {
        polisa.MADAD_BASIS = null;
    }

    try {
        temp = params.entity["AZMADA-LEALVAHA"][0];
        if (typeof temp == 'string') {
            polisa.AZMADA_LEALVAHA = temp;
        }
    } catch (e) {
        polisa.AZMADA_LEALVAHA = null;
    }

    try {
        temp = params.entity["TAARICH-ACHRON-MOTAV-MUVET"][0];

        if (typeof temp == 'string' && temp.length == 8) {
            temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
            polisa.TAARICH_ACHRON_MOTAV_MUVET = temp;
        }
    } catch (e) {
        polisa.TAARICH_ACHRON_MOTAV_MUVET = null;
    }

    try {
        temp = params.entity["KOLEL-ZAKAUT-AGACH"][0];
        if (typeof temp == 'string') {
            polisa.KOLEL_ZAKAUT_AGACH = temp;
        }
    } catch (e) {
        polisa.KOLEL_ZAKAUT_AGACH = null;
    }

    try {
        temp = params.entity["SHIOR-AGACH-MEUADOT"][0];
        if (typeof temp == 'string') {
            polisa.SHIOR_AGACH_MEUADOT = temp;
        }
    } catch (e) {
        polisa.SHIOR_AGACH_MEUADOT = null;
    }

    try {
        temp = params.entity["AVTACHT-TESOA"][0];
        if (typeof temp == 'string') {
            polisa.AVTACHT_TESOA = temp;
        }
    } catch (e) {
        polisa.AVTACHT_TESOA = null;
    }

    try {
        temp = params.entity["TAARICH-CIUM-AVTACHT-TESOA"][0];

        if (typeof temp == 'string' && temp.length == 8) {
            temp = temp.substring(0, 4) + "-" + temp.substring(4, 6) + " -" + temp.substring(6, 8);
            polisa.TAARICH_CIUM_AVTACHT_TESOA = temp;
        }
    } catch (e) {
        polisa.TAARICH_CIUM_AVTACHT_TESOA = null;
    }



    try {
        temp = params.entity["MISPAR-GIMLAOT"][0];
        if (typeof temp == 'string') {
            polisa.MISPAR_GIMLAOT = temp;
        }
    } catch (e) {
        polisa.MISPAR_GIMLAOT = null;
    }

    try {
        temp = params.entity["KAYAM-KISUY-HIZONI"][0];
        if (typeof temp == 'string') {
            polisa.KAYAM_KISUY_HIZONI = temp;
        }
    } catch (e) {
        polisa.KAYAM_KISUY_HIZONI = null;
    }

    try {
        temp = params.entity["KISUY-ISHY-KVOZATI"][0];
        if (typeof temp == 'string') {
            polisa.KISUY_ISHY_KVOZATI = temp;
        }
    } catch (e) {
        polisa.KISUY_ISHY_KVOZATI = null;
    }

    return polisa;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_my_heshbon_o_polisa(params)
{
  
    var polisa = {};
  //  var polisa = entities.get_empty_heshbon_o_polisa();
    polisa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    polisa.IdClient = params.id_client;
    polisa.SUG_MUZAR = params.sug_muzar;
    polisa.TypeRec=params.type_rec;
   // polisa.TypeRec=getRandomInt(min, max);
    params.xml_node_name = "ASMACHTA-MEKORIT";
    polisa.ASMACHTA_MEKORIT = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-POLISA-O-HESHBON";
    polisa.MISPAR_POLISA_O_HESHBON = entities.get_field_val(params);

    params.xml_node_name = "MPR-MEFITZ-BE-YATZRAN" ;
    polisa.MPR_MEFITZ_BE_YATZRAN = entities.get_field_val(params);

    params.xml_node_name = "SHEM-TOCHNIT" ;
    polisa.SHEM_TOCHNIT = entities.get_field_val(params);

    params.xml_node_name = "KIDOD-ACHID";
    polisa.KIDOD_ACHID = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-NECHONUT";
    polisa.TAARICH_NECHONUT = entities.get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-MUTZAR";
    polisa.TAARICH_HITZTARFUT_MUTZAR = entities.get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-RISHON";
    polisa.TAARICH_HITZTARFUT_RISHON = entities.get_date_field_val(params);

    params.xml_node_name = "SUG-KEREN-PENSIA";
    polisa.SUG_KEREN_PENSIA =  entities.get_field_val(params);

    params.xml_node_name = "PENSIA-VATIKA-O-HADASHA";
    polisa.PENSIA_VATIKA_O_HADASHA = entities.get_field_val(params);
    
    params.xml_node_name = "TAARICH-IDKUN-STATUS";
    polisa.TAARICH_IDKUN_STATUS = entities.get_date_field_val(params);

    params.xml_node_name = "STATUS-POLISA-O-CHESHBON";
    polisa.STATUS_POLISA_O_CHESHBON = entities.get_field_val(params);
   
 // להוסיף את השדות לטבלה

    params.xml_node_name = "TAARICH-TCHILA-RISK-ZMANI";
    polisa.TAARICH_TCHILA_RISK_ZMANI = entities.get_date_field_val(params);

    params.xml_node_name = "TOM-TOKEF-RISK-ZMANI";
    polisa.TOM_TOKEF_RISK_ZMANI = entities.get_date_field_val(params);
    
    params.xml_node_name = "SUG-POLISA";
    polisa.SUG_POLISA = entities.get_field_val(params);

    params.xml_node_name = "SUG-TOCHNIT-O-CHESHBON";
    polisa.SUG_TOCHNIT_O_CHESHBON = entities.get_field_val(params);
   
    params.xml_node_name = "MADAD-BASIS";
    polisa.MADAD_BASIS = entities.get_field_val(params);
   
    params.xml_node_name = "AZMADA-LEALVAHA";
    polisa.AZMADA_LEALVAHA = entities.get_field_val(params);
  
    params.xml_node_name = "TAARICH-ACHRON-MOTAV-MUVET";
    polisa.TAARICH_ACHRON_MOTAV_MUVET = entities.get_date_field_val(params);

    params.xml_node_name = "KOLEL-ZAKAUT-AGACH";
    polisa.KOLEL_ZAKAUT_AGACH = entities.get_field_val(params);

    params.xml_node_name = "SHIOR-AGACH-MEUADOT";
    polisa.SHIOR_AGACH_MEUADOT = entities.get_field_val(params);

    params.xml_node_name = "AVTACHT-TESOA";
    polisa.AVTACHT_TESOA = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-CIUM-AVTACHT-TESOA";
    polisa.TAARICH_CIUM_AVTACHT_TESOA = entities.get_date_field_val(params);

    // params.xml_node_name = "TOM-TOKEF-RISK-ZMANI";
    // polisa.TOM_TOKEF_RISK_ZMANI = entities.get_date_field_val(params);

    params.xml_node_name = "MISPAR-GIMLAOT";
    polisa.MISPAR_GIMLAOT = entities.get_field_val(params);

    params.xml_node_name = "KAYAM-KISUY-HIZONI";
    polisa.KAYAM_KISUY_HIZONI = entities.get_field_val(params);
    
    params.xml_node_name = "KISUY-ISHY-KVOZATI";
    polisa.KISUY_ISHY_KVOZATI = entities.get_field_val(params);
   
  
  
   
    return polisa;
}

function get_my_heshbon_o_polisa_object(params)
{   
    let my_sug_keren_pensia={
        1:"יסוד",
        2:"מקיפה",
        3:"כללית"
    }

    let my_pensia_vatika_o_hadasha={
        1:"ותיקה",
        2:"חדשה"
       
    }
    
        
    let my_kisuy_ishy_kvozati={
        1:"אישי",
        2:"קבוצתי",
        3:"קיימים כיסויים מסוג אישי וגם מסוג קבוצתי"
       
    }

    let yes_no={
        1:"כן",
        2:"לא"
    }
    let my_sug_polisa={
        1:"קלאסי",
        2:"קלאסי",
        3:"פוליסות משנת 2004 ואילך",
        4:"ריסק ואו א.כ.ע"
    }

    let my_sug_mutzar={
        1:"פוליסת ביטוח חיים משולב חיסכון",
        2:"קרן פנסיה",
        3:"קופת גמל",
        4:"קרן השתלמות",
        5:"פוליסת חיסכון טהור",
        6:"פוליסת סיכון טהור",
        7:"ביטוח חיים משכנתא",
        8:"פוליסת סיכון טהור קולקטיב",
        9:"קופת גמל להשקעה",
        10:"חיסכון לכל ילד"
        
        }
    
    let my_sug_tochnit={
        1:"שכיר",
        2:"עצמאי",
        3:"בעל שליטה",
        4:"אחר",
        5:"פרט"
    }

    let my_status={
            1:"פעיל",
            2:"לא פעיל",
            3:"מבוטל",
            4:"ריסק זמני",
            5:"בתביעה",
            6:"חסום להפקדות",
            7:"תום תקופה",
            8:"ריסק זמני",
            9:"שמירת כיסוי ביטוחי",
            10:"לא רלוונטי"
    }
  
    var polisa = {};
  //  var polisa = entities.get_empty_heshbon_o_polisa();
    polisa.KOD_MEZAHE_YATZRAN = params.KOD_MEZAHE_YATZRAN;
    polisa.IdClient = params.id_client;
    polisa.SUG_MUTZAR = params.sug_muzar;
    polisa.sug_mutzar=my_sug_mutzar[params.sug_muzar]
    polisa.TypeRec=params.type_rec;
   
    polisa.SHEM_YATZRAN=params.entity.SHEM_YATZRAN;
   // polisa.TypeRec=getRandomInt(min, max);
    params.xml_node_name = "ASMACHTA-MEKORIT";
    polisa.ASMACHTA_MEKORIT = entities.get_field_val(params);

    params.xml_node_name = "MISPAR-POLISA-O-HESHBON";
    polisa.MISPAR_POLISA_O_HESHBON = entities.get_field_val(params);

    params.xml_node_name = "MPR-MEFITZ-BE-YATZRAN" ;
    polisa.MPR_MEFITZ_BE_YATZRAN = entities.get_field_val(params);

    params.xml_node_name = "SHEM-TOCHNIT" ;
    polisa.SHEM_TOCHNIT = entities.get_field_val(params);

    params.xml_node_name = "KIDOD-ACHID";
    polisa.KIDOD_ACHID = entities.get_field_val(params);

    params.xml_node_name = "TAARICH-NECHONUT";
    polisa.TAARICH_NECHONUT = entities.get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-MUTZAR";
    polisa.TAARICH_HITZTARFUT_MUTZAR = entities.get_date_field_val(params);

    params.xml_node_name = "TAARICH-HITZTARFUT-RISHON";
    polisa.TAARICH_HITZTARFUT_RISHON = entities.get_date_field_val(params);

    params.xml_node_name = "SUG-KEREN-PENSIA";
    polisa.SUG_KEREN_PENSIA =  entities.get_field_val(params);
    polisa.sug_keren_pensia=my_sug_keren_pensia[polisa.SUG_KEREN_PENSIA];

    params.xml_node_name = "PENSIA-VATIKA-O-HADASHA";
    polisa.PENSIA_VATIKA_O_HADASHA = entities.get_field_val(params);
    polisa.pensia_vatika_o_hadasha=my_pensia_vatika_o_hadasha[ polisa.PENSIA_VATIKA_O_HADASHA];
    
    params.xml_node_name = "TAARICH-IDKUN-STATUS";
    polisa.TAARICH_IDKUN_STATUS = entities.get_date_field_val(params);

    params.xml_node_name = "STATUS-POLISA-O-CHESHBON";
    polisa.STATUS_POLISA_O_CHESHBON = entities.get_field_val(params);
   polisa.status=my_status[ polisa.STATUS_POLISA_O_CHESHBON];
 // להוסיף את השדות לטבלה

    params.xml_node_name = "TAARICH-TCHILA-RISK-ZMANI";
    polisa.TAARICH_TCHILA_RISK_ZMANI = entities.get_date_field_val(params);

    params.xml_node_name = "TOM-TOKEF-RISK-ZMANI";
    polisa.TOM_TOKEF_RISK_ZMANI = entities.get_date_field_val(params);
    
    params.xml_node_name = "SUG-POLISA";
    polisa.SUG_POLISA = entities.get_field_val(params);
    polisa.sug_polisa=my_sug_polisa[polisa.SUG_POLISA];

    params.xml_node_name = "SUG-TOCHNIT-O-CHESHBON";
    polisa.SUG_TOCHNIT_O_CHESHBON = entities.get_field_val(params);
    polisa.sug_tochnit=my_sug_tochnit[polisa.SUG_TOCHNIT_O_CHESHBON];
    polisa.SugTochnit=my_sug_tochnit[polisa.SUG_TOCHNIT_O_CHESHBON];
    params.xml_node_name = "MADAD-BASIS";
    polisa.MADAD_BASIS = entities.get_field_val(params);
   
    params.xml_node_name = "AZMADA-LEALVAHA";
    polisa.AZMADA_LEALVAHA = entities.get_field_val(params);
    polisa.azmada_lealvaha=yes_no[polisa.AZMADA_LEALVAHA];
  
    params.xml_node_name = "TAARICH-ACHRON-MOTAV-MUVET";
    polisa.TAARICH_ACHRON_MOTAV_MUVET = entities.get_date_field_val(params);

    params.xml_node_name = "KOLEL-ZAKAUT-AGACH";
    polisa.KOLEL_ZAKAUT_AGACH = entities.get_field_val(params);
    polisa.kolel_zakaut_agach=yes_no[ polisa.KOLEL_ZAKAUT_AGACH];

    params.xml_node_name = "SHIOR-AGACH-MEUADOT";
    polisa.SHIOR_AGACH_MEUADOT = entities.get_field_val(params);
   

    params.xml_node_name = "AVTACHT-TESOA";
    polisa.AVTACHT_TESOA = entities.get_field_val(params);
    polisa.avtacht_tesoa=yes_no[polisa.AVTACHT_TESOA];
    params.xml_node_name = "TAARICH-CIUM-AVTACHT-TESOA";
    polisa.TAARICH_CIUM_AVTACHT_TESOA = entities.get_date_field_val(params);

    params.xml_node_name = "TOM-TOKEF-RISK-ZMANI";
    polisa.TOM_TOKEF_RISK_ZMANI = entities.get_date_field_val(params);

    params.xml_node_name = "MISPAR-GIMLAOT";
    polisa.MISPAR_GIMLAOT = entities.get_field_val(params);

    params.xml_node_name = "TIKUN-190";
    polisa.TIKUN_190 = entities.get_field_val(params);
    polisa.TIKUN_190=yes_no[polisa.TIKUN_190];

    params.xml_node_name = "KAYAM-KISUY-HIZONI";
    polisa.KAYAM_KISUY_HIZONI = entities.get_field_val(params);
    polisa.kayam_kisuy_hizoni=yes_no[polisa.KAYAM_KISUY_HIZONI];

    params.xml_node_name = "KISUY-ISHY-KVOZATI";
    polisa.KISUY_ISHY_KVOZATI = entities.get_field_val(params);
    polisa.kisuy_ishy_kvozati=my_kisuy_ishy_kvozati[polisa.KISUY_ISHY_KVOZATI];
  
  
   
    return polisa;
}



//var pool = sql.connect(config.mssql.test_db);

module.exports = {
    async open_connection() {
        let pool = await  dbConn.getPool();
        return pool;
    },
    // close_connection(pool) {
    //     sql.close();
    // },

    async extract_heshbon_o_polisa_from_xml(params) {
        try {
            var data = get_my_heshbon_o_polisa_object(params);
            return data;
        } catch (err){
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },
    async get_heshbon_o_polisa(params) {

        try {

            var my__heshbon_o_polisa = get_my_heshbon_o_polisa(params);
            // var sql = params.sql;

            let pool = params.connection//await sql.connect(config.mssql.test_db)
            let result = await pool.request()
           // let result = await dbConn.getPool().request()
                .input('MISPAR_POLISA_O_HESHBON', sql.NVarChar, my__heshbon_o_polisa.MISPAR_POLISA_O_HESHBON)
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, my__heshbon_o_polisa.KOD_MEZAHE_YATZRAN)
                .input('TypeRec', sql.Int, my__heshbon_o_polisa.TypeRec)
                .input('ASMACHTA_MEKORIT', sql.NVarChar, my__heshbon_o_polisa.ASMACHTA_MEKORIT)
                .input('IdClient', sql.Int, my__heshbon_o_polisa.IdClient)
                .input('MPR_MEFITZ_BE_YATZRAN', sql.NVarChar, my__heshbon_o_polisa.MPR_MEFITZ_BE_YATZRAN)
                .input('TAARICH_NECHONUT', sql.NVarChar, my__heshbon_o_polisa.TAARICH_NECHONUT)
                .input('TAARICH_HITZTARFUT_MUTZAR', sql.NVarChar, my__heshbon_o_polisa.TAARICH_HITZTARFUT_MUTZAR)
                .input('TAARICH_HITZTARFUT_RISHON', sql.NVarChar, my__heshbon_o_polisa.TAARICH_HITZTARFUT_RISHON)
                .input('SUG_KEREN_PENSIA', sql.Int, my__heshbon_o_polisa.SUG_KEREN_PENSIA)
                .input('PENSIA_VATIKA_O_HADASHA', sql.Int, my__heshbon_o_polisa.PENSIA_VATIKA_O_HADASHA)
                .input('TAARICH_IDKUN_STATUS', sql.NVarChar, my__heshbon_o_polisa.TAARICH_IDKUN_STATUS)
                .input('STATUS_POLISA_O_CHESHBON', sql.Int, my__heshbon_o_polisa.STATUS_POLISA_O_CHESHBON)
                .input('SUG_POLISA', sql.Int, my__heshbon_o_polisa.SUG_POLISA)
                .input('SUG_TOCHNIT_O_CHESHBON', sql.Int, my__heshbon_o_polisa.SUG_TOCHNIT_O_CHESHBON)
                .input('SHEM_TOCHNIT', sql.NVarChar, my__heshbon_o_polisa.SHEM_TOCHNIT)
                .input('KIDOD_ACHID', sql.NVarChar, my__heshbon_o_polisa.KIDOD_ACHID)
                .input('MADAD_BASIS', sql.Float, my__heshbon_o_polisa.MADAD_BASIS)
                .input('AZMADA_LEALVAHA', sql.Int, my__heshbon_o_polisa.AZMADA_LEALVAHA)
                .input('TAARICH_ACHRON_MOTAV_MUVET', sql.NVarChar, my__heshbon_o_polisa.TAARICH_ACHRON_MOTAV_MUVET)
                .input('KOLEL_ZAKAUT_AGACH', sql.Int, my__heshbon_o_polisa.KOLEL_ZAKAUT_AGACH)
                .input('SHIOR_AGACH_MEUADOT', sql.Float, my__heshbon_o_polisa.SHIOR_AGACH_MEUADOT)
                .input('AVTACHT_TESOA', sql.Int, my__heshbon_o_polisa.AVTACHT_TESOA)
                .input('TAARICH_CIUM_AVTACHT_TESOA', sql.NVarChar, my__heshbon_o_polisa.TAARICH_CIUM_AVTACHT_TESOA)
                .input('MISPAR_GIMLAOT', sql.Int, my__heshbon_o_polisa.MISPAR_GIMLAOT)
                .input('KAYAM_KISUY_HIZONI', sql.Int, my__heshbon_o_polisa.KAYAM_KISUY_HIZONI)
                .input('KISUY_ISHY_KVOZATI', sql.Int, my__heshbon_o_polisa.KISUY_ISHY_KVOZATI)
                .input('TAARICH_TCHILA_RISK_ZMANI', sql.NVarChar, my__heshbon_o_polisa.TAARICH_TCHILA_RISK_ZMANI)
                .input('TOM_TOKEF_RISK_ZMANI', sql.NVarChar, my__heshbon_o_polisa.TOM_TOKEF_RISK_ZMANI)
                .input('SUG_MUZAR', sql.Int, my__heshbon_o_polisa.SUG_MUZAR)
                .query(sql_insert_to_heshbon_o_polisa);


            return {};
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
        //finally {
        //    sql.close();
        // }
    },

    async delete_from_xml_tables_by_no_police(params) {

        try {
            var my__heshbon_o_polisa = get_my_heshbon_o_polisa(params);

             let pool = params.connection
             let result = await pool.request()
             //let result = await dbConn.getPool().request()
                .input('MyNoPolice', sql.NVarChar, my__heshbon_o_polisa.MISPAR_POLISA_O_HESHBON)
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, my__heshbon_o_polisa.KOD_MEZAHE_YATZRAN)
                .execute("DeleteFromXmlTablesByNoPolice")
            return {};
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async check_if_police_exist(params) {
        var sql_insert_life_policies = "INSERT INTO [InsurDB].[dbo].[LifePolicies ] " +
            "( ClientSerial,NoPolice,Company  )" +
            "  VALUES " +
            "  (@ClientSerial "+
        " ,@NoPolice " +
            ", @Company " +
            "  )";
          // beginInsur ,@beginInsur
          
        try{
            var my__heshbon_o_polisa = get_my_heshbon_o_polisa(params);

            let pool = params.connection
            let result = await pool.request()

            // find no_company
          //  let result = await dbConn.getPool().request()
                .input('MyNoPolice', sql.NVarChar, my__heshbon_o_polisa.MISPAR_POLISA_O_HESHBON)
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, my__heshbon_o_polisa.KOD_MEZAHE_YATZRAN)
                .input('beginInsur', sql.NVarChar, my__heshbon_o_polisa.TAARICH_HITZTARFUT_RISHON)
                .query("Select Serial From LifePoliciesWihtMezaheYatzran Where (NoPolice=@MyNoPolice) And (KOD_MEZAHE_YATZRAN=@KOD_MEZAHE_YATZRAN) ")
           
            if (typeof result.recordset[0] == 'undefined') {
                 
               //  let result_find = await dbConn.getPool().request()
               let result_find = await pool.request()
                     .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, my__heshbon_o_polisa.KOD_MEZAHE_YATZRAN)
                    .query("Select  Serial From ParamCompany Where KOD_MEZAHE_YATZRAN=@KOD_MEZAHE_YATZRAN")

                var company_serial = result_find.recordset[0].Serial;

                if (typeof result_find.recordset[0] != 'undefined') {
                    // find ClientSerial
                    var result_serial = result_find.recordset[0].Serial;
                    let result_client= await pool.request()
                        .input('id', sql.Int, params.id_client)
                        .query("Select Serial From  [InsurDB].[dbo].[Clients]   Where id=@id")

                         var client_serial = result_client.recordset[0].Serial;

                    // insert to  LifePolicies
                         //   let result_insert = await dbConn.getPool().request()
                     let result_insert = await pool.request() 
                        .input('ClientSerial', sql.Int, client_serial)
                        .input('NoPolice', sql.NVarChar, my__heshbon_o_polisa.MISPAR_POLISA_O_HESHBON)
                        .input('Company', sql.Int, company_serial)
                        .query(sql_insert_life_policies)

                }
               
            }
            
            return "check_if_police_exist ended ";
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }

    }
}