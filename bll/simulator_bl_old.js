

// simulator_bl.js
var Excel = require('exceljs');
let my_xlsx = require("xlsx");
var simulator_dal = require('../dal/simulator_dal');
let xlsx_populate = require("xlsx-populate");

const stream = require('stream');
//let my_data;
var my_array = [
    { "firstName": "John", "lastName": "Doe" },
    { "firstName": "Anna", "lastName": "Smith" },
    { "firstName": "Peter", "lastName": "Jones" }];



var xml_headers = [
    [{
        "IdClient": "מספר זהות",
        "MISPAR_POLISA_O_HESHBON": "מספר פוליסה",
        "CompanyName": "שם חברה",
        "TAARICH_NECHONUT": "נכון לתאריך",
        "TAARICH_HITZTARFUT_MUTZAR": "תאריך הצטרפות",
        "PensiaVatikaOHadasha": "ק.פנסיה ותיקה/חדשה",
        "SugKerenPenNsia": "תוכנית פנסיה",
        "SugPolisa": "סוג פוליסה",
        "SugTochnit": "סוג תוכנית",
        "StatusPolisa": "סטטוס פוליסה",
        "MPR_MEFITZ_BE_YATZRAN": "מספר סוכן",
        "TAARICH_HITZTARFUT_RISHON": "ת.הצטרפות ראשון",
        "TAARICH_IDKUN_STATUS": "ת.עדכון סטטוס",
        "SHEM_TOCHNIT": "שם תוכנית",
        "MADAD_BASIS": "מדד בסיס",
        "AZMADA_LEALVAHA": "הצמדת הלוואה",
        "TAARICH_ACHRON_MOTAV_MUVET": "ת.אחרון מוטב",
        "KOLEL_ZAKAUT_AGACH": "זכאות לאגח מובטה",
        "SHIOR_AGACH_MEUADOT": "שיעור האגח",
        "AVTACHT_TESOA": "הבטחת תשואה",
        "TAARICH_CIUM_AVTACHT_TESOA": "ת.סיום הבטח תתשואה",
        "MISPAR_GIMLAOT": "מ.גימלאות",
        "KAYAM_KISUY_HIZONI": "כיסוי חיצוני",
        "KISUY_ISHY_KVOZATI": "כיסוי קבוצתי",
        "TAARICH_TCHILA_RISK_ZMANI": "ת.ריסק זמני",
        "PENSIA_VATIKA_O_HADASHA": "פ.ותיקה/חדשה",
        "SUG_KEREN_PENSIA": "סוג ק.פנסיה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TOM_TOKEF_RISK_ZMANI": "תם ריסק זמני",
        "SugKupa": "סוג קופה",
        "SUG_KUPASugMuzar": "סוג מוצר"
    }],

    [{
        "MyNoPolice": "מספר פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.חברה",
        "ERETZ": "ארץ",
        "SHEM_YISHUV": "שם ישוב",
        "SEMEL_YESHUV": "ס.ישוב",
        "SHEM_RECHOV": "שם רחוב",
        "MISPAR_BAIT": "מ.בית",
        "MISPAR_KNISA": "מ.כניסה",
        "MISPAR_DIRA": "מ.דירה",
        "MIKUD": "מיקוד",
        "TA_DOAR": "ת.דואר",
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.חברה",
        "KOD_ZIHUY_LAKOACH_str": "ס.תעודה",
        "IdClient": "מ.זיהוי"
    }],

    [{
        "MyNoPolice": "מ.רפוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.היצרן",
        "SugZika": "זיקה",
        "KodZihuiSheerim": "ק.זיקה",
        "MISPAR_ZIHUY_SHEERIM": "מ.זיהוי",
        "SHEM_PRATI_SHEERIM": "ש.פרטי",
        "SHEM_MISHPACHA_SHEERIM": "ש.משפחה",
        "SUG_ZIKA": "סוג זיקה",
        "SHEM_MISHPAHA_KODEM": "ש.משפחה קודם",
        "TAARICH_LEIDA": "ת.לידה",
        "TAARICH_NECHONUT": "ת.נכונות"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "MLUL_BITUACH_BAKEREN_PENSIA": "ש.מסלול ביטוח",
        "SHEM_MLUL_HABITUAH": "ש.מסלול"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "HutalIkul": "הוטל שיעבוד",
        "HutalShiabud": "הוטל עיקול",
        "TAARICH_NECHONUT": "נ.תאריך"

    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "YeshHalvaa": "ק.הלוואה",
        "MISDAR_SIDURI_SHEL_HAHALVAA": "סידורי הלוואה",
        "SCHUM_HALVAA": "ס.ההלוואה",
        "TAARICH_KABALAT_HALVAA": "ת.הלוואה",
        "TAARICH_SIYUM_HALVAA": "ת.סיום",
        "YITRAT_HALVAA": "יתרה",
        "TKUFAT_HALVAA": "ת.הלוואה בחודשים",
        "RIBIT": "ריבת",
        "SugRibit": "ס.ריבית",
        "SugHatznmada": "ס.הצמדה",
        "SugHechzer": "ס.החזר",
        "TadirutHechzer": "תדירות החזר",
        "SCHUM_HECHZER_TKUFATI": "החזרהתקופתי",
        "RAMAT_HALVAA": "יחס הלוואה לפוליסה",
        "TAARICH_NECHONUT": "נ.תאריך",

    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "YeshTvia": "קיימתתביעה",
        "MISPAR_TVIA_BE_YATZRAN": "מ.תביעה",
        "MISPAR_KISUI_BE_YATZRAN": "מ.כיסוי",
        "SHEM_KISUI_BE_YATZRAN": "ש.כיסוי",
        "SugHatviaa": "ס..תביעה",
        "OfenTashlum": "א.תשלום",
        "KodStatusTviaa": "סטטוס ",
        "TAARICH_STATUS_TVIA": "ת.סטטוס",
        "ACHUZ_MEUSHAR_O_K_A_SHICHRUR": "א.מאושר א.כ.ע",
        "SCHUM_TVIA_MEUSHAR": "ס.תביעה מאושר",
        "ACHUZ_NECHUT": "א.נכות",
        "TAARICH_TECHILAT_TASHLUM": "ת.תחילת תשלום",
        "TAARICH_NECHONUT": "נ.לתאריך",
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM": "כ.קולקטיבי",
        "SHEM_MEVATACHAT": "ש.חברה",
        "TAARICH_TCHILAT_HABITUACH": "ת.תחילתה ביטוח",
        "TAARICH_TOM_TKUFAT_HABITUAH": "ת.תום הביטוח",
        "SCHUM_BITUACH": "ס.הביטוח",
        "ALUT_KISUI": "עלות הכיסוי",
        "KOD_SUG_MUTZAR_BITUACH_str": "ס.הביטוח",
        "MESHALEM_DMEI_HABITUAH_str": "משלם הפרמיה",
        "HAIM_NECHTAM_TOFES_HITZTARFUT_str": "טופס הצטרפות",
        "TADIRUT_HATSHLUM_str": "תדירות תשלום",
        "TAARICH_NECHONUT": "נ.לתאריך",
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "GIL_PRISHA": "ג.פרישה",
        "TOTAL_CHISACHON_MITZTABER_TZAFUY": "חיסכון כ.פרמיות",
        "TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT": "חיסכון  ללא פרמיות",
        "MEKADEM_MOVTACH_LEPRISHA": "מ.מובטח",
        "MEKADEM_HAVTACHST_TOCHELET_str": "מ.המרה תתוחלת",
        "MEKADEM_HAVTACHST_TOCHELETPRISHA_str": "הבטחת תוחלת לפי מסלול",
        "SHEM_MASLOL": "ש.מסלול",
        "MEKADEM_HAVTACHAT_TSUA_str": "מ.המרה כןלל תשואה",
        "MEKADEM_HAVTACHAT_TSUATKUFA_str": "מ.ההמרה מוגבל",
        "TKUFAT_HAGBALA_BESHANIM": "תקופת הגבלה ",
        "TOCHELET_MASHPIA_KITZBA": " תלות הקצבה בשינויים בתוחלת  ",
        "TSUA_MASHPIA_KITZBA": "תלות הקצבה בתשואה",
        "SHEUR_PNS_ZIKNA_TZFUYA": "פ.זקנה צפוי",
        "TAARICH_NECHONUT": "נ.לתאריך"

    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugKupa": "סוגקופה",
        "SCHUM_KITZVAT_ZIKNA": "ק.זקנה כולל פרמיות",
        "KITZVAT_HODSHIT_TZFUYA": "ק.זקנה ללא פרמיות",
        "ACHUZ_TSUA_BATACHAZIT": "א.תשואה בתחזית",
        "TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT": "חיסכון להון כולל פרמיות",
        "TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT": "חיסכון להון ללא פרמיות",
        "TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT": "חיסכון לקצבה כולל פרמיות",
        "TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT": "חיסכון לקצבה ללא פרמיות",
        "TAARICH_NECHONUT": "נ.תאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SHEUR_TSUA_NETO": "תשואה נטו מ.השנה",
        "SHEUR_TSUA_BRUTO_CHS_1": "תשואה ברוטו בחודש האחרון לחיסכון א",
        "ACHUZ_TSUA_BRUTO_CHS_2": "תשואה מובטחת",
        "SHEUR_TSUA_MOVTACHAT_MEYOADOT": "תשואה ברוטו בחודש האחרון לחסכון ב",
        "REVACH_HEFSED_BENIKOI_HOZAHOT": "רווח/הפסד נטו"
    }],


    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugTochnit": "ס.תוכנית",
        "MPR_MAASIK_BE_YATZRAN": "מ.מעסיק",
        "StatusMaasik": "סטוס מעסיק",
        "SugBaalPolisa": "ס.בעל פוליסה",
        "MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH": "מספר ב.פוליסה שאינוהמבוטח",
        "SHEM_BAAL_POLISA_SHEEINO_MEVUTAH": "שם ב.פוליסה שאינו המבוטח"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodChishuvPolisa": "רכיב השכר",
        "SACHAR_POLISA": "שכרל פוליסה",
        "KodOfenHatzmada": "הצמדת שכר",
        "TAARICH_MSKORET": "ת.שכר",
        "ZakautLeloTnai": "זכאות ללא תנאי",
        "Seif_14": "סעיף14 ",
        "TAARICH_TCHILAT_TASHLUM": "ת.תחילת הפקדות"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugHamafkid": "ס.מפקיד",
        "SugHafrasha": "ס.הפרשה",
        "ACHUZ_HAFRASHA AS": "א.הפרשה",
        "SCHUM_HAFRASHA": "ס.הפרשה",
        "TAARICH_NECHONUT": "ת.נכונות"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodSugMaslul": "ס.מסלול",
        "KodSugHafr": "סו.הפרשה",
        "ACHUZ_HAFKADA_LEHASHKAA": "א.הפקדה למהשקעה",
        "SHEM_MASLUL_HASHKAA": "ש.מסלול ",
        "SHEUR_DMEI_NIHUL_HAFKADA": "ד.נ מהפקדה",
        "SHEUR_DMEI_NIHUL_HISACHON": "ד.נ מצבירה",
        "DMEI_NIHUL_ACHERIM": "ד.נ אחרים",
        "TSUA_NETO": "תשואה נטו",
        "TAARICH_NECHONUT": "ת.נכונות",
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SHEM_MESHALEM": "שם משלם",
        "SugTeudaMeshalem": "זיהוי משלם",
        "MISPAR_ZIHUY_MESHALEM": "מ.זיהוי משלם",
        "KodEmtzaeiTashlum": "אמצעי תשלום",
        "TadirutTashlum": "תדירות תשלום",
        "CHODESH_YECHUS": "חודש יחוס",
        "YOM_GVIYA_BECHODESH": "יום גביה",
        "OfenHatzmadatGvia": "הצמדת גביה",
        "ACHUZ_TAT_SHNATIYOT": "תת שנתיות",
        "TADIRUT_TASHLUM": "ת.תשלום",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TAARICH_HAFKADA_ACHARON": "ת.הפקדה אחרונה",
        "TOTAL_HAFKADA": "ס.ההפקדה",
        "TAARICH_ERECH_HAFKADA": "ת.ערך ",
        "SugHafkada": "ס.הפקדה",
        "TOTAL_HAFKADA_ACHRONA": "סך הפקדה לחיסכון",
        "HAFKADA_LEHISCHON_A": "הפקדה לחיסכון יסודי",
        "HAFKADA_LEHISCHON_B": "הפקדה לחיסכון ב",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodSugHafrasha": "ס.הפקדה",
        "SugHafrasha": "ס.הפרשה",
        "SugMafkid": "ס.מפקיד",
        "SCHUM_HAFKADA_SHESHULAM": "ס.ההפקדה",
        "CHODESH_SACHAR": "חודש השכר",
        "SACHAR_BERAMAT_HAFKADA": "שכר ברמתה הפקדה",
        "TAARICH_NECHONUT": "נ.תאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TAARICH_ERECH_HAFKADA": "תאריך ערך",
        "KodSugHafkada": "ס.מסלול",
        "SugHafrasha": "ס.הפרשה",
        "SugMafkid": "ס.מפקיד",
        "SCHUM_HAFKADA_SHESHULAM": "ס.הפקדה",
        "CHODESH_SACHAR": "חודש שכר",
        "ZMAN_PERAON": "זמן פרעון",
        "SACHAR_BERAMAT_HAFKADA": "שכר ברמת ההפקדה",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT": "תגמולי עובד",
        "TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT": "תגמולי מעביד",
        "TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT": "פיצויים",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_SUG_PEULA": "ס.פעולה",
        "RachivNimshachNuyad": "שם הרכיב",
        "SCHOOM_MESHICHA_NIUD": "סכום",
        "TAARICH_BIZOA": "ת.ביצוע",
        "TAARICH_ERECH": "ת.ערך",
        "KNAS_MESHICHA_NIUD": "קנס",
        "TAARICH_NECHONUT": "נ.תאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KayamChov": "חוב/פיגור",
        "TAARICH_TECHILAT_PIGUR": "ת.פיגור",
        "MISPAR_CHODSHEI_PIGUR": "מ.חודשי פיגור",
        "SugChov": "ס.חוב",
        "TOTAL_CHOVOT_O_PIGURIM": "סכום החוב/פיגור",
        "KsafimLoMeshuyachim": "כספים לא משויכים",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SHEUR_DMEI_NIHUL_HAFKADA": "ד.נ הפקדה",
        "TOTAL_DMEI_NIHUL_HAFKADA": "סך ד.נ הפקדה",
        "SHEUR_DMEI_NIHUL_TZVIRA": "ד.נ צבירה",
        "TOTAL_DMEI_NIHUL_TZVIRA": "סך ד.נצ בירה",
        "SACH_DMEI_NIHUL_ACHERIM": "ד.נ אחרים",
        "TOTAL_DMEI_NIHUL_POLISA_O_HESHBON": "סך ד.נ",
        "SACH_DMEI_BITUAH_SHENIGBOO": "סך ד.ביטוח",
        "HOTZOT_NIHUL_ASHKAOT": "נ.השקעות",
        "DEMI_AAVARAT_MASLOL": "ד.העברת מסלול",
        "DMEI_NIUL_MENAEL_TIKIM": "ד.נ מ.תיקים",
        "OFEN_GEVIAT_DMEI_BITUACH_str": "גבית ד.ביטוח",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "GovaDmeiNihul": "ד.נ לפי הוצאות",
        "SugHotzaa": "ס.הוצאה",
        "KOD_MASLUL_DMEI_NIHUL": "מסלול ד.נ",
        "MeafyeneiMaslulDmeiNihul": "מאפיניי ד.נ",
        "SHEUR_DMEI_NIHUL": "שיעור ד.נ",
        "DmeiNihulAchidim": "ד.נ אחרים",
        "KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM": " ד.נ ייחודיים",
        "OfenHafrasha": "א.הפרשה",
        "SCHUM_MAX_DNHL_HAFKADA": "סך מרבי ד.נ הפקדה",
        "SACH_DMEI_NIHUL_MASLUL": "סך ד.נ למסלול",
        "DMEI_NIHUL_ACHERIM": "סך ד.נ אחרים",
        "KayemetHatava": "הטבה ד.נ",
        "KENAS_MESHICHAT_KESAFIM": "קנס משיכה",
        "SUG_HATAVA": "ס.הטבה",
        "ACHOZ_HATAVA": "א.הטבה",
        "TAARICH_SIUM_HATAVA": "ת.סיום הטבה",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],


    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "YITRAT_SOF_SHANA": "יתרת בסוף השנה",
        "ERECH_PIDYON_SOF_SHANA": "ע.פדיון בסוף השנה",
        "ERECH_MESOLAK_SOF_SHANA": "ע.מסולק בסוף השנה",
        "YISKON_YITRAT_KESAFIM": "עדכוןי תרת באיזון אקטוארי",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],


    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodSugItra": ".יתרה",
        "SugHafrasha": "ס.הפרשה",
        "TOTAL_CHISACHON_MTZBR": "חיסכון מצטבר",
        "TOTAL_ERKEI_PIDION": "ערכי פדיון",
        "TAARICH_ERECH_TZVIROT": "ת.צבירות",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],


    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodTechulatShichva": "תכולת שיכבה",
        "RekivItraLetkufa": "רכיב",
        "SACH_ITRA_LESHICHVA_BESHACH": "יתרה לשכבה",
        "SugItraLtkufa": "ס.יתרה",
        "TAARICH_ERECH_TZVIROT": "ת.ערך",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],


    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM": "פיצויים פטורים מעבידים קודמים",
        "ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM": "ע.פדיון פיצויים פטורים לקצבה מעבידים קודמים",
        "TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA": "פיצויים ממעבידים קודמים רצף קצבה",
        "TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT": "פיצויים ממעבידים קודמים ברצף זכויות",
        "TZVIRAT_PITZUIM_31_12_1999_LEKITZBA": "פיצויים 31.12.1999  לקצבה-מרצף קצבה",
        "ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI": "ע.פדיון פיצויים לצרכי מס של מעסיק נוכחי",
        "ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT": "ע.פדיון פיצויים מעבידים קודמים רצף זכויות",
        "ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM": "ע.פדיון פיצויים נזיליםל הון מעבידים קודמים",
        "KayamRetzefPizuimKitzba": "רצף פיצויים לקצבה",
        "KayamRetzefZechuyotPizuim": "רצף זכויות פיצויים",
        "TAARICH_ERECH_TZVIROT": "ת.יתרות",
        "ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI": "ע.פידיון פיצויים מעסיק נוכחי",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KayamMeyupaKoach": "מיופה כח",
        "SugZihuy": "ס.מיופה כח",
        "MISPAR_ZIHUY": "מספר מזהה",
        "SHEM_MEYUPE_KOACH": "שם מיופה כח",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],



    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "MISPAR_KISUI_BE_YATZRAN": "מ.כיסוי",
        "SHEM_KISUI_YATZRAN": "ש.כיסוי",
        "SUG_KISUI_ETZEL_YATZRAN_str": "ס.כיסוי",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SUG_TEUDA_str": "ס.תעודה",
        "IdClient": "מ.זיהוי"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI": "קוד מוצר",
        "SCHUM_BITUACH_LEMASLUL": "ס.ביטוח למסלול",
        "MISPAR_MASKOROT": "מ.משכורות",
        "ACHUZ_HAKTZAA_LE_CHISACHON": "הקצאה לחיסכון",
        "TIKRAT_GAG_HATAM_LEMIKRE_MAVET": "תקרת למוות",
        "TIKRAT_GAG_HATAM_LE_O_K_A": "תקרת לאכע",
        "SCHUM_BITUAH_LEMAVET": "ס.ביטוח למוות",
        "SugHaZmada": "ס.הצמדה",
        "SchumBituahKolel": "ס.הביטוח כולל חיסכון",
        "SugMaslulLebituah": "ס.ביטוח",
        "SHEM_KISUI_YATZRAN": "ש.כיסוי",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_MIUTZAR_LAKISUY": "ק.מוצר",
        "TAARICH_TCHILAT_KISUY": "ת.תחילת הכיסוי",
        "SHEM_KISUI_YATZRAN": "ש.הכיסוי",
        "SUG_KISUY_BITOCHI_str": "ס.הכיסוי",
        "SCHUM_BITUACH": "ס.הביטוח",
        "DMEI_BITUAH_LETASHLUM_BAPOAL ": "ד.ביטוח",
        "TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM": "תדירות שינוי ד.ביטוח",
        "SugMevutach": "ס.מבוטח",
        "OfenTashlum": "א.תשלום ס.ביטוח",
        "MeshalemHakisuy": "משלם הכיסוי",
        "KodIshun": "האם מעשן",
        "IndChitum": "נערך חיתום",
        "Hachraga": "יש החרגה",
        "SugHachraga": "ס.ההחרגה",
        "TAARICH_TOM_KISUY": "ת.תום הכיסוי",
        "TAARICH_HAFSAKAT_TASHLUM": "ת.הפסקת תשלום",
        "ACHUZ_ME_SCM_BTH_YESODI": "א.מביטוח יסודי",
        "ACHUZ_MESACHAR": "אחוז/ כפולת שכר",
        "TAARICH_CHITUM": "ת.החיתום",
        "TKUFAT_ACHSHARA": "ת.אכשרה בחודשים",
        "TKUFAT_HAMTANA_CHODASHIM": "ת.המתנה בחודשים",
        "TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH": "ת.העדכון ד.הביטוח",
        "Hanacha": "הנחה ד.ביטוח",
        "SUG_HANACHA_KISUY_str": "ס.הנחה",
        "HatnayaLahanacha": "התניה להנחה",
        "ERECH_HANACHA_BEKISUI": "ערך ההנחה",
        "SHIUR_HANACHA_BEKISUI": "שיעור ההנחה",
        "KOD_NISPACH_KISUY": "נספח כיסוי",
        "SUG_ISUK_str": "סוגעיסוק",
        "Kolel_Prenzisa_satr": "כולל פרנציזה",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TosefetTaarif": "תוספת לתעריף",
        "KodSugToseft": "ס.התוספת",
        "SHEUR_TOSEFET": "א.התוספת",
        "TAARICH_TOM_TOSEFET": "ת.תום תוספת",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],
    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugZihuyMutav": "זיהוי מוטב",
        "KodZihuyMutav": "ס.תעודה",
        "MISPAR_ZIHUY_MUTAV": "מ.זיהוי",
        "SHEM_PRATI_MUTAV": "ש.פרטי",
        "SHEM_MISHPACHA_MUTAV": "ש.משפחה",
        "SugZika": "זיקה",
        "ACHUZ_MUTAV": "חלק המוטב",
        "MahutMutav": "מהות המוטב",
        "HagdaratMutav": "הגדרת מוטב",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "ECHUT": "עלות נכות",
        "ALUT_KISUI_PNS_SHRM_NECHE": "עלות פ.שארים",
        "SHEUR_KISUY_NECHUT": "שיעור כיסוי נכות",
        "SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM": "שכר קובע לנכות ושאירים",
        "TAARICH_MSKORET_NECHUT_VE_SHEERIM": "ת.נכונות שכר קובע",
        "SACH_PENSIAT_NECHUT": "סך פ.נכות",
        "ALUT_KISUY_SHEERIM": "עלות שארים",
        "SHIUR_KISUY_YATOM": "שיעור ליתום",
        "KITZBAT_SHEERIM_LEALMAN_O_ALMANA": "ק.שארים לבן זוג",
        "KITZBAT_SHEERIM_LEYATOM": "ק.שארים ליתום",
        "KITZBAT_SHEERIM_LEHORE_NITMACH": "ק.שארים להורה",
        "SHIUR_KISUY_ALMAN_O_ALMANA": "שיעור כיסוי לבןזוג",
        "SHIUR_KISUY_HORE_NITMACH": "שיעור כיסוי להורה",
        "GIL_PRISHA_LEPENSIYAT_ZIKNA": "גיל פרישה",
        "SACH_PENSIYAT_ALMAN_O_ALMANA": "פנסיית אלמנן/ה לא פעיל",
        "MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA": "חודשי חברות רצופים",
        "MENAT_PENSIA_TZVURA": "מנת פ.צבורה",
        "AHUZ_PENSIYA_TZVURA": "אחוז פ.צבורה",
        "TAARICH_TCHILAT_HAVERUT": "ת.תחילת חברות",
        "TAARICH_ERECH_LANENTUNIM": "ת.ערך לנתונים",
        "HatavaBituchit": "הטבה ביטוחית",
        "SUG_VITOR_SHAERIM": "ויתור שארים",
        "TAARICH_VITOR_SHEERIM": "ת.ויתור שארים",
        "TAARICH_CIUM_VITOR_SEERIM": "ת.סיוםו יתור שארים",
        "MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA": "חודשי חברות ק.פנסיה ותיקה",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }],

    [{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TACHVIVIM_O_ISUKIM": "תחביבים/עיסוקים",
        "KOD_MIKTZOA": "מקצוע",
        "TCHUM_ISUK_CHADASH": "עיסוק",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }]

]



// let newFile2 =   (async () => {
//     return new Promise(async (resolveall, rejectall) => {
//         try {
//             var buffersData = {
//                 buffers: [],
//                 totalLength: 0
//             };

//             let bufferStream = new stream.PassThrough();
//             bufferStream.on('data', (chunk) => {

//                 buffersData.buffers.push(new Buffer(chunk));
//                 buffersData.totalLength += chunk.length;
//             });

//             bufferStream.on('end', () => {
//                 let fileBuff = Buffer.concat(buffersData.buffers, buffersData.totalLength);
//                 responseObj = {
//                     IsFile: true,
//                     Filename: "test.xlsx",
//                     Mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//                     Buffer: fileBuff
//                 };
//                 resolveall(responseObj);
//             });

//             bufferStream.on('error', (err) => {
//                 rejectall(err);
//             });
//             // end of buffer stream
//             let workbook = await get_excel_copy();


//             workbook.xlsx.write(bufferStream);
//         } catch (e) {
//             rejectall(e);
//         }
//     });
// })();

function fill_sheet(params) {
    try {
        var tmp_workbook = params.work_book;
        if (params.my_list) {
            params.my_list.forEach(function (my_row, index1) {

                let i = 3;
                let keys = Object.values(my_row);
                keys.forEach(function (key) {
                    tmp_workbook.sheet(params.sheet_name).row(index1 + 6).cell(i).value(key);

                    i = i + 1;

                });
            });
        }
        return tmp_workbook;
    } catch (err) {
        // ... error checks 
        return params.work_book;
    }
}


module.exports = {



    async newFile() {
        let that = this;
        return new Promise(async (resolveall, rejectall) => {
            try {
                var buffersData = {
                    buffers: [],
                    totalLength: 0
                };

                let bufferStream = new stream.PassThrough();
                bufferStream.on('data', (chunk) => {

                    buffersData.buffers.push(new Buffer(chunk));
                    buffersData.totalLength += chunk.length;
                });

                bufferStream.on('end', () => {
                    let fileBuff = Buffer.concat(buffersData.buffers, buffersData.totalLength);
                    responseObj = {
                        IsFile: true,
                        Filename: "test.xlsx",
                        Mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                        Buffer: fileBuff
                    };
                    resolveall(responseObj);
                });

                bufferStream.on('error', (err) => {
                    rejectall(err);
                });
                // end of buffer stream
                // let workbook = await that.get_excel_copy();
                //   let workbook = await that.get_my_excel();
                bufferStream = await that.get_my_excel_natan();

                workbook.xlsx.write(bufferStream);

            } catch (e) {
                rejectall(e);
            }
        });
    },

    async   get_excel_copy_bak() {
        let workbook = new Excel.Workbook();
        let filename = 'C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
        workbook.xlsx.readFile(filename).then(function () {



            let worksheet = workbook.getWorksheet("RicusPolice");
            let row = worksheet.getRow(6);
            row.getCell(1).value = 15; // A5's value set to 5
            //row.commit();

            let my_list;
            try {
                my_list = my_data.heshbon_o_polisa_list;
            } catch (error) {
                my_list = xml_headers;
            }


            my_list.forEach(function (my_row, index1) {

                let i = 0;
                let keys = Object.values(my_row);
                keys.forEach(function (key) {

                    row.getCell(i + 3).value = key;
                    i = i + 1;

                });

                row = worksheet.getRow(index1 + 6);
            });


            return workbook;
        });
    },

    async   get_my_excel(my_data) {

        let that = this;
        let filename = 'C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
        let workbook = await xlsx_populate.fromFileAsync(filename);
        //  workbook.sheet("MyData").cell("J3").value("key22");
        // workbook.sheet("MyData").row(5).cell(10).value("key");
        // let my_list;
        // try {
        //     my_list = my_data.heshbon_o_polisa_list;
        // } catch (error) {
        //     my_list = xml_headers;
        // }
        var params = {

        };



        params.work_book = workbook;
        params.sheet_name = "ClientList";
        params.my_list = my_data.clientList;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "HotzaotBafoalLehodeshDivoach";
        params.my_list = my_data.hotzaotBafoalLehodeshDivoach;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "KisuiBKerenPensiaDBWithParams";
        params.my_list = my_data.KisuiBKerenPensiaDBWithParams;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "Kupa";
        params.my_list = my_data.kupa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadotMetchilatShana";
        params.my_list = my_data.perutHafkadotMetchilatShana;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadotMetchilatShanaAvgM";
        params.my_list = my_data.perutHafkadotMetchilatShanaAvgM;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafrashotLePolisa";
        params.my_list = my_data.perutHafrashotLePolisa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMasluleiHashkaa";
        params.my_list = my_data.perutMasluleiHashkaa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMivneDmeiNihul";
        params.my_list = my_data.perutMivneDmeiNihul;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutHafkadaAchrona";
        params.my_list = my_data.PerutHafkadaAchrona;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutPirteiHafkadaAchrona";
        params.my_list = my_data.perutPirteiHafkadaAchrona;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitrotLesofShanaKodemeDBWithParams";
        params.my_list = my_data.PerutYitrotLesofShanaKodemeDBWithParams;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa";
        params.my_list = my_data.perutYitraLeTkufa;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_after2000";
        params.my_list = my_data.perutYitraLeTkufa_after2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_till2000";
        params.my_list = my_data.perutYitraLeTkufa_till2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitraLeTkufa_crosTab";
        params.my_list = my_data.perutYitraLeTkufa_crosTab;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "CrosstabPerutYitrotDB";
        params.my_list = my_data.crosstab_perut_yitrotDB;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutYitrot";
        params.my_list = my_data.perutYitrot;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiHaasaka";
        params.my_list = my_data.pirteiHaasaka;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzar";
        params.my_list = my_data.pirteiKisuiBeMutzar;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzar_procerur";
        params.my_list = my_data.pirteiKisuiBeMutzar_procerur;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiKisuiBeMutzarPrmia";
        params.my_list = my_data.pirteiKisuiBeMutzarPrmia;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PirteiOved";
        params.my_list = my_data.pirteiOved;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "RicusKrenHishtalmut";
        params.my_list = my_data.ricusKrenHishtalmut;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "RicusPolice";
        params.my_list = my_data.ricusPolice;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "SchumeiBituahYesodi";
        params.my_list = my_data.schumeiBituahYesodi;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "YitraLefiGilPrisha";
        params.my_list = my_data.yitraLefiGilPrisha;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "CrossTabYitraLeTkufa_after_2000";
        params.my_list = my_data.crossTabYitraLeTkufa_after_2000;
        workbook = fill_sheet(params);

        params.work_book = workbook;
        params.sheet_name = "PerutMivneDmeiNihul_crosstab";
        params.my_list = my_data.perut_mivne_dmei_nihul_crosstab;
        workbook = fill_sheet(params);


       // workbook.toFileAsync("./out.xlsx");
        
        return workbook;

        // let buffer = new Buffer();
      //  let buffer = await workbook.outputAsync();
      //  return buffer;
        //  return workbook.outputAsync(Buffer);
        // workbook.outputAsync().then( function (data){
        //     return data;
        // });


    },

    async   get_my_excel_avi() {
        
           let that=this;
           let filename='C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
           xlsx_populate.fromFileAsync(filename).then( workbook=>{
                workbook.sheet("MyData").cell("J3").value("key22");
               // workbook.sheet("MyData").row(5).cell(10).value("key");
               let my_list;
               try {
                   my_list=my_data.heshbon_o_polisa_list;
               } catch (error) {
                   my_list=xml_headers;
               }
               var params={
                    
               };
              
               
   
               params.work_book=workbook;
               params.sheet_name="ClientList";
               params.my_list=my_data.clientList;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="HotzaotBafoalLehodeshDivoach";
               params.my_list=my_data.hotzaotBafoalLehodeshDivoach;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="KisuiBKerenPensiaDBWithParams";
               params.my_list=my_data.KisuiBKerenPensiaDBWithParams;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="Kupa";
               params.my_list=my_data.kupa;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutHafkadotMetchilatShana";
               params.my_list=my_data.perutHafkadotMetchilatShana;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutHafkadotMetchilatShanaAvgM";
               params.my_list=my_data.perutHafkadotMetchilatShanaAvgM;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutHafrashotLePolisa";
               params.my_list=my_data.perutHafrashotLePolisa;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutMasluleiHashkaa";
               params.my_list=my_data.perutMasluleiHashkaa;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutMivneDmeiNihul";
               params.my_list=my_data.perutMivneDmeiNihul;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutHafkadaAchrona";
               params.my_list=my_data.PerutHafkadaAchrona;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutPirteiHafkadaAchrona";
               params.my_list=my_data.perutPirteiHafkadaAchrona;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitrotLesofShanaKodemeDBWithParams";
               params.my_list=my_data.PerutYitrotLesofShanaKodemeDBWithParams;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitraLeTkufa";
               params.my_list=my_data.perutYitraLeTkufa;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitraLeTkufa_after2000";
               params.my_list=my_data.perutYitraLeTkufa_after2000;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitraLeTkufa_till2000";
               params.my_list=my_data.perutYitraLeTkufa_till2000;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitraLeTkufa_crosTab";
               params.my_list=my_data.perutYitraLeTkufa_crosTab;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitraLeTkufa_groupby";
               params.my_list=my_data.perutYitraLeTkufa_groupby;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PerutYitrot";
               params.my_list=my_data.perutYitrot;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PirteiHaasaka";
               params.my_list=my_data.pirteiHaasaka;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PirteiKisuiBeMutzar";
               params.my_list=my_data.pirteiKisuiBeMutzar;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PirteiKisuiBeMutzar_procerur";
               params.my_list=my_data.pirteiKisuiBeMutzar_procerur;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PirteiKisuiBeMutzarPrmia";
               params.my_list=my_data.pirteiKisuiBeMutzarPrmia;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="PirteiOved";
               params.my_list=my_data.pirteiOved;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="RicusKrenHishtalmut";
               params.my_list=my_data.ricusKrenHishtalmut;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="RicusPolice";
               params.my_list=my_data.ricusPolice;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="SchumeiBituahYesodi";
               params.my_list=my_data.schumeiBituahYesodi;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="YitraLefiGilPrisha";
               params.my_list=my_data.yitraLefiGilPrisha;
               workbook=  fill_sheet(params);
   
               params.work_book=workbook;
               params.sheet_name="CrossTabYitraLeTkufa_after_2000";
               params.my_list=my_data.crossTabYitraLeTkufa_after_2000;
               workbook=  fill_sheet(params);
               
               params.work_book = workbook;
               params.sheet_name = "PerutMivneDmeiNihul_crosstab";
               params.my_list = my_data.perut_mivne_dmei_nihul_crosstab;
               workbook = fill_sheet(params);
              
            //   workbook.toFileAsync("./out.xlsx");
   
   
              //  return workbook.outputAsync();

                return workbook;
              //  return workbook.outputAsync(Buffer);
               // workbook.outputAsync().then( function (data){
               //     return data;
               // });
           })
        //    .fail(function (err) {
        //      throw (err)
        //         });
   
    },
   

    async   get_excel_copy() {
        let workbook = new Excel.Workbook();
        let filename = 'C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
        await workbook.xlsx.readFile(filename);
        let worksheet = workbook.getWorksheet("RicusPolice");
        let row = worksheet.getRow(6);
        row.getCell(1).value = 15; // A5's value set to 5
        //row.commit();

        let my_list;
        try {
            my_list = my_data.heshbon_o_polisa_list;
        } catch (error) {
            my_list = xml_headers;
        }


        my_list.forEach(function (my_row, index1) {

            let i = 0;
            let keys = Object.values(my_row);
            keys.forEach(function (key) {

                row.getCell(i + 3).value = key;
                i = i + 1;

            });

            row = worksheet.getRow(index1 + 6);
        });


        return workbook;
    },

    async get_data_for_simulator_by_client_id_bak2(params) {
        let that = this;
        try {
            let db_result = await simulator_dal.get_data_for_simulator_by_client_id(params)
            let result = db_result;
          //  my_data = result;
             let my_workbook = await that.get_my_excel(result);
            // let buffer = await my_workbook.outputAsync("nodebuffer");
            
           return {};
            //  return buffer;



            // return await that.newFile();

        //      let filename='C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
        //     let workbook = await xlsx_populate.fromFileAsync(filename);
        //  //   let workbook = await xlsx_populate.fromBlankAsync();
        //  //   workbook.sheet("Sheet1").cell("A1").value("This is neat!");
        //     let buffer = await workbook.outputAsync("nodebuffer");
           
         
        //     return buffer;//await that.newFile();

        } catch (err) {
            //  console.log(err);
            throw { hasError: 1, errmsg: err };
        }




    },



    async get_data_for_simulator_by_client_id(params) {
        let that = this;
        try {
            let db_result = await simulator_dal.get_data_for_simulator_by_client_id(params)
            let result = db_result;
          //  my_data = my_data;
             let x = await that.get_my_excel(result);

 
            // let filename='C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
        //    let workbook = await xlsx_populate.fromFileAsync(filename);
        //    let workbook = await xlsx_populate.fromBlankAsync();
        //    workbook.sheet("Sheet1").cell("A1").value("This is neat!");
            let buffer = await x.outputAsync("nodebuffer");
            responseObj = {
                IsFile: true,
                Filename: "test.xlsx",
                Mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                Buffer: buffer
            };
         
            return responseObj;//await that.newFile();

        } catch (err) {
            //  console.log(err);
            throw { hasError: 1, errmsg: err };
        }




    },

    async get_data_for_simulator_by_client_id_bak(params) {
        let that = this;
        try {
            let db_result = await simulator_dal.get_data_for_simulator_by_client_id(params)
            let result = db_result;
            my_data = result;
            return await that.get_my_excel();
            //   return that.get_excel_officegen();
        } catch (err) {
            console.log(err);
            throw { hasError: 1, errmsg: err };
        }



    },

    //  let xlsx= my_xlsx('xlsx');
    // let sheet=xlsx.makeNewSheet;
    // sheet.name="my excel data";
    // sheet.setCell=('e7' ,"204")
    // sheet.setCell=('e8' ,"804")
    // var wb;
    // let filename='C:\\insur_js\\excel_files\\MySimulatorNew.xlsx';
    // try{

    //     wb=await my_xlsx.readFile(filename);
    //     return wb;
    // } catch (err) {
    //     throw { hasError: 1, errmsg: err.errmsg };  
    // }

    // async get_simulator(params) {
    //    let that=this;
    //     try {
    //        // 
    //         let newFile =  await (async () => {
    //             return new Promise(async (resolveall, rejectall) => {
    //                 try {
    //                     var buffersData = {
    //                         buffers: [],
    //                         totalLength: 0
    //                     };

    //                     let bufferStream = new stream.PassThrough();
    //                     bufferStream.on('data', (chunk) => {

    //                         buffersData.buffers.push(new Buffer(chunk));
    //                         buffersData.totalLength += chunk.length;
    //                     });

    //                     bufferStream.on('end', () => {
    //                         let fileBuff = Buffer.concat(buffersData.buffers, buffersData.totalLength);
    //                         responseObj = {
    //                             IsFile: true,
    //                             Filename: "test.xlsx",
    //                             Mimetype: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //                             Buffer: fileBuff
    //                         };
    //                         resolveall(responseObj);
    //                     });

    //                     bufferStream.on('error', (err) => {
    //                         rejectall(err);
    //                     });
    //                     // end of buffer stream

    //    let workbook = await that.get_excel_copy();


    //                     workbook.xlsx.write(bufferStream);
    //                 } catch (e) {
    //                     rejectall(e);
    //                 }
    //             });
    //         })();
    //         // api?apiType=simulator_api&method=get_simulator
    //         return newFile;

    //     } catch (err) {
    //         throw { hasError: 1, errmsg: err.errmsg };
    //     }


    //     //try {
    //     //    let bll_result = await dal_police_mislak.get_police_mislak_by_no_police_and_no_company(params)
    //     //    let result = bll_result;

    //     //    return result;





    //     //} catch (err) {
    //     //    // ... error checks 
    //     //    throw { hasError: 1, errmsg: err.errmsg };
    //     //}
    // },


}