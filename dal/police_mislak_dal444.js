var config = require("../config").config;
const sql = require('mssql');

const sql_where = " WHERE(MyNoPolice = @MyNoPolice') AND (KOD_MEZAHE_YATZRAN = @KOD_MEZAHE_YATZRAN) " +
    " OR (IdClient=@IdClient)  ; ";

const sql_heshbon_o_polisa = "SELECT   " +
    " IdClient AS [מספר זהות] "
", MISPAR_POLISA_O_HESHBON AS [מספר פוליסה] " +
    " , CompanyName AS [שם חברה]" +
    ", TAARICH_NECHONUT AS [נכון לתאריך]" +
    "    , TAARICH_HITZTARFUT_MUTZAR AS [תאריך הצטרפות]" +
    "    ,  PensiaVatikaOHadasha AS [קרן פנסיה]" +
    ", SugKerenPenNsia AS [תוכנית פנסיה]" +
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
    ", PENSIA_VATIKA_O_HADASHA  AS [פהסיה ותיקה או חדשה] " +
    " , SUG_KEREN_PENSIA AS [סוג ק. פנסיה] " +
    ", KOD_MEZAHE_YATZRAN " +
    " , TOM_TOKEF_RISK_ZMANI AS [תם ריסק זמני] " +
    ", SugKupa AS [סוג קופה] " +
    ", SUG_KUPA, SugMuzar AS [סוג מוצר] " +
    " ,  SUG_TOCHNIT_O_CHESHBON " +
    " FROM         dbo.HeshbonOPolisaDBWithParams " +
    " WHERE (MISPAR_POLISA_O_HESHBON = @MyNoPolice') AND (KOD_MEZAHE_YATZRAN = @KOD_MEZAHE_YATZRAN) " +
    " OR (IdClient=@IdClient)  ; ";

const sql_ktovet_lemishloach = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    ", KOD_MEZAHE_YATZRAN AS [מזהה חברה] " +
    ", ERETZ AS  [ארץ] " +
    ", SHEM_YISHUV AS [שם ישוב] " +
    ", SEMEL_YESHUV AS [סמל ישוב] " +
    ", SHEM_RECHOV AS [שם רחוב] " +
    ",  MISPAR_BAIT AS [מספר בית] " +
    ", MISPAR_KNISA AS [מספר כניסה] " +
    ", MISPAR_DIRA AS [מספר דירה] " +
    ", MIKUD AS [מיקוד] "
", TA_DOAR AS [תיבת דואר] " +
    "  FROM         dbo.KtovetLemishloachDB " + sql_where;


const sql_netunei_amit_o_mevutach = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    ", KOD_MEZAHE_YATZRAN AS [מזהה חברה] " +
    ", KOD_ZIHUY_LAKOACH_str AS [סוג תעודה] " +
    ", IdClient AS [מספר זיהוי] " +
    " FROM         dbo.NetuneiAmitOmevutachWithParams " + sql_where;


const sql_sheer = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " , SugZika AS  זיקה "
", KodZihuiSheerim AS [קוד זיקה] " +
    ", MISPAR_ZIHUY_SHEERIM AS [מספר זיהוי] " +
    ", SHEM_PRATI_SHEERIM AS [שם פרטי] " +
    " ,SHEM_MISHPACHA_SHEERIM AS [שם משפחה ] " +
    ", SUG_ZIKA AS [סוג זיקה] " +
    ", SHEM_MISHPAHA_KODEM AS [שם משפחה קודם] " +
    ", TAARICH_LEIDA AS [תאריך לידה] " +
    ", TAARICH_NECHONUT AS [תאריך נכונות" +
    "  FROM         dbo.SheerDBWithParams " + sql_where;


const sql_maslul_bituach = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " , MASLUL_BITUACH_BAKEREN_PENSIA AS [שם מסלול בק.פנסיה] " +
    ", SHEM_MASLUL_HABITUAH AS [שם מסלול] " +
    " FROM         dbo.MaslulBituachDB " + sql_where;


const sql_perut_shiabud_ikul = "SELECT   " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", HutalIkul AS [הוטל שיעבוד] " +
    ", HutalShiabud AS [הוטל עיקול] " +
    " , TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.PerutShiabudIkulDBWithParams " + sql_where;


const sql_halvaa = "SELECT   " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",YeshHalvaa AS [קיימת הלוואה] " +
    ", MISDAR_SIDURI_SHEL_HAHALVAA AS [סידורי הלוואה] " +
    ", SCHUM_HALVAA AS [סכום ההלוואה] " +
    ", TAARICH_KABALAT_HALVAA AS [ת.קבלת ההלוואה] " +
    ",TAARICH_SIYUM_HALVAA AS [ת.סיום ההלוואה] " +
    ", YITRAT_HALVAA AS [יתרת ההלוואה] " +
    ", TKUFAT_HALVAA AS [תקופת הלוואה בחודשים] " +
    ", RIBIT AS ריבת, SugRibit AS [סוג ריבית] " +
    ", SugHatznmada AS [סוג הצמדה] " +
    ",SugHechzer AS [סוג החזר] " +
    ", TadirutHechzer AS [תדירות החזר] " +
    ", SCHUM_HECHZER_TKUFATI AS [החזר התקופתי] " +
    ", RAMAT_HALVAA AS [יחס הלוואה לפוליסה] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.HalvaaDBWithParams " + sql_where;


const sql_pirtey_tvia = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", YeshTvia AS [קיימת תביעה] " +
    ", MISPAR_TVIA_BE_YATZRAN AS [מספר תביעה] " +
    ", MISPAR_KISUI_BE_YATZRAN AS [מספר כיסוי] " +
    ", SHEM_KISUI_BE_YATZRAN AS [שם כיסוי] " +
    ", SugHatviaa AS [סוג התביעה] " +
    ", OfenTashlum AS [אופן תשלום] " +
    ", KodStatusTviaa AS [סטטוס תביעה] " +
    ", TAARICH_STATUS_TVIA AS [תאריך סטטוס] " +
    ", ACHUZ_MEUSHAR_O_K_A_SHICHRUR AS [אחוז מאושר א.כ.ע] " +
    " ,SCHUM_TVIA_MEUSHAR AS [סכום תביעה מאושר] " +
    ", ACHUZ_NECHUT AS [אחוז נכות] " +
    ", TAARICH_TECHILAT_TASHLUM  AS [ת.תחילת תשלום] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    ", FROM         dbo.PirteyTviaWithParams " + sql_where;


const sql_perut_mitryot = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM AS [כיסוי קולקטיבי] " +
    ", SHEM_MEVATACHAT AS [שם חברה] " +
    ", TAARICH_TCHILAT_HABITUACH AS [ת.תחילת הביטוח] " +
    ", TAARICH_TOM_TKUFAT_HABITUAH AS [ת.תום הביטוח] " +
    ", SCHUM_BITUACH AS [סכום הביטוח] " +
    ", ALUT_KISUI AS [עלות הכיסוי] " +
    ", KOD_SUG_MUTZAR_BITUACH_str AS [סוג הביטוח] " +
    ", MESHALEM_DMEI_HABITUAH_str AS [משלם הפרמיה] " +
    ", HAIM_NECHTAM_TOFES_HITZTARFUT_str AS [טופס הצטרפות] " +
    ", TADIRUT_HATSHLUM_str AS [תדירות תשלום] " +
    " ,TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutMitryotDBWithParams " + sql_where;


const sql_YitraLefiGilPrisha = " SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", GIL_PRISHA AS [גיל פרישה] " +
    ", TOTAL_CHISACHON_MITZTABER_TZAFUY AS [חיסכון צפןי  כולל פרמיות] " +
    ", TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT AS [חיסכון צפןי ללא פרמיות] " +
    ", MEKADEM_MOVTACH_LEPRISHA AS [מקדם מובטח לפרישה] " +
    ", MEKADEM_HAVTACHST_TOCHELET_str AS [מקדם המרה הכולל הבטחת תוחלת חיים] " +
    ", MEKADEM_HAVTACHST_TOCHELETPRISHA_str AS [הבטחת תוחלת החיים מותנית בבחירת מסלול פרישה] "
", SHEM_MASLOL  AS [שם מסלול] " +
    ",   MEKADEM_HAVTACHAT_TSUA_str AS [מקדם המרה המגלם הבטחת תשואה]" +
    ", MEKADEM_HAVTACHAT_TSUATKUFA_str AS [מקדם ההמרה המגלם הבטחת תשואה מוגבל בתקופה] " +
    ",  TKUFAT_HAGBALA_BESHANIM  AS [תקופת הגבלה בשנים] " +
    ", TOCHELET_MASHPIA_KITZBA  AS  [שינויים בתוחלת החיים משפיעים על עדכון קצבה] " +
    ", TSUA_MASHPIA_KITZBA  AS [שינויים בתשואה משפיעים על עדכון קצבה] " +
    ", SHEUR_PNS_ZIKNA_TZFUYA  AS [שיעור פ.זקנה צפוי] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.YitraLefiGilPrishaWithParams " + sql_where;


const sql_Kupa = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " SugKupa AS [סוג קופה] " +
    ", SCHUM_KITZVAT_ZIKNA AS [ק.זקנה  צפויה כולל פרמיות] " +
    ", KITZVAT_HODSHIT_TZFUYA AS [ק.זקנה  צפויה  ללא פרמיות] " +
    ", ACHUZ_TSUA_BATACHAZIT AS [אחוז תשואה בתחזית] " +
    ", TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT AS [חיסכון להון כולל פרמיות] " +
    ",TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT AS [חיסכון להון ללא פרמיות] " +
    ", TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT AS [חיסכון לקצבה כולל פרמיות] " +
    ",TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT AS [חיסכון לקצבה ללא פרמיות] " +
    " , TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.KupaDBWithParams " + sql_where;


const sql_Tsua = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", SHEUR_TSUA_NETO AS [תשואה נטו  מתחילת השנה] " +
    ", SHEUR_TSUA_BRUTO_CHS_1 AS [תשואה ברוטו  בחודש האחרון לחיסכון א] " +
    ", ACHUZ_TSUA_BRUTO_CHS_2 AS [תשואה מובטחת] " +
    ", SHEUR_TSUA_MOVTACHAT_MEYOADOT AS [תשואה ברוטו  בחודש האחרון לחסכון ב] " +
    ", REVACH_HEFSED_BENIKOI_HOZAHOT AS [רווח / הפסד נטו] " +
    " FROM         dbo.TsuaDBWithParams " + sql_where;

//  PirteiTaktziv
const sql_PirteiOved = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",SugTochnit AS [סוג תוכנית] " +
    ", MPR_MAASIK_BE_YATZRAN AS [מספר מעסיק] " +
    ", StatusMaasik AS [סטוס מעסיק] " +
    ", SugBaalPolisa AS [סוג בעל פוליסה] " +
    ",MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH AS [מספר ב.פוליסה  שאינו המבוטח] " +
    ", SHEM_BAAL_POLISA_SHEEINO_MEVUTAH AS [שם ב.פוליסה  שאינו המבוטח] " +
    " FROM         dbo.PirteiOvedDBWithParams " + sql_where;


const sql_PirteiHaasaka = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", KodChishuvPolisa AS [רכיב השכר] " +
    ", SACHAR_POLISA AS [שכר לפוליסה] " +
    ", KodOfenHatzmada AS [אופן הצמדת שכר] " +
    " , TAARICH_MASKORET AS [תאריך שכר] " +
    ", ZakautLeloTnai AS [זכאות ללא תנאי] " +
    ",  Seif_14 AS [סעיף 14] " +
    ", TAARICH_TCHILAT_TASHLUM AS [ת.תחילת הפקדות] " +
    " FROM         dbo.PirteiHaasakaDBWithParams " + sql_where;


const sql_PerutHafrashotLePolisa = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", SugHamafkid AS [סוג המפקיד] " +
    ", SugHafrasha AS [סוג הפרשה] " +
    ", ACHUZ_HAFRASHA  AS [אחוז הפרשה] " +
    ", SCHUM_HAFRASHA  AS [סכום הפרשה] " +
    ",TAARICH_NECHONUT AS [תאריך נכונות] " +
    "   FROM         dbo.PerutHafrashotLePolisaDBWithParams " + sql_where;


const sql_PerutMasluleiHashkaa = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",KodSugMaslul AS [סוג מסלול] " +
    ", KodSugHafrasha AS [סוג הפרשה] " +
    ", ACHUZ_HAFKADA_LEHASHKAA AS [אחוז ההפקדה למסלול ההשקעה] " +
    " , SHEM_MASLUL_HASHKAA  AS [שם מסלול השקעה] " +
    ", SHEUR_DMEI_NIHUL_HAFKADA  AS [דמי ניהול מהפקדה] " +
    ", SHEUR_DMEI_NIHUL_HISACHON AS [דמי ניהול מצבירה] " +
    " ,DMEI_NIHUL_ACHERIM AS [דמי ניהול אחרים] " +
    ", TSUA_NETO AS [תשואה נטו] " +
    ", TAARICH_NECHONUT AS [תאריך נכונות] " +
    "  FROM         dbo.PerutMasluleiHashkaaDBWithParams " + sql_where;

const sql_NetuneiGvia = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", SHEM_MESHALEM AS [שם משלם] " +
    ", SugTeudaMeshalem AS [זיהוי משלם] " +
    ", MISPAR_ZIHUY_MESHALEM AS [מ.זיהוי משלם] " +
    ", KodEmtzaeiTashlum AS [אמצעי תשלום] " +
    ", TadirutTashlum AS [תדירות תשלום] " +
    ", CHODESH_YECHUS AS [חודש יחוס] " +
    ", YOM_GVIYA_BECHODESH AS [יום גביה] " +
    ", OfenHatzmadatGvia AS [הצמדת גביה] " +
    ", ACHUZ_TAT_SHNATIYOT AS [תת שנתיות] " +
    ", TADIRUT_TASHLUM AS [תאריך תשלום] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.NetuneiGviaDBWithParams " + sql_where;


const sql_PerutPirteiHafkadaAchrona = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", TAARICH_HAFKADA_ACHARON AS [ת.הפקדה אחרונה] " +
    ", TOTAL_HAFKADA AS [סכום ההפקדה] " +
    ", TAARICH_ERECH_HAFKADA AS [ת.ערך הפקדה] " +
    ", SugHafkada AS [סוג הפקדה] " +
    " , TOTAL_HAFKADA_ACHRONA AS [סך הפקדה לחיסכון] " +
    ", HAFKADA_LEHISCHON_A AS [הפקדה לחיסכון יסודי] " +
    ", HAFKADA_LEHISCHON_B AS [הפקדה לחיסכון ב] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutPirteiHafkadaAchronaDBWithParams " + sql_where;


const sql_PerutHafkadaAchrona = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", KodSugHafrasha AS [סוג הפקדה] " +
    ", SugHafrasha AS [סוג הפרשה] " +
    ", SugMafkid AS [סוג מפקיד] " +
    ", SCHUM_HAFKADA_SHESHULAM AS [סכום ההפקדה] " +
    ", CHODESH_SACHAR AS [חודש השכר] " +
    " ,SACHAR_BERAMAT_HAFKADA AS [שכר ברמת ההפקדה] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutHafkadaAchronaDBWithParams " + sql_where;


const sql_PerutHafkadotMetchilatShana = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " ,TAARICH_ERECH_HAFKADA  As [תאריך ערך הפקדה] " +
    ", KodSugHafkada AS [סוג מסלול] " +
    ", SugHafrasha AS [סוג הפרשה] " +
    ", SugMafkid AS [סוג מפקיד] " +
    ", SCHUM_HAFKADA_SHESHULAM AS [סכום הפקדה] " +
    " ,CHODESH_SACHAR AS [חודש שכר] " +
    ", ZMAN_PERAON AS [זמן פרעון] " +
    ", SACHAR_BERAMAT_HAFKADA AS [שכר ברמת ההפקדה] "
", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutHafkadotMetchilatShanaDBWithParams " + sql_where;


const sql_HafkadotShnatiyot = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",  TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT AS [תגמולי עובד] " +
    ", TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT AS [תגמולי מעביד] " +
    ",   TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT AS פיצויים, TAARICH_NECHONUT " +
    "  FROM         dbo.HafkadotShnatiyotDBWithParams " + sql_where;


const sql_MeshichaNiud = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",  KOD_SUG_PEULA AS [סוג פעולה] " +
    ", RachivNimshachNuyad AS [שם הרכיב] " +
    ", SCHOOM_MESHICHA_NIUD AS סכום " +
    ", TAARICH_BIZOA AS [תאריך ביצוע] " +
    ",TAARICH_ERECH AS [תאריך ערך] " +
    ", KNAS_MESHICHA_NIUD AS  קנס " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.MeshichaNiudDBWithParams " + sql_where;


const sql_ChovPigur = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", KayamChov AS [חוב  או פיגור] " +
    ", TAARICH_TECHILAT_PIGUR AS [תחילת פיגור] " +
    ", MISPAR_CHODSHEI_PIGUR AS [מ.חודשי פיגור] " +
    " , SugChov AS [סוג חוב] "
", TOTAL_CHOVOT_O_PIGURIM AS [סכום החוב או פיגור] "
" , KsafimLoMeshuyachim AS [כספים לא משויכים]" +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.ChovPigurDBWithParams " + sql_where;


const sql_HotzaotBafoalLehodeshDivoach = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", SHEUR_DMEI_NIHUL_HAFKADA AS [ד.נ  הפקדה] " +
    ", TOTAL_DMEI_NIHUL_HAFKADA AS [סך ד.נ  הפקדה] " +
    ", SHEUR_DMEI_NIHUL_TZVIRA AS [ד.נ  צבירה ] " +
    ", TOTAL_DMEI_NIHUL_TZVIRA AS [סך ד.נ  צבירה] " +
    ",SACH_DMEI_NIHUL_ACHERIM AS [ד.נ אחרים] " +
    ", TOTAL_DMEI_NIHUL_POLISA_O_HESHBON AS [סך ד.נ] " +
    ", SACH_DMEI_BITUAH_SHENIGBOO AS [סך ד.ביטוח] " +
    ", HOTZOT_NIHUL_ASHKAOT AS [ניהול השקעות] " +
    ",DEMI_AAVARAT_MASLOL  AS [ד.העברת מסלול] " +
    ", DMEI_NIUL_MENAEL_TIKIM AS [ד.נ  מנהל תיקים] " +
    ", OFEN_GEVIAT_DMEI_BITUACH_str AS [גבית ד.ביטוח] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.HotzaotBafoalLehodeshDivoachDBWithParams " + sql_where;


const sql_PerutMivneDmeiNihul = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",GovaDmeiNihul AS [ד.נ  לפי הוצאות] " +
    ", SugHotzaa AS [סוג הוצאה] " +
    ", KOD_MASLUL_DMEI_NIHUL AS [קוד מסלול ד.נ] " +
    ", MeafyeneiMaslulDmeiNihul AS [מאפיניי ד.נ] " +
    ", SHEUR_DMEI_NIHUL AS [שיעור ד.נ] " +
    ", DmeiNihulAchidim AS [ד.נ אחרים] " +
    ", KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM AS [קוד ד.נ הייחודיים] " +
    ", OfenHafrasha AS [אופן הפרשה] " +
    ", SCHUM_MAX_DNHL_HAFKADA AS [סך מרבי ד.נ הפקדה] " +
    ", SACH_DMEI_NIHUL_MASLUL AS [סך ד.נ למסלול] " +
    ", DMEI_NIHUL_ACHERIM AS [סך ד.נ אחרים] "
", KayemetHatava AS [הטבה ד.נ] " +
    ", KENAS_MESHICHAT_KESAFIM AS [קנס משיכה] " +
    ", SUG_HATAVA AS [סוג הטבה] " +
    ", ACHOZ_HATAVA AS [אחוז הטבה ] "
", TAARICH_SIUM_HATAVA AS [ת.סיום הטבה] "
", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutMivneDmeiNihulDBWithParams " + sql_where;


const sql_PerutYitrotLesofShanaKodemet = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",YITRAT_SOF_SHANA AS [יתרת בסוף השנה] " +
    ", ERECH_PIDYON_SOF_SHANA AS [ע.פדיון בסוף השנה] " +
    ", ERECH_MESOLAK_SOF_SHANA AS [ע.מסולק בסוף השנה] "
"YISKON_YITRAT_KESAFIM AS [עדכון יתרת באיזון אקטוארי] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutYitrotLesofShanaKodemeDBWithParams " + sql_where;


const sql_Yitrot = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " TAARICH_ERECH_TZVIROT AS [נכון לתאריך] " +
    " FROM         dbo.YitrotDB " + sql_where;


const sql_PerutYitrot = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",KodSugItra AS [סוג יתרה] " +
    ", SugHafrasha AS [סוג הפרשה] " +
    ", TOTAL_CHISACHON_MTZBR AS [חיסכון מצטבר] " +
    ", TOTAL_ERKEI_PIDION AS [ערכי פדיון] "
", TAARICH_ERECH_TZVIROT AS [תאריך צבירות] " +
    "  TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.PerutYitrotDBWithParams " + sql_where;


const sql_PerutYitraLeTkufa = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",KodTechulatShichva AS [תכולת שיכבה] " +
    ", RekivItraLetkufa AS רכיב "
", SACH_ITRA_LESHICHVA_BESHACH AS [יתרה לשכבה] " +
    ", SugItraLtkufa AS [סוג יתרה] "
", TAARICH_ERECH_TZVIROT AS [תאריך ערך] " +
    ". TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.PerutYitraLeTkufaDBWithParams " + sql_where;


const sql_YitrotShonot = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",  TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM AS [פיצויים פטורים  מעבידים קודמים] " +
    ", ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM AS [ע.פדיון פיצויים פטורים  לקצבה מעבידים קודמים] " +
    ", TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA AS [פיצויים ממעבידים קודמים רצף קצבה] " +
    ", TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT AS [פיצויים ממעבידים קודמים ברצף זכויות] " +
    ", TZVIRAT_PITZUIM_31_12_1999_LEKITZBA AS [פיצויים 31.12.1999 לקצבה - מרצף קצבה] " +
    ", ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI AS [ע.פדיון פיצויים לצרכי מס של מעסיק נוכחי] " +
    ", ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT AS [ע.פדיון פיצויים מעבידים קודמים רצף זכויות] " +
    ", ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM AS [ע.פדיון פיצויים נזילים להון מעבידים קודמים] " +
    ", KayamRetzefPizuimKitzba AS [רצף  פיצויים לקצבה] " +
    ", KayamRetzefZechuyotPizuim AS [רצף זכויות פיצויים] " +
    ", TAARICH_ERECH_TZVIROT AS [תאריך יתרות] " +
    ", ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI AS [ערך פידיון פיצויים מעסיק נוכחי] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.YitrotShonotDBWithParams " + sql_where;


const sql_PerutMeyupeKoach = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", KayamMeyupaKoach AS [מיופה כח] " +
    ", SugZihuy AS [סוג מיופה כח] " +
    ", MISPAR_ZIHUY AS [מספר מזהה] " +
    ", SHEM_MEYUPE_KOACH AS [שם מיופה כח] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PerutMeyupeKoachDBWithParams " + sql_where;

// ==================== and taktziv


const sql_ZihuiKisui = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",MISPAR_KISUI_BE_YATZRAN AS [מספר כיסוי] " +
    ", SHEM_KISUI_YATZRAN AS [שם כיסוי] " +
    ", SUG_KISUI_ETZEL_YATZRAN_str AS [סוג כיסוי] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.ZihuiKisuiDBWithParams " + sql_where;


const sql_PirteiMevutach = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    "SUG_TEUDA_str AS [סוג תעודה] " +
    ", IdClient AS [מספר זיהוי] " +
    " FROM         dbo.PirteiMevutachWithParams " + sql_where;

const sql_SchumeiBituahYesodi = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI AS [קוד מוצר] " +
    ", SCHUM_BITUACH_LEMASLUL  AS [סכום ביטוח למסלול] " +
    ", MISPAR_MASKOROT AS [מספר משכורות] " +
    ", ACHUZ_HAKTZAA_LE_CHISACHON AS [הקצאה לחיסכון] " +
    ", TIKRAT_GAG_HATAM_LEMIKRE_MAVET AS [תקרת  למקרה מוות] " +
    ", TIKRAT_GAG_HATAM_LE_O_K_A AS [תקרת לאכע] " +
    ",SCHUM_BITUAH_LEMAVET AS [ס.ביטוח למוות] " +
    ", SugHaZmada AS [סוג הצמדה] " +
    ", SchumBituahKolel AS [סכום הביטוח כולל  חיסכון] " +
    ", SugMaslulLebituah AS [סוג ביטוח] " +
    ", SHEM_KISUI_YATZRAN AS [שם כיסוי] " +
    " ,TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.SchumeiBituahYesodiDBWithParam " + sql_where;


const sql_PirteiKisuiBeMutzar = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",KOD_MIUTZAR_LAKISUY AS [קוד מוצר] " +
    ", TAARICH_TCHILAT_KISUY AS [ת.תחילת הכיסוי] " +
    ", SHEM_KISUI_YATZRAN AS [שם הכיסוי] " +
    ", SUG_KISUY_BITOCHI_str AS [סוג הכיסוי] " +
    ",SCHUM_BITUACH AS [סכום הביטוח] " +
    ", DMEI_BITUAH_LETASHLUM_BAPOAL AS [דמי ביטוח] " +
    ", TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM AS [תדירות שינוי ד.הביטוח] " +
    ", SugMevutach AS [סוג מבוטח] " +
    ", OfenTashlum AS [אופן תשלום ס.ביטוח] " +
    ", MeshalemHakisuy AS [משלם הכיסוי] " +
    ", KodIshun AS [האם מעשן] " +
    ", IndChitum AS [נערך חיתום למבוטח] " +
    ", Hachraga AS [יש החרגה] " +
    ", SugHachraga AS [סוג ההחרגה] " +
    ",TAARICH_TOM_KISUY AS [ת.תום הכיסוי] " +
    ", TAARICH_HAFSAKAT_TASHLUM AS [ת.הפסקת תשלום] " +
    ", ACHUZ_ME_SCM_BTH_YESODI AS [אחוז מביטוח יסודי] " +
    ", ACHUZ_MESACHAR AS [אחוז או כפולת שכר] " +
    ",TAARICH_CHITUM AS [תאריך החיתום] " +
    ", TKUFAT_ACHSHARA AS [ת.אכשרה בחודשים] " +
    ", TKUFAT_HAMTANA_CHODASHIM AS [ת.המתנה בחודשים] " +
    ",TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH AS [ת.העדכון ד.הביטוח] " +
    ", Hanacha AS [הנחה ד.ביטוח] " +
    ", SUG_HANACHA_KISUY_str AS [סוג הנחה] " +
    ", HatnayaLahanacha AS [התניה להנחה] " +
    " ,ERECH_HANACHA_BEKISUI AS [ערך ההנחה] " +
    ", SHIUR_HANACHA_BEKISUI AS [שיעור ההנחה] " +
    ", KOD_NISPACH_KISUY AS [קוד נספח כיסוי] " +
    ", SUG_ISUK_str AS [סוג עיסוק] " +
    ", Kolel_Prenzisa_satr AS [כולל פרנציזה] " +
    " ,TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.PirteiKisuiBeMutzarDBWithParam " + sql_where;


const PirteiTosafot = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    " ,TosefetTaarif AS [תוספת לתעריף] " +
    ", KodSugToseft AS [סוג התוספת] " +
    ", SHEUR_TOSEFET AS [שיעור התוספת] " +
    ", TAARICH_TOM_TOSEFET AS [ת.תום תוספת] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    "  FROM         dbo.PirteiTosafotDBWithParams " + sql_where;


const sql_Mutav = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", SugZihuyMutav AS [יהוי מוטב] " +
    ", KodZihuyMutav AS [סוג תעודה] " +
    ", MISPAR_ZIHUY_MUTAV AS [מספר זיהוי] " +
    ", SHEM_PRATI_MUTAV AS [שם פרטי] " +
    ", SHEM_MISHPACHA_MUTAV AS [שם משפחה] " +
    ", SugZika AS זיקה " +
    " ,ACHUZ_MUTAV AS [חלק המוטב] " +
    ", MahutMutav AS [מהות המוטב] " +
    ", HagdaratMutav AS [הגדרת מוטב] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.MutavDBWithParams " + sql_where;


const sql_KisuiBKerenPensia = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ", ECHUT AS [עלות נכות] " +
    ", ALUT_KISUI_PNS_SHRM_NECHE AS [עלות פ.שארים] " +
    ", SHEUR_KISUY_NECHUT AS [שיעור כיסוי נכות] " +
    ",SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM AS [שכר קובע לנכות ושאירים] "
", TAARICH_MASKORET_NECHUT_VE_SHEERIM AS [ת.נכונות שכר קובע] " +
    ", SACH_PENSIAT_NECHUT AS [סך פ.נכות]" +
    ", ALUT_KISUY_SHEERIM AS [עלות שארים] " +
    ", SHIUR_KISUY_YATOM AS [שיעור ליתום] " +
    ", KITZBAT_SHEERIM_LEALMAN_O_ALMANA AS [ק.שארים לבן זוג] " +
    ", KITZBAT_SHEERIM_LEYATOM AS [ק.שארים ליתום] " +
    ",KITZBAT_SHEERIM_LEHORE_NITMACH AS [ק.שארים להורה] " +
    ", SHIUR_KISUY_ALMAN_O_ALMANA AS [שיעור כיסוי לבן זוג] " +
    ", SHIUR_KISUY_HORE_NITMACH AS [שיעור כיסוי להורה]" +
    ", GIL_PRISHA_LEPENSIYAT_ZIKNA AS [גיל פרישה] " +
    ", SACH_PENSIYAT_ALMAN_O_ALMANA AS [פנסיית אלמנן/ ה לא פעיל] " +
    ", MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA AS [חודשי חברות רצופים] " +
    ", MENAT_PENSIA_TZVURA AS [מנת פנסיה צבורה] " +
    ", AHUZ_PENSIYA_TZVURA AS [אחוז פנסיה צבורה] " +
    ", TAARICH_TCHILAT_HAVERUT AS [ת.תחילת חברות] " +
    ", TAARICH_ERECH_LANENTUNIM AS [ת.ערך לנתונים] " +
    ", HatavaBituchit AS [הטבה ביטוחית] " +
    ", SUG_VITOR_SHAERIM AS [ויתור שארים] " +
    ", TAARICH_VITOR_SHEERIM AS [ת.ויתור שארים] " +
    ", TAARICH_CIUM_VITOR_SEERIM AS [ת.סיום ויתור שארים] " +
    " ,MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA AS [חודשי חברות ק.פנסיה ותיקה] " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.KisuiBKerenPensiaDBWithParams " + sql_where;


const sql_Miktsoa_Isuk_Tachviv = "SELECT " +
    " MyNoPolice AS [מספר פוליסה] " +
    " , KOD_MEZAHE_YATZRAN AS [מזהה יצרן] " +
    ",  TACHVIVIM_O_ISUKIM AS [תחביבים / עיסוקים] " +
    ", KOD_MIKTZOA AS מקצוע " +
    ", TCHUM_ISUK_CHADASH AS עיסוק " +
    ", TAARICH_NECHONUT AS [נכון לתאריך] " +
    " FROM         dbo.MiktsoaIsukTachvivDBWithParams " + sql_where;







module.exports = {

    async get_police_mislak_by_no_police_and_no_company(params) {
        var sql_str = sql_heshbon_o_polisa +
            sql_ktovet_lemishloach +
            sql_netunei_amit_o_mevutach +
            sql_sheer +
            sql_maslul_bituach +
            sql_perut_shiabud_ikul +
            sql_halvaa +
            sql_pirtey_tvia +
            sql_perut_mitryot +
            sql_YitraLefiGilPrisha +
            sql_Kupa +
            sql_Tsua +
            sql_PirteiOved +
            sql_PirteiHaasaka +
            sql_PerutHafrashotLePolisa +
            sql_PerutMasluleiHashkaa +
            sql_NetuneiGvia +
            sql_PerutPirteiHafkadaAchrona +
            sql_PerutHafkadaAchrona +
            sql_PerutHafkadotMetchilatShana +
            sql_HafkadotShnatiyot +
            sql_MeshichaNiud +
            sql_ChovPigur +
            sql_HotzaotBafoalLehodeshDivoach +
            sql_PerutMivneDmeiNihul +
            sql_PerutYitrotLesofShanaKodemet +
            sql_Yitrot +
            sql_PerutYitrot +
            sql_PerutYitraLeTkufa +
            sql_YitrotShonot +
            sql_PerutMeyupeKoach +
            sql_ZihuiKisui +
            sql_PirteiMevutach +
            sql_SchumeiBituahYesodi +
            sql_PirteiKisuiBeMutzar +
            PirteiTosafot +
            sql_Mutav +
            sql_KisuiBKerenPensia +
            sql_Miktsoa_Isuk_Tachviv;

        try {
            let pool = await sql.connect(config.mssql.test_db)
            let result = await pool.request()
                .input('MyNoPolice', sql.NVarChar, params.MyNoPolice)
                .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, params.KOD_MEZAHE_YATZRAN)
                .input('IdClient', sql.Int, params.IdClient)

                .query(sql_str);



            return result;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        finally {
            sql.close();
        }
    }

}