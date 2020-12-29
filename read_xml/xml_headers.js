var xml_titls = [
    "חשבון או פוליסה",
    "כתובת למשלוח",
    "נתוני עמית",
    "שארים",
    "מסלול ביטוח",
    "שיעבוד או עיקול",
    "הלוואה",
    "תביעה",
    " מטריה ביטוחית ",
    "יתרות לגיל פרישה",
    "קופה",
    "תשואה",
    "פרטי עובד",
    "פרטי העסקה",
    "פרוט הפרשות לפוליסה",
    "מסלול ההשקעה",
    "נתוני גביה",
    "פרוט פרטי הפקדה אחרונה",
    " פרוט הפקדה אחרונה",
    "פרוט הפקדות מתחילת שנה",
    "הפקדה שנתית",
    "משיכה או ניוד",
    "חוב או פיגור",
    "הוצאות בפועל לחודש דיווח",
    "מבנה דמי ניהול",
    "יתרות לסוף שנה קודמת",
    "יתרות",
    "פרוט יתרות",
    "יתרות לפי תקופה",
    "יתרות שונות",
    "מיופה כוח",
    "זיהוי כיסוי",
    "פרטי מבוטח",
    "סכום ביטוח יסודי",
    "פרטי כיסוי במוצר",
    "פרטי תוספות",
    "מוטבים",
    "כיסוי בקרן פנסיה",
    "מקצוע עיסוק או תחביב"
];



var xml_headers = [
    heshbon_o_polisa:{
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
        "MADAD_BASIS" : "מדד בסיס",
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
        "PENSIA_VATIKA_O_HADASHA" : "פ.ותיקה/חדשה",
        "SUG_KEREN_PENSIA": "סוג ק.פנסיה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TOM_TOKEF_RISK_ZMANI": "תם ריסק זמני",
        "SugKupa": "סוג קופה",
        "SUG_KUPASugMuzar": "סוג מוצר"
    },

    ktovet_lemishloach:{
        "MyNoPolice": "מספר פוליסה",
        "KOD_MEZAHE_YATZRAN" : "מ.חברה",
        "ERETZ" : "ארץ",
        "SHEM_YISHUV" : "שם ישוב",
        "SEMEL_YESHUV" : "ס.ישוב",
        "SHEM_RECHOV" : "שם רחוב",
        "MISPAR_BAIT" : "מ.בית",
        "MISPAR_KNISA" : "מ.כניסה",
        "MISPAR_DIRA" : "מ.דירה",
        "MIKUD" : "מיקוד",
        "TA_DOAR" : "ת.דואר",
    },

netunei_amit_o_mevutach:{
        "MyNoPolice" : "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN" : "מ.חברה",
        "KOD_ZIHUY_LAKOACH_str" : "ס.תעודה",
        "IdClient" : "מ.זיהוי"
    },

    sheer:{
        "MyNoPolice": "מ.רפוליסה",
        "KOD_MEZAHE_YATZRAN" : "מ.היצרן",
        "SugZika" : "זיקה",
        "KodZihuiSheerim" : "ק.זיקה",
        "MISPAR_ZIHUY_SHEERIM" : "מ.זיהוי",
        "SHEM_PRATI_SHEERIM" : "ש.פרטי",
        "SHEM_MISHPACHA_SHEERIM" : "ש.משפחה",
        "SUG_ZIKA" : "סוג זיקה",
        "SHEM_MISHPAHA_KODEM" : "ש.משפחה קודם",
        "TAARICH_LEIDA" : "ת.לידה",
        "TAARICH_NECHONUT" : "ת.נכונות"
    },

    maslul_bituach:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN" : "מ.יצרן",
        "MLUL_BITUACH_BAKEREN_PENSIA" : "ש.מסלול ביטוח",
        "SHEM_MLUL_HABITUAH": "ש.מסלול"
    },
    
    perut_shiabud_ikul:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "HutalIkul" : "הוטל שיעבוד",
        "HutalShiabud" : "הוטל עיקול",
        "TAARICH_NECHONUT" : "נ.תאריך"

    },

    halvaa:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "YeshHalvaa" : "ק.הלוואה",
        "MISDAR_SIDURI_SHEL_HAHALVAA" : "סידורי הלוואה",
        "SCHUM_HALVAA" : "ס.ההלוואה",
        "TAARICH_KABALAT_HALVAA" : "ת.הלוואה",
        "TAARICH_SIYUM_HALVAA" : "ת.סיום",
        "YITRAT_HALVAA" : "יתרה",
        "TKUFAT_HALVAA" : "ת.הלוואה בחודשים",
        "RIBIT": "ריבת",
        "SugRibit" : "ס.ריבית",
        "SugHatznmada" : "ס.הצמדה",
        "SugHechzer" : "ס.החזר",
        "TadirutHechzer" : "תדירות החזר",
        "SCHUM_HECHZER_TKUFATI" : "החזרהתקופתי",
        "RAMAT_HALVAA" : "יחס הלוואה לפוליסה",
        "TAARICH_NECHONUT" : "נ.תאריך",
 
    },

    pirtey_tvia:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "YeshTvia": "קיימתתביעה",
        "MISPAR_TVIA_BE_YATZRAN" : "מ.תביעה",
        "MISPAR_KISUI_BE_YATZRAN" : "מ.כיסוי",
        "SHEM_KISUI_BE_YATZRAN" : "ש.כיסוי",
        "SugHatviaa" : "ס..תביעה",
        "OfenTashlum" : "א.תשלום",
        "KodStatusTviaa" : "סטטוס ",
        "TAARICH_STATUS_TVIA" : "ת.סטטוס",
        "ACHUZ_MEUSHAR_O_K_A_SHICHRUR" : "א.מאושר א.כ.ע",
        "SCHUM_TVIA_MEUSHAR" : "ס.תביעה מאושר",
        "ACHUZ_NECHUT" : "א.נכות",
        "TAARICH_TECHILAT_TASHLUM": "ת.תחילת תשלום",
        "TAARICH_NECHONUT" : "נ.לתאריך",
    },

    perut_mitryot:{
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
    },

    yitra_lefi_gil_prisha:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "GIL_PRISHA" : "ג.פרישה",
        "TOTAL_CHISACHON_MITZTABER_TZAFUY" : "חיסכון כ.פרמיות",
        "TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT" : "חיסכון  ללא פרמיות",
        "MEKADEM_MOVTACH_LEPRISHA" : "מ.מובטח",
        "MEKADEM_HAVTACHST_TOCHELET_str" : "מ.המרה תתוחלת",
        "MEKADEM_HAVTACHST_TOCHELETPRISHA_str" : "הבטחת תוחלת לפי מסלול",
        "SHEM_MASLOL" : "ש.מסלול",
        "MEKADEM_HAVTACHAT_TSUA_str" : "מ.המרה כןלל תשואה",
        "MEKADEM_HAVTACHAT_TSUATKUFA_str" : "מ.ההמרה מוגבל",
        "TKUFAT_HAGBALA_BESHANIM" : "תקופת הגבלה ",
        "TOCHELET_MASHPIA_KITZBA": " תלות הקצבה בשינויים בתוחלת  ",
        "TSUA_MASHPIA_KITZBA" : "תלות הקצבה בתשואה",
        "SHEUR_PNS_ZIKNA_TZFUYA" : "פ.זקנה צפוי",
        "TAARICH_NECHONUT" : "נ.לתאריך"

    },

    kupa:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugKupa": "סוגקופה",
    "SCHUM_KITZVAT_ZIKNA" : "ק.זקנה כולל פרמיות",
    "KITZVAT_HODSHIT_TZFUYA" : "ק.זקנה ללא פרמיות",
    "ACHUZ_TSUA_BATACHAZIT" : "א.תשואה בתחזית",
    "TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT" : "חיסכון להון כולל פרמיות",
    "TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT" : "חיסכון להון ללא פרמיות",
    "TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT" : "חיסכון לקצבה כולל פרמיות",
    "TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT" : "חיסכון לקצבה ללא פרמיות",
    "TAARICH_NECHONUT" : "נ.תאריך"
    },

    tsua:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SHEUR_TSUA_NETO": "תשואה נטו מ.השנה",
        "SHEUR_TSUA_BRUTO_CHS_1" : "תשואה ברוטו בחודש האחרון לחיסכון א",
        "ACHUZ_TSUA_BRUTO_CHS_2" : "תשואה מובטחת",
        "SHEUR_TSUA_MOVTACHAT_MEYOADOT" : "תשואה ברוטו בחודש האחרון לחסכון ב",
        "REVACH_HEFSED_BENIKOI_HOZAHOT" : "רווח/הפסד נטו"
    },

//PirteiTaktziv
    pirtei_oved:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugTochnit": "ס.תוכנית",
        "MPR_MAASIK_BE_YATZRAN" : "מ.מעסיק",
        "StatusMaasik": "סטוס מעסיק",
        "SugBaalPolisa" : "ס.בעל פוליסה",
        "MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH" : "מספר ב.פוליסה שאינוהמבוטח",
        "SHEM_BAAL_POLISA_SHEEINO_MEVUTAH" : "שם ב.פוליסה שאינו המבוטח"
    },

    pirteiHaasaka:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodChishuvPolisa": "רכיב השכר",
        "SACHAR_POLISA" : "שכרל פוליסה",
        "KodOfenHatzmada" : "הצמדת שכר",
        "TAARICH_M" : "KORET" : "ת.שכר",
        "ZakautLeloTnai" : "זכאות ללא תנאי",
        "Seif_14" : "סעיף14 ",
        "TAARICH_TCHILAT_TASHLUM": "ת.תחילת הפקדות"
    },

    perut_hafrashot_le_polisa : {
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugHamafkid" : "ס.מפקיד",
        "SugHafrasha" : "ס.הפרשה",
        "ACHUZ_HAFRASHA AS": "א.הפרשה",
        "SCHUM_HAFRASHA" : "ס.הפרשה",
        "TAARICH_NECHONUT" : "ת.נכונות"
    },

    perut_maslulei_hashkaa : {
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodSugMaslul" : "ס.מסלול",
        "KodSugHafr" : "סו.הפרשה",
        "ACHUZ_HAFKADA_LEHASHKAA" : "א.הפקדה למהשקעה",
        "SHEM_MASLUL_HASHKAA" : "ש.מסלול ",
        "SHEUR_DMEI_NIHUL_HAFKADA" : "ד.נ מהפקדה",
        "SHEUR_DMEI_NIHUL_HISACHON" : "ד.נ מצבירה",
        "DMEI_NIHUL_ACHERIM" : "ד.נ אחרים",
        "TSUA_NETO" : "תשואה נטו",
        "TAARICH_NECHONUT" : "ת.נכונות",
    },

netunei_gvia:{
    "MyNoPolice": "מ.פוליסה",
    "KOD_MEZAHE_YATZRAN": "מ.יצרן",
    "SHEM_MESHALEM" : "שם משלם",
    "SugTeudaMeshalem" : "זיהוי משלם",
    "MISPAR_ZIHUY_MESHALEM" : "מ.זיהוי משלם",
    "KodEmtzaeiTashlum" : "אמצעי תשלום",
    "TadirutTashlum": "תדירות תשלום",
    "CHODESH_YECHUS" : "חודש יחוס",
    "YOM_GVIYA_BECHODESH" : "יום גביה",
    "OfenHatzmadatGvia" : "הצמדת גביה",
    "ACHUZ_TAT_SHNATIYOT" : "תת שנתיות",
    "TADIRUT_TASHLUM" : "ת.תשלום",
    "TAARICH_NECHONUT" : "נ.לתאריך"
},

    perut_pirtei_hafkada_achrona:{
    "MyNoPolice": "מ.פוליסה",
    "KOD_MEZAHE_YATZRAN": "מ.יצרן",
     "TAARICH_HAFKADA_ACHARON": "ת.הפקדה אחרונה",
    "TOTAL_HAFKADA" : "ס.ההפקדה",
    "TAARICH_ERECH_HAFKADA" : "ת.ערך ",
    "SugHafkada" : "ס.הפקדה",
    "TOTAL_HAFKADA_ACHRONA" : "סך הפקדה לחיסכון",
    "HAFKADA_LEHISCHON_A" : "הפקדה לחיסכון יסודי",
    "HAFKADA_LEHISCHON_B" : "הפקדה לחיסכון ב",
    "TAARICH_NECHONUT" : "נ.לתאריך"
},

PerutHafkadaAchrona:{
     "MyNoPolice": "מ.פוליסה",
    "KOD_MEZAHE_YATZRAN": "מ.יצרן",
    "KodSugHafrasha" : "ס.הפקדה",
    "SugHafrasha" : "ס.הפרשה",
    "SugMafkid" : "ס.מפקיד",
    "SCHUM_HAFKADA_SHESHULAM" : "ס.ההפקדה",
    "CHODESH_SACHAR" : "חודש השכר",
    "SACHAR_BERAMAT_HAFKADA" : "שכר ברמתה הפקדה",
    "TAARICH_NECHONUT" : "נ.תאריך"
},

    perut_hafkadot_metchilat_shana:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TAARICH_ERECH_HAFKADA": "תאריך ערך",
        "KodSugHafkada" : "ס.מסלול",
        "SugHafrasha" : "ס.הפרשה",
        "SugMafkid" : "ס.מפקיד",
        "SCHUM_HAFKADA_SHESHULAM" : "ס.הפקדה",
        "CHODESH_SACHAR" : "חודש שכר",
        "ZMAN_PERAON" : "זמן פרעון",
        "SACHAR_BERAMAT_HAFKADA" : "שכר ברמת ההפקדה",
        "TAARICH_NECHONUT" : "נ.לתאריך"
},

    hafkadot_shnatiyot:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT": "תגמולי עובד",
        "TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT": "תגמולי מעביד",
        "TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT": "פיצויים",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },

    meshicha_niud:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_SUG_PEULA" : "ס.פעולה",
        "RachivNimshachNuyad" : "שם הרכיב",
        "SCHOOM_MESHICHA_NIUD" : "סכום",
        "TAARICH_BIZOA" : "ת.ביצוע",
        "TAARICH_ERECH" : "ת.ערך",
        "KNAS_MESHICHA_NIUD" : "קנס",
        "TAARICH_NECHONUT" : "נ.תאריך"
},

    chov_pigur:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KayamChov" : "חוב/פיגור",
        "TAARICH_TECHILAT_PIGUR" : "ת.פיגור",
        "MISPAR_CHODSHEI_PIGUR" : "מ.חודשי פיגור",
        "SugChov" : "ס.חוב",
        "TOTAL_CHOVOT_O_PIGURIM" : "סכום החוב/פיגור",
        "KsafimLoMeshuyachim" : "כספים לא משויכים",
        "TAARICH_NECHONUT" : "נ.לתאריך"
    },

    hotzaot_bafoal_lehodesh_divoach:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SHEUR_DMEI_NIHUL_HAFKADA" : "ד.נ הפקדה",
        "TOTAL_DMEI_NIHUL_HAFKADA" : "סך ד.נ הפקדה",
        "SHEUR_DMEI_NIHUL_TZVIRA" : "ד.נ צבירה",
        "TOTAL_DMEI_NIHUL_TZVIRA" : "סך ד.נצ בירה",
        "SACH_DMEI_NIHUL_ACHERIM" : "ד.נ אחרים",
        "TOTAL_DMEI_NIHUL_POLISA_O_HESHBON" : "סך ד.נ",
        "SACH_DMEI_BITUAH_SHENIGBOO" : "סך ד.ביטוח",
        "HOTZOT_NIHUL_ASHKAOT" : "נ.השקעות",
        "DEMI_AAVARAT_MASLOL" : "ד.העברת מסלול",
        "DMEI_NIUL_MENAEL_TIKIM" : "ד.נ מ.תיקים",
        "OFEN_GEVIAT_DMEI_BITUACH_str" : "גבית ד.ביטוח",
          "TAARICH_NECHONUT" : "נ.לתאריך"
    },

    perut_mivne_dmei_nihul:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "GovaDmeiNihul" : "ד.נ לפי הוצאות",
        "SugHotzaa" : "ס.הוצאה",
        "KOD_MASLUL_DMEI_NIHUL" : "מסלול ד.נ",
        "MeafyeneiMaslulDmeiNihul" : "מאפיניי ד.נ",
        "SHEUR_DMEI_NIHUL" : "שיעור ד.נ",
        "DmeiNihulAchidim" : "ד.נ אחרים",
        "KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM" : " ד.נ ייחודיים",
        "OfenHafrasha" : "א.הפרשה",
        "SCHUM_MAX_DNHL_HAFKADA" : "סך מרבי ד.נ הפקדה",
        "SACH_DMEI_NIHUL_MASLUL" : "סך ד.נ למסלול",
        "DMEI_NIHUL_ACHERIM" : "סך ד.נ אחרים",
        "KayemetHatava" : "הטבה ד.נ",
        "KENAS_MESHICHAT_KESAFIM" : "קנס משיכה",
        "SUG_HATAVA" : "ס.הטבה",
        "ACHOZ_HATAVA" : "א.הטבה",
        "TAARICH_SIUM_HATAVA" : "ת.סיום הטבה",
         "TAARICH_NECHONUT" : "נ.לתאריך"
    },


    perut_yitrot_lesof_shana_kodemetl:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
    "YITRAT_SOF_SHANA" : "יתרת בסוף השנה",
    "ERECH_PIDYON_SOF_SHANA" : "ע.פדיון בסוף השנה",
    "ERECH_MESOLAK_SOF_SHANA" : "ע.מסולק בסוף השנה",
    "YISKON_YITRAT_KESAFIM" : "עדכוןי תרת באיזון אקטוארי",
    "TAARICH_NECHONUT" : "נ.לתאריך"
    },


    yitrotl:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },

    constsql_PerutYitrot:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodSugItra" : ".יתרה",
        "SugHafrasha" : "ס.הפרשה",
        "TOTAL_CHISACHON_MTZBR" : "חיסכון מצטבר",
        "TOTAL_ERKEI_PIDION" : "ערכי פדיון",
        "TAARICH_ERECH_TZVIROT" : "ת.צבירות",
          "TAARICH_NECHONUT": "נ.לתאריך"
    },


   perut_yitra_le_tkuf:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KodTechulatShichva" : "תכולת שיכבה",
        "RekivItraLetkufa" : "רכיב",
        "SACH_ITRA_LESHICHVA_BESHACH" : "יתרה לשכבה",
        "SugItraLtkufa" : "ס.יתרה",
        "TAARICH_ERECH_TZVIROT" : "ת.ערך",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },


    yitrot_shonot:{
       "MyNoPolice": "מ.פוליסה",
       "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM" : "פיצויים פטורים מעבידים קודמים",
        "ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM" : "ע.פדיון פיצויים פטורים לקצבה מעבידים קודמים",
        "TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA" : "פיצויים ממעבידים קודמים רצף קצבה",
        "TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT" : "פיצויים ממעבידים קודמים ברצף זכויות",
        "TZVIRAT_PITZUIM_31_12_1999_LEKITZBA" : "פיצויים 31.12.1999  לקצבה-מרצף קצבה",
        "ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI" : "ע.פדיון פיצויים לצרכי מס של מעסיק נוכחי",
        "ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT" : "ע.פדיון פיצויים מעבידים קודמים רצף זכויות",
        "ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM" : "ע.פדיון פיצויים נזיליםל הון מעבידים קודמים",
        "KayamRetzefPizuimKitzba" : "רצף פיצויים לקצבה",
        "KayamRetzefZechuyotPizuim" : "רצף זכויות פיצויים",
        "TAARICH_ERECH_TZVIROT" : "ת.יתרות",
        "ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI" : "ע.פידיון פיצויים מעסיק נוכחי",
         "TAARICH_NECHONUT": "נ.לתאריך"
    },

   perut_meyupe_koach:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KayamMeyupaKoach" : "מיופה כח",
        "SugZihuy" : "ס.מיופה כח",
        "MISPAR_ZIHUY" : "מספר מזהה",
        "SHEM_MEYUPE_KOACH" : "שם מיופה כח",
          "TAARICH_NECHONUT": "נ.לתאריך"
    },
//====================andtaktziv


    zihui_kisui:{
       "MyNoPolice": "מ.פוליסה",
       "KOD_MEZAHE_YATZRAN": "מ.יצרן",
       "MISPAR_KISUI_BE_YATZRAN" : "מ.כיסוי",
       "SHEM_KISUI_YATZRAN" : "ש.כיסוי",
       "SUG_KISUI_ETZEL_YATZRAN_str" : "ס.כיסוי",
       "TAARICH_NECHONUT": "נ.לתאריך"
    },

    pirtei_mevutach:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SUG_TEUDA_str": "ס.תעודה",
        "IdClient": "מ.זיהוי"
    },

   schumei_bituah_yesodi:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI" : "קוד מוצר",
        "SCHUM_BITUACH_LEMASLUL" : "ס.ביטוח למסלול",
        "MISPAR_MASKOROT" : "מ.משכורות",
        "ACHUZ_HAKTZAA_LE_CHISACHON" : "הקצאה לחיסכון",
        "TIKRAT_GAG_HATAM_LEMIKRE_MAVET" : "תקרת למוות",
        "TIKRAT_GAG_HATAM_LE_O_K_A" : "תקרת לאכע",
        "SCHUM_BITUAH_LEMAVET" : "ס.ביטוח למוות",
        "SugHaZmada" : "ס.הצמדה",
        "SchumBituahKolel" : "ס.הביטוח כולל חיסכון",
        "SugMaslulLebituah" : "ס.ביטוח",
        "SHEM_KISUI_YATZRAN" : "ש.כיסוי",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },

    pirtei_kisui_be_mutzari:{
       "MyNoPolice": "מ.פוליסה",
       "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "KOD_MIUTZAR_LAKISUY" : "ק.מוצר",
        "TAARICH_TCHILAT_KISUY" : "ת.תחילת הכיסוי",
        "SHEM_KISUI_YATZRAN" : "ש.הכיסוי",
        "SUG_KISUY_BITOCHI_str" : "ס.הכיסוי",
        "SCHUM_BITUACH" : "ס.הביטוח",
        "DMEI_BITUAH_LETASHLUM_BAPOAL " : "ד.ביטוח",
        "TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM" : "תדירות שינוי ד.ביטוח",
        "SugMevutach" : "ס.מבוטח",
        "OfenTashlum" : "א.תשלום ס.ביטוח",
        "MeshalemHakisuy" : "משלם הכיסוי",
        "KodIshun" : "האם מעשן",
        "IndChitum" : "נערך חיתום",
        "Hachraga" : "יש החרגה",
        "SugHachraga" : "ס.ההחרגה",
        "TAARICH_TOM_KISUY" : "ת.תום הכיסוי",
        "TAARICH_HAFSAKAT_TASHLUM" : "ת.הפסקת תשלום",
        "ACHUZ_ME_SCM_BTH_YESODI" : "א.מביטוח יסודי",
        "ACHUZ_MESACHAR" : "אחוז/ כפולת שכר",
        "TAARICH_CHITUM" : "ת.החיתום",
        "TKUFAT_ACHSHARA" : "ת.אכשרה בחודשים",
        "TKUFAT_HAMTANA_CHODASHIM" : "ת.המתנה בחודשים",
        "TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH" : "ת.העדכון ד.הביטוח",
        "Hanacha" : "הנחה ד.ביטוח",
        "SUG_HANACHA_KISUY_str" : "ס.הנחה",
        "HatnayaLahanacha" : "התניה להנחה",
        "ERECH_HANACHA_BEKISUI" : "ערך ההנחה",
        "SHIUR_HANACHA_BEKISUI" : "שיעור ההנחה",
        "KOD_NISPACH_KISUY" : "נספח כיסוי",
        "SUG_ISUK_str" : "סוגעיסוק",
        "Kolel_Prenzisa_satr" : "כולל פרנציזה",
          "TAARICH_NECHONUT": "נ.לתאריך"
    },

    pirtei_tosafot:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TosefetTaarif" : "תוספת לתעריף",
        "KodSugToseft" : "ס.התוספת",
        "SHEUR_TOSEFET" : "א.התוספת",
        "TAARICH_TOM_TOSEFET" : "ת.תום תוספת",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },
    constsql_Mutav:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "SugZihuyMutav" : "זיהוי מוטב",
        "KodZihuyMutav" : "ס.תעודה",
        "MISPAR_ZIHUY_MUTAV" : "מ.זיהוי",
        "SHEM_PRATI_MUTAV" : "ש.פרטי",
        "SHEM_MISHPACHA_MUTAV" : "ש.משפחה",
        "SugZika" : "זיקה",
        "ACHUZ_MUTAV" : "חלק המוטב",
        "MahutMutav" : "מהות המוטב",
        "HagdaratMutav" : "הגדרת מוטב",
         "TAARICH_NECHONUT": "נ.לתאריך"
    },

    kisui_b_keren_pensia:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "ECHUT" : "עלות נכות",
        "ALUT_KISUI_PNS_SHRM_NECHE" : "עלות פ.שארים",
        "SHEUR_KISUY_NECHUT" : "שיעור כיסוי נכות",
        "SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM" : "שכר קובע לנכות ושאירים",
        "TAARICH_M" : "KORET_NECHUT_VE_SHEERIM" : "ת.נכונות שכר קובע",
        "SACH_PENSIAT_NECHUT" : "סך פ.נכות",
        "ALUT_KISUY_SHEERIM" : "עלות שארים",
        "SHIUR_KISUY_YATOM" : "שיעור ליתום",
        "KITZBAT_SHEERIM_LEALMAN_O_ALMANA" : "ק.שארים לבן זוג",
        "KITZBAT_SHEERIM_LEYATOM" : "ק.שארים ליתום",
        "KITZBAT_SHEERIM_LEHORE_NITMACH" : "ק.שארים להורה",
        "SHIUR_KISUY_ALMAN_O_ALMANA" : "שיעור כיסוי לבןזוג",
        "SHIUR_KISUY_HORE_NITMACH" : "שיעור כיסוי להורה",
        "GIL_PRISHA_LEPENSIYAT_ZIKNA" : "גיל פרישה",
        "SACH_PENSIYAT_ALMAN_O_ALMANA" : "פנסיית אלמנן/ה לא פעיל",
        "MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA" : "חודשי חברות רצופים",
        "MENAT_PENSIA_TZVURA" : "מנת פ.צבורה",
        "AHUZ_PENSIYA_TZVURA" : "אחוז פ.צבורה",
        "TAARICH_TCHILAT_HAVERUT" : "ת.תחילת חברות",
        "TAARICH_ERECH_LANENTUNIM" : "ת.ערך לנתונים",
        "HatavaBituchit" : "הטבה ביטוחית",
        "SUG_VITOR_SHAERIM" : "ויתור שארים",
        "TAARICH_VITOR_SHEERIM" : "ת.ויתור שארים",
        "TAARICH_CIUM_VITOR_SEERIM" : "ת.סיוםו יתור שארים",
        "MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA" : "חודשי חברות ק.פנסיה ותיקה",
        "TAARICH_NECHONUT": "נ.לתאריך"
    },

   miktsoa_isuk_tachviv:{
        "MyNoPolice": "מ.פוליסה",
        "KOD_MEZAHE_YATZRAN": "מ.יצרן",
        "TACHVIVIM_O_ISUKIM" : "תחביבים/עיסוקים",
        "KOD_MIKTZOA" : "מקצוע",
        "TCHUM_ISUK_CHAD" : "H" : "עיסוק",
        "TAARICH_NECHONUT": "נ.לתאריך"
    }

    ]





