// police_from_mimshak
var config = require("../config").config;
var sql = require('mssql');
const dbConn = require("../dal/dbConn");

//var sql_where = " WHERE (MyNoPolice = @MyNoPolice)  AND (KOD_MEZAHE_YATZRAN = @KOD_MEZAHE_YATZRAN) " +
//    " OR (IdClient=@IdClient)  ; ";
var sql_where = "";


//sql_where = sql_where_nopolice_kod_mezae_yatzran;

var sql_where_heshbon_o_polisa = " WHERE (MISPAR_POLISA_O_HESHBON = @MyNoPolice) AND (KOD_MEZAHE_YATZRAN = @KOD_MEZAHE_YATZRAN) " +
    " ; ";
function get_sql_str(params) {
    var sql_where_nopolice_kod_mezae_yatzran =
        " WHERE (MyNoPolice = @MyNoPolice)  AND (KOD_MEZAHE_YATZRAN = @KOD_MEZAHE_YATZRAN) " +
        "  ; ";
    var sql_where_id = " WHERE  (IdClient=@IdClient)  ; ";


    if (params.where == 1) {
        sql_where = sql_where_nopolice_kod_mezae_yatzran;
    }
    else
        if (params.where == 2) {
            sql_where = sql_where_id;
        }

    var sql_heshbon_o_polisa = "SELECT   " +
        " IdClient " +
        ", MISPAR_POLISA_O_HESHBON" +
        " , CompanyName " +
        ", TAARICH_NECHONUT " +
        "    , TAARICH_HITZTARFUT_MUTZAR " +
        "    ,  PensiaVatikaOHadasha " +
        ", SugKerenPenNsia " +
        "  , SugPolisa" +
        ", SugTochnit " +
        " , StatusPolisa " +
        "   , MPR_MEFITZ_BE_YATZRAN" +
        "    , TAARICH_HITZTARFUT_RISHON " +
        ", TAARICH_IDKUN_STATUS " +
        ", SHEM_TOCHNIT " +
        ", MADAD_BASIS " +
        ", AZMADA_LEALVAHA " +
        ", TAARICH_ACHRON_MOTAV_MUVET " +
        ", KOLEL_ZAKAUT_AGACH " +
        "   ,  SHIOR_AGACH_MEUADOT " +
        ", AVTACHT_TESOA " +
        ", TAARICH_CIUM_AVTACHT_TESOA " +
        ", MISPAR_GIMLAOT  " +
        " , KAYAM_KISUY_HIZONI" +
        ", KISUY_ISHY_KVOZATI " +
        ", TAARICH_TCHILA_RISK_ZMANI  " +
        ", PENSIA_VATIKA_O_HADASHA   " +
        " , SUG_KEREN_PENSIA  " +
        ", KOD_MEZAHE_YATZRAN " +
        " , TOM_TOKEF_RISK_ZMANI  " +
        ", SugKupa" +
        ", SugMuzar " +
        " FROM         HeshbonOPolisaDBWithParams " + sql_where_heshbon_o_polisa


    var sql_ktovet_lemishloach = " SELECT " +
        " MyNoPolice" +
        ", KOD_MEZAHE_YATZRAN  " +
        ", ERETZ " +
        ", SHEM_YISHUV" +
        ", SEMEL_YESHUV" +
        ", SHEM_RECHOV " +
        ",  MISPAR_BAIT " +
        ", MISPAR_KNISA  " +
        ", MISPAR_DIRA  " +
        ", MIKUD" +
        ", TA_DOAR  " +
        "  FROM         KtovetLemishloachDB " + sql_where;


    var sql_netunei_amit_o_mevutach = " SELECT " +
        " MyNoPolice " +
        ", KOD_MEZAHE_YATZRAN " +
        ", KOD_ZIHUY_LAKOACH_str  " +
        ", IdClient  " +
        " FROM         NetuneiAmitOmevutachWithParams " + sql_where;


    var sql_sheer = " SELECT " +
        " MyNoPolice " +
        " , KOD_MEZAHE_YATZRAN" +
        " , SugZika" +
        ", KodZihuiSheerim" +
        ", MISPAR_ZIHUY_SHEERIM " +
        ", SHEM_PRATI_SHEERIM " +
        " ,SHEM_MISHPACHA_SHEERIM" +
        ", SUG_ZIKA" +
        ", SHEM_MISHPAHA_KODEM  " +
        ", TAARICH_LEIDA " +
        ", TAARICH_NECHONUT " +
        "  FROM         SheerDBWithParams " + sql_where;


    var sql_maslul_bituach = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN " +
        " , MASLUL_BITUACH_BAKEREN_PENSIA  " +
        ", SHEM_MASLUL_HABITUAH " +
        " FROM         MaslulBituachDB " + sql_where;


    var sql_perut_shiabud_ikul = "SELECT   " +
        " MyNoPolice " +
        " , KOD_MEZAHE_YATZRAN  " +
        ", HutalIkul " +
        ", HutalShiabud  " +
        " , TAARICH_NECHONUT " +
        "  FROM         PerutShiabudIkulDBWithParams " + sql_where;


    var sql_halvaa = "SELECT   " +
        " MyNoPolice " +
        " , KOD_MEZAHE_YATZRAN  " +
        ",YeshHalvaa  " +
        ", MISDAR_SIDURI_SHEL_HAHALVAA" +
        ", SCHUM_HALVAA  " +
        ", TAARICH_KABALAT_HALVAA" +
        ",TAARICH_SIYUM_HALVAA " +
        ", YITRAT_HALVAA  " +
        ", TKUFAT_HALVAA " +
        ", RIBIT " +
        ", SugRibit  " +
        ", SugHatznmada " +
        ",SugHechzer" +
        ", TadirutHechzer  " +
        ", SCHUM_HECHZER_TKUFATI  " +
        ", RAMAT_HALVAA  " +
        ", TAARICH_NECHONUT " +
        " FROM         HalvaaDBWithParams " + sql_where;


    var sql_pirtey_tvia = " SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN" +
        ", YeshTvia " +
        ", MISPAR_TVIA_BE_YATZRAN" +
        ", MISPAR_KISUI_BE_YATZRAN" +
        ", SHEM_KISUI_BE_YATZRAN" +
        ", SugHatviaa" +
        ", OfenTashlum" +
        ", KodStatusTviaa" +
        ", TAARICH_STATUS_TVIA" +
        ", ACHUZ_MEUSHAR_O_K_A_SHICHRUR" +
        " ,SCHUM_TVIA_MEUSHAR" +
        ", ACHUZ_NECHUT" +
        ", TAARICH_TECHILAT_TASHLUM" +
        ", TAARICH_NECHONUT" +
        " FROM         PirteyTviaWithParams " + sql_where;


    var sql_perut_mitryot = " SELECT " +
        " MyNoPolice " +
        " , KOD_MEZAHE_YATZRAN " +
        ",KAYAM_KISUY_BITUCHI_COLECTIVI_LEAMITIM " +
        ", SHEM_MEVATACHAT  " +
        ", TAARICH_TCHILAT_HABITUACH " +
        ", TAARICH_TOM_TKUFAT_HABITUAH " +
        ", SCHUM_BITUACH  " +
        ", ALUT_KISUI" +
        ", KOD_SUG_MUTZAR_BITUACH_str  " +
        ", MESHALEM_DMEI_HABITUAH_str  " +
        ", HAIM_NECHTAM_TOFES_HITZTARFUT_str" +
        ", TADIRUT_HATSHLUM_str " +
        " ,TAARICH_NECHONUT" +
        " FROM         PerutMitryotDBWithParams " + sql_where;


    var sql_YitraLefiGilPrisha = " SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", GIL_PRISHA  " +
        ", TOTAL_CHISACHON_MITZTABER_TZAFUY " +
        ", TZVIRAT_CHISACHON_CHAZUYA_LELO_PREMIYOT  " +
        ", MEKADEM_MOVTACH_LEPRISHA " +
        ", MEKADEM_HAVTACHST_TOCHELET_str" +
        ", MEKADEM_HAVTACHST_TOCHELETPRISHA_str " +
        ", SHEM_MASLOL " +
        ",   MEKADEM_HAVTACHAT_TSUA_str " +
        ", MEKADEM_HAVTACHAT_TSUATKUFA_str " +
        ",  TKUFAT_HAGBALA_BESHANIM " +
        ", TOCHELET_MASHPIA_KITZBA " +
        ", TSUA_MASHPIA_KITZBA  " +
        ", SHEUR_PNS_ZIKNA_TZFUYA  " +
        ", TAARICH_NECHONUT " +
        "  FROM         YitraLefiGilPrishaWithParams " + sql_where;


    var sql_Kupa = "SELECT " +
        " MyNoPolice " +
        " , KOD_MEZAHE_YATZRAN " +
        " ,SugKupa " +
        ", SCHUM_KITZVAT_ZIKNA  " +
        ", KITZVAT_HODSHIT_TZFUYA  " +
        ", ACHUZ_TSUA_BATACHAZIT  " +
        ", TOTAL_ITRA_TZFUYA_MECHUSHAV_LEHON_IM_PREMIOT" +
        ",TZVIRAT_CHISACHON_TZFUYA_LEHON_LELO_PREMIYOT " +
        ", TOTAL_SCHUM_MTZBR_TZAFUY_LEGIL_PRISHA_MECHUSHAV_LEKITZBA_IM_PREMIYOT " +
        ",TOTAL_SCHUM_MITZVTABER_TZFUY_LEGIL_PRISHA_MECHUSHAV_HAMEYOAD_LEKITZBA_LELO_PREMIYOT  " +
        " , TAARICH_NECHONUT " +
        "  FROM         KupaDBWithParams " + sql_where;


    var sql_Tsua = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", SHEUR_TSUA_NETO  " +
        ", SHEUR_TSUA_BRUTO_CHS_1 " +
        ", ACHUZ_TSUA_BRUTO_CHS_2" +
        ", SHEUR_TSUA_MOVTACHAT_MEYOADOT" +
        ", REVACH_HEFSED_BENIKOI_HOZAHOT " +
        " FROM         TsuaDBWithParams " + sql_where;

    //  PirteiTaktziv
    var sql_PirteiOved = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",SugTochnit" +
        ", MPR_MAASIK_BE_YATZRAN " +
        ", StatusMaasik " +
        ", SugBaalPolisa  " +
        ",MISPAR_BAAL_POLISA_SHEEINO_MEVUTAH  " +
        ", SHEM_BAAL_POLISA_SHEEINO_MEVUTAH  " +
        " FROM         PirteiOvedDBWithParams " + sql_where;


    var sql_PirteiHaasaka = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", KodChishuvPolisa  " +
        ", SACHAR_POLISA " +
        ", KodOfenHatzmada " +
        " , TAARICH_MASKORET  " +
        ", ZakautLeloTnai " +
        ",  Seif_14 " +
        ", TAARICH_TCHILAT_TASHLUM " +
        " FROM         PirteiHaasakaDBWithParams " + sql_where;


    var sql_PerutHafrashotLePolisa = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", SugHamafkid " +
        ", SugHafrasha  " +
        ", ACHUZ_HAFRASHA  " +
        ", SCHUM_HAFRASHA  " +
        ",TAARICH_NECHONUT" +
        "   FROM         PerutHafrashotLePolisaDBWithParams " + sql_where;


    var sql_PerutMasluleiHashkaa = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",KodSugMaslul " +
        ", KodSugHafrasha  " +
        ", ACHUZ_HAFKADA_LEHASHKAA  " +
        " , SHEM_MASLUL_HASHKAA" +
        ", SHEUR_DMEI_NIHUL_HAFKADA  " +
        ", SHEUR_DMEI_NIHUL_HISACHON  " +
        " ,DMEI_NIHUL_ACHERIM " +
        ", TSUA_NETO " +
        ", TAARICH_NECHONUT  " +
        "  FROM         PerutMasluleiHashkaaDBWithParams " + sql_where;

    var sql_NetuneiGvia = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", SHEM_MESHALEM" +
        ", SugTeudaMeshalem" +
        ", MISPAR_ZIHUY_MESHALEM " +
        ", KodEmtzaeiTashlum " +
        ", TadirutTashlum  " +
        ", CHODESH_YECHUS" +
        ", YOM_GVIYA_BECHODESH  " +
        ", OfenHatzmadatGvia " +
        ", ACHUZ_TAT_SHNATIYOT " +
        ", TADIRUT_TASHLUM  " +
        ", TAARICH_NECHONUT " +
        "  FROM         NetuneiGviaDBWithParams " + sql_where;


    var sql_PerutPirteiHafkadaAchrona = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", TAARICH_HAFKADA_ACHARON " +
        ", TOTAL_HAFKADA " +
        ", TAARICH_ERECH_HAFKADA  " +
        ", SugHafkada " +
        " , TOTAL_HAFKADA_ACHRONA " +
        ", HAFKADA_LEHISCHON_A  " +
        ", HAFKADA_LEHISCHON_B  " +
        ", TAARICH_NECHONUT " +
        " FROM         PerutPirteiHafkadaAchronaDBWithParams " + sql_where;


    var sql_PerutHafkadaAchrona = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", KodSugHafrasha  " +
        ", SugHafrasha" +
        ", SugMafkid " +
        ", SCHUM_HAFKADA_SHESHULAM " +
        ", CHODESH_SACHAR " +
        " ,SACHAR_BERAMAT_HAFKADA" +
        ", TAARICH_NECHONUT  " +
        " FROM         PerutHafkadaAchronaDBWithParams " + sql_where;


    var sql_PerutHafkadotMetchilatShana = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        " ,TAARICH_ERECH_HAFKADA " +
        ", KodSugHafkada " +
        ", SugHafrasha " +
        ", SugMafkid  " +
        ", SCHUM_HAFKADA_SHESHULAM " +
        " ,CHODESH_SACHAR  " +
        ", ZMAN_PERAON" +
        ", SACHAR_BERAMAT_HAFKADA  " +
        ", TAARICH_NECHONUT " +
        " FROM         PerutHafkadotMetchilatShanaDBWithParams " + sql_where;


    var sql_HafkadotShnatiyot = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",  TOTAL_HAFKADOT_OVED_TAGMULIM_SHANA_NOCHECHIT  " +
        ", TOTAL_HAFKADOT_MAAVID_TAGMULIM_SHANA_NOCHECHIT " +
        ",   TOTAL_HAFKADOT_PITZUIM_SHANA_NOCHECHIT  " +
        ", TAARICH_NECHONUT " +
        "  FROM         HafkadotShnatiyotDBWithParams " + sql_where;


    var sql_MeshichaNiud = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",  KOD_SUG_PEULA " +
        ", RachivNimshachNuyad  " +
        ", SCHOOM_MESHICHA_NIUD" +
        ", TAARICH_BIZOA  " +
        ",TAARICH_ERECH " +
        ", KNAS_MESHICHA_NIUD  " +
        ", TAARICH_NECHONUT " +
        "  FROM         MeshichaNiudDBWithParams " + sql_where;


    var sql_ChovPigur = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", KayamChov " +
        ", TAARICH_TECHILAT_PIGUR " +
        ", MISPAR_CHODSHEI_PIGUR " +
        " , SugChov " +
        ", TOTAL_CHOVOT_O_PIGURIM " +
        " , KsafimLoMeshuyachim " +
        ", TAARICH_NECHONUT  " +
        " FROM         ChovPigurDBWithParams " + sql_where;


    var sql_HotzaotBafoalLehodeshDivoach = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", SHEUR_DMEI_NIHUL_HAFKADA" +
        ", TOTAL_DMEI_NIHUL_HAFKADA  " +
        ", SHEUR_DMEI_NIHUL_TZVIRA  " +
        ", TOTAL_DMEI_NIHUL_TZVIRA " +
        ",SACH_DMEI_NIHUL_ACHERIM " +
        ", TOTAL_DMEI_NIHUL_POLISA_O_HESHBON " +
        ", SACH_DMEI_BITUAH_SHENIGBOO " +
        ", HOTZOT_NIHUL_ASHKAOT " +
        ",DEMI_AAVARAT_MASLOL" +
        ", DMEI_NIUL_MENAEL_TIKIM  " +
        ", OFEN_GEVIAT_DMEI_BITUACH_str " +
        ", TAARICH_NECHONUT " +
        "  FROM         HotzaotBafoalLehodeshDivoachDBWithParams " + sql_where;


    var sql_PerutMivneDmeiNihul = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",GovaDmeiNihul  " +
        ", SugHotzaa  " +
        ", KOD_MASLUL_DMEI_NIHUL " +
        ", MeafyeneiMaslulDmeiNihul " +
        ", SHEUR_DMEI_NIHUL " +
        ", DmeiNihulAchidim  " +
        ", KOD_MASLUL_HASHKAA_BAAL_DMEI_NIHUL_YECHUDIIM " +
        ", OfenHafrasha " +
        ", SCHUM_MAX_DNHL_HAFKADA " +
        ", SACH_DMEI_NIHUL_MASLUL  " +
        ", DMEI_NIHUL_ACHERIM  " +
        ", KayemetHatava" +
        ", KENAS_MESHICHAT_KESAFIM " +
        ", SUG_HATAVA " +
        ", ACHOZ_HATAVA " +
        ", TAARICH_SIUM_HATAVA " +
        ", TAARICH_NECHONUT  " +
        " FROM         PerutMivneDmeiNihulDBWithParams " + sql_where;


    var sql_PerutYitrotLesofShanaKodemet = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",YITRAT_SOF_SHANA  " +
        ", ERECH_PIDYON_SOF_SHANA " +
        ", ERECH_MESOLAK_SOF_SHANA " +
        " , YISKON_YITRAT_KESAFIM " +
        ", TAARICH_NECHONUT " +
        " FROM         PerutYitrotLesofShanaKodemeDBWithParams " + sql_where;


    var sql_Yitrot = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        " , TAARICH_ERECH_TZVIROT  " +
        " FROM         YitrotDB " + sql_where;


    var sql_PerutYitrot = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",KodSugItra " +
        ", SugHafrasha " +
        ", TOTAL_CHISACHON_MTZBR  " +
        ", TOTAL_ERKEI_PIDION  " +
        ", TAARICH_ERECH_TZVIROT  " +
        " , TAARICH_NECHONUT " +
        "  FROM         PerutYitrotDBWithParams " + sql_where;


    var sql_PerutYitraLeTkufa = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",KodTechulatShichva  " +
        ", RekivItraLetkufa" +
        ", SACH_ITRA_LESHICHVA_BESHACH" +
        ", SugItraLtkufa " +
        ", TAARICH_ERECH_TZVIROT" +
        ", TAARICH_NECHONUT " +
        "  FROM         PerutYitraLeTkufaDBWithParams " + sql_where;


    var sql_YitrotShonot = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",  TZVIRAT_PITZUIM_PTURIM_MAAVIDIM_KODMIM " +
        ", ERECH_PIDION_PITZUIM_LEKITZBA_MAAVIDIM_KODMIM" +
        ", TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_KITZBA " +
        ", TZVIRAT_PITZUIM_MAAVIDIM_KODMIM_BERETZEF_ZECHUYOT  " +
        ", TZVIRAT_PITZUIM_31_12_1999_LEKITZBA" +
        ", ERECH_PIDION_MARKIV_PITZUIM_LEMAS_NOCHECHI" +
        ", ERECH_PIDION_PITZUIM_MAAVIDIM_KODMIM_RETZEF_ZEHUYUT " +
        ", ERECH_PIDION_PITZUIM_LEHON_MAAVIDIM_KODMIM " +
        ", KayamRetzefPizuimKitzba " +
        ", KayamRetzefZechuyotPizuim " +
        ", TAARICH_ERECH_TZVIROT  " +
        ", ERECH_PIDION__PITZUIM_MAASIK_NOCHECHI" +
        ", TAARICH_NECHONUT " +
        " FROM         YitrotShonotDBWithParams " + sql_where;


    var sql_PerutMeyupeKoach = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", KayamMeyupaKoach " +
        ", SugZihuy" +
        ", MISPAR_ZIHUY  " +
        ", SHEM_MEYUPE_KOACH  " +
        ", TAARICH_NECHONUT " +
        " FROM         PerutMeyupeKoachDBWithParams " + sql_where;

    // ==================== and taktziv


    var sql_ZihuiKisui = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",MISPAR_KISUI_BE_YATZRAN  " +
        ", SHEM_KISUI_YATZRAN  " +
        ", SUG_KISUI_ETZEL_YATZRAN_str  " +
        ", TAARICH_NECHONUT" +
        " FROM         ZihuiKisuiDBWithParams " + sql_where;


    var sql_PirteiMevutach = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",SUG_TEUDA_str " +
        ", IdClient " +
        " FROM         PirteiMevutachWithParams " + sql_where;

    var sql_SchumeiBituahYesodi = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", KOD_MUTZAR_LEFI_KIDUD_ACHID_LAYESODI " +
        ", SCHUM_BITUACH_LEMASLUL   " +
        ", MISPAR_MASKOROT  " +
        ", ACHUZ_HAKTZAA_LE_CHISACHON " +
        ", TIKRAT_GAG_HATAM_LEMIKRE_MAVET  " +
        ", TIKRAT_GAG_HATAM_LE_O_K_A " +
        ",SCHUM_BITUAH_LEMAVET " +
        ", SugHaZmada " +
        ", SchumBituahKolel " +
        ", SugMaslulLebituah " +
        ", SHEM_KISUI_YATZRAN  " +
        " ,TAARICH_NECHONUT " +
        "  FROM         dbo.SchumeiBituahYesodiDBWithParam " + sql_where;


    var sql_PirteiKisuiBeMutzar = "SELECT " +
        " MyNoPolice" +
       
        " , KOD_MEZAHE_YATZRAN  " +
        ",KOD_MIUTZAR_LAKISUY " +
        ", TAARICH_TCHILAT_KISUY " +
        ", SHEM_KISUI_YATZRAN " +
        ", SUG_KISUY_BITOCHI_str  " +
        ",SCHUM_BITUACH " +
        ", DMEI_BITUAH_LETASHLUM_BAPOAL " +
        ", TADIRUT_SHINUY_DMEI_HABITUAH_BESHANIM " +
        ", SugMevutach " +
        ", OfenTashlum  " +
        ", MeshalemHakisuy  " +
        ", KodIshun  " +
        ", IndChitum  " +
        ", Hachraga" +
        ", SugHachraga " +
        ",TAARICH_TOM_KISUY " +
        ", TAARICH_HAFSAKAT_TASHLUM" +
        ", ACHUZ_ME_SCM_BTH_YESODI  " +
        ", ACHUZ_MESACHAR  " +
        ",TAARICH_CHITUM " +
        ", TKUFAT_ACHSHARA " +
        ", TKUFAT_HAMTANA_CHODASHIM " +
        ",TAARICH_IDKUN_HABA_SHEL_DMEI_HABITUAH " +
        ", Hanacha  " +
        ", SUG_HANACHA_KISUY_str " +
        ", HatnayaLahanacha  " +
        " ,ERECH_HANACHA_BEKISUI " +
        ", SHIUR_HANACHA_BEKISUI" +
        ", KOD_NISPACH_KISUY " +
        ", SUG_ISUK_str" +
        ", Kolel_Prenzisa_satr " +
        " ,TAARICH_NECHONUT " +
        " FROM         PirteiKisuiBeMutzarDBWithParam " + sql_where;


    var PirteiTosafot = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        " ,TosefetTaarif  " +
        ", KodSugToseft " +
        ", SHEUR_TOSEFET  " +
        ", TAARICH_TOM_TOSEFET " +
        ", TAARICH_NECHONUT  " +
        "  FROM         PirteiTosafotDBWithParams " + sql_where;


    var sql_Mutav = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ", SugZihuyMutav " +
        ", KodZihuyMutav" +
        ", MISPAR_ZIHUY_MUTAV  " +
        ", SHEM_PRATI_MUTAV " +
        ", SHEM_MISHPACHA_MUTAV " +
        ", SugZika " +
        " ,ACHUZ_MUTAV" +
        ", MahutMutav" +
        ", HagdaratMutav " +
        ", TAARICH_NECHONUT  " +
        " FROM         MutavDBWithParams " + sql_where;


    var sql_KisuiBKerenPensia = "SELECT Distinct" +
        " MyNoPolice" +
        " , TypeRec "+
        " , KOD_MEZAHE_YATZRAN  " +
        " , ALUT_KISUI_NECHUT " +
        ", ALUT_KISUI_PNS_SHRM_NECHE  " +
        ", SHEUR_KISUY_NECHUT " +
        ",SACHAR_KOVEA_LE_NECHUT_VE_SHEERIM  " +
        ", TAARICH_MASKORET_NECHUT_VE_SHEERIM " +
        ", SACH_PENSIAT_NECHUT" +
        ", ALUT_KISUY_SHEERIM " +
        ", SHIUR_KISUY_YATOM " +
        ", KITZBAT_SHEERIM_LEALMAN_O_ALMANA  " +
        ", KITZBAT_SHEERIM_LEYATOM " +
        ",KITZBAT_SHEERIM_LEHORE_NITMACH  " +
        ", SHIUR_KISUY_ALMAN_O_ALMANA  " +
        ", SHIUR_KISUY_HORE_NITMACH " +
        ", GIL_PRISHA_LEPENSIYAT_ZIKNA " +
        ", SACH_PENSIYAT_ALMAN_O_ALMANA " +
        ", MISPAR_HODSHEI_HAVERUT_BEKEREN_HAPENSIYA" +
        ", MENAT_PENSIA_TZVURA  " +
        ", AHUZ_PENSIYA_TZVURA " +
        ", TAARICH_TCHILAT_HAVERUT " +
        ", TAARICH_ERECH_LANENTUNIM " +
        ", HatavaBituchit " +
        ", SUG_VITOR_SHAERIM " +
        ", TAARICH_VITOR_SHEERIM " +
        ", TAARICH_CIUM_VITOR_SEERIM  " +
        " ,MISPAR_HODSHEI_HAVERUT_MITZ_BEKEREN_HAPENSIYA" +
        ", TAARICH_NECHONUT  " +
        " FROM         KisuiBKerenPensiaDBWithParams " + sql_where;


    var sql_Miktsoa_Isuk_Tachviv = "SELECT " +
        " MyNoPolice" +
        " , KOD_MEZAHE_YATZRAN  " +
        ",  TACHVIVIM_O_ISUKIM  " +
        ", KOD_MIKTZOA " +
        ", TCHUM_ISUK_CHADASH  " +
        ", TAARICH_NECHONUT " +
        " FROM         MiktsoaIsukTachvivDBWithParams " + sql_where;

    var my_sql_str = sql_heshbon_o_polisa +
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
    return my_sql_str;

}



module.exports = {

    async get_police_mislak_by_no_police_and_no_company(params) {

        var no_police = "";
        var no_conpany = 0;
        var sql_str = get_sql_str(params);
        try {
           // let pool = await sql.connect(config.mssql.test_db)
            let result;
            if(params.where==1) {

           
              //  let LifePolice_result = await pool.request()
              let LifePolice_result = await dbConn.getPool().request()
                    .input('Serial', sql.Int, params.serial)
                    .query("Select NoPolice,Company From LifePolicies Where Serial=@serial");
                var company = LifePolice_result.recordset[0].Company;
                params.MyNoPolice = LifePolice_result.recordset[0].NoPolice;

               // let ParamCompany_result = await pool.request()
               let ParamCompany_result = await dbConn.getPool().request()
                    .input('company', sql.Int, company)
                    .query("Select KOD_MEZAHE_YATZRAN From ParamCompany Where Serial=@company");
           
               //  result = await pool.request()
               result = await dbConn.getPool().request()
                    .input('MyNoPolice', sql.NVarChar, params.MyNoPolice)
                    .input('KOD_MEZAHE_YATZRAN', sql.NVarChar, ParamCompany_result.recordset[0].KOD_MEZAHE_YATZRAN)
                    .input('IdClient', sql.Int, params.IdClient)

                    .query(sql_str);
            }
            else {
              //  result = await pool.request()
              result = await dbConn.getPool().request()
                    .input('IdClient', sql.Int, params.IdClient)

                    .query(sql_str);
             }


            return result.recordsets;
            // Stored procedure 
        } catch (err) {
            // ... error checks 
            throw { errmsg: err };
        }
        // finally {
        //     sql.close();
        // }
       
    },

    async get_police_mislak_by_id(params) {
        
                
                var no_conpany = 0;
                var sql_str = get_sql_str(params);
                try {
                    // let pool = await sql.connect(config.mssql.test_db)
                    // let result = await pool.request()
                    let result = await dbConn.getPool().request()
                            .input('IdClient', sql.Int, params.IdClient)
        
                            .query(sql_str);
                    let my_data={
                        heshbon_o_polisa_list :result.recordsets[0],
                        netunei_amit_o_mevutach_list :result.recordsets[2],
                        sheer_list :result.recordsets[3],
                        maslul_bituach_list :result.recordsets[4],
                        perut_shiabud_ikul_list :result.recordsets[5],
                        halvaa_list :result.recordsets[6],
                        pirtey_tvia_list :result.recordsets[7],
                        perut_mitryot_list :result.recordsets[8],
                        YitraLefiGilPrisha_list :result.recordsets[9],
                        Kupa_list :result.recordsets[10],
                        Tsua_list :result.recordsets[11],
                        PirteiOved_list :result.recordsets[12],
                        PirteiHaasaka_list :result.recordsets[13],
                        PerutHafrashotLePolisa_list :result.recordsets[14],
                        PerutMasluleiHashkaa_list :result.recordsets[15],
                        NetuneiGvia_list :result.recordsets[16],
                        PerutPirteiHafkadaAchrona_list :result.recordsets[17],
                        PerutHafkadaAchrona_list :result.recordsets[18],
                        PerutHafkadotMetchilatShana_list :result.recordsets[19],
                        HafkadotShnatiyot_list :result.recordsets[20],
                        MeshichaNiud_list :result.recordsets[21],
                        ChovPigur_list :result.recordsets[22],
                        HotzaotBafoalLehodeshDivoach_list :result.recordsets[23],
                        PerutMivneDmeiNihul_list :result.recordsets[24],
                        PerutYitrotLesofShanaKodemet_list :result.recordsets[25],
                        Yitrot_list :result.recordsets[26],
                        PerutYitrot_list :result.recordsets[27],
                        YitrotShonot_list :result.recordsets[28],
                        PerutMeyupeKoach_list :result.recordsets[29],
                        ZihuiKisui_list :result.recordsets[30],
                        PirteiMevutach_list :result.recordsets[31],
                        SchumeiBituahYesodi_list :result.recordsets[32],
                        PirteiKisuiBeMutzar_list :result.recordsets[33],
                        PirteiTosafot_list :result.recordsets[34],
                        Mutav_list :result.recordsets[35],
                        KisuiBKerenPensia_list :result.recordsets[36],
                        Miktsoa_Isuk_Tachviv_list : result.recordsets[37]
                
                    };
        
        
                    return result.recordsets;
                    // Stored procedure 
                } catch (err) {
                    // ... error checks 
                    throw { errmsg: err };
                }
                // finally {
                //     sql.close();
                // }
               
            }

}