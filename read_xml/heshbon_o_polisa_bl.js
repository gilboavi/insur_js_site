  /// <summary>
        /// retrun FullHeshbonOPolisa that contains all HeshbonOPolisa details
        /// used by GetFullHeshbonotOPolisot function 
        /// </summary>
        /// <param name="ElementHeshbonOPolisa">node of HeshbonOPolisa</param>
        /// <param name="_KOD_MEZAHE_YATZRAN"></param>
        /// <param name="typeRec"></param>
        /// <returns>FullHeshbonOPolisa</returns>
// public FullHeshbonOPolisa GetFullHeshbonOPolisa(XElement ElementHeshbonOPolisa, string _KOD_MEZAHE_YATZRAN, int sug_muzar, int typeRec)
function get_full_heshbon_o_polisa()
{
    var noPolice = "";

    //    #region main for each

    FullHeshbonOPolisa fullHeshbonotOPolisotTemp = new FullHeshbonOPolisa();
    HeshbonOPolisaDB heshbonOPolisaTemp = new HeshbonOPolisaDB();
    try {

      

        //  HeshbonOPolisa  
        fullHeshbonotOPolisotTemp.MyHeshbonOPolisa = GetHeshbonOPolisa(ElementHeshbonOPolisa, _KOD_MEZAHE_YATZRAN, sug_muzar, typeRec);
        noPolice = fullHeshbonotOPolisotTemp.MyHeshbonOPolisa.MISPAR_POLISA_O_HESHBON;

        // KtovetLemishloach כתובת למשלוח
        var ktovetLemishloach = GetKtovetLemishloach(ElementHeshbonOPolisa.Descendants("KtovetLemishloach").FirstOrDefault(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyKtovetLemishloach = ktovetLemishloach;

        // NetuneiAmitOmevutach נתוני עמית או מבוטח
        var netuneiAmitOmevutach = GetNetuneiAmitOmevutach(ElementHeshbonOPolisa.Descendants("NetuneiAmitOmevutach").FirstOrDefault(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyNetuneiAmitOmevutach = netuneiAmitOmevutach;

        // Sheer שארים
        var sheerList = GetSheerList(ElementHeshbonOPolisa.Descendants("Sheer").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MySheerList = sheerList;

        // MaslulBituach מסלול ביטוח
        var maslulBituach = GetMaslulBituach(ElementHeshbonOPolisa.Descendants("MaslulBituach").FirstOrDefault(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyMaslulBituach = maslulBituach;

        //PerutShiabudIkul   שעבודים ועיקולים
        var perutShiabudIkula = GetPerutShiabudIkul(ElementHeshbonOPolisa.Descendants("PerutShiabudIkul").FirstOrDefault(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyPerutShiabudIkul = perutShiabudIkula;

        //Halvaa               הלוואות
        var halvaaList = GetHalvaaList(ElementHeshbonOPolisa.Descendants("Halvaa").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyHalvaaList = halvaaList;

        // PirteyTvia  פרטי תביעה
        var pirteyTviaList = GetPirteyTviaList(ElementHeshbonOPolisa.Descendants("PirteyTvia").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyPirteyTviaList = pirteyTviaList;

        // PerutMitryot   ביטוחים קולקטיביים 
        var perutMitryotList = GetPerutMitryotList(ElementHeshbonOPolisa.Descendants("PerutMitryot").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyPerutMitryotList = perutMitryotList;

        // קופה  + יתרות לפי גיל פרישה
        var yitraLefiGilPrishaList = GetFullYitraLefiGilPrisha(ElementHeshbonOPolisa.Descendants("YitraLefiGilPrisha").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyFullYitraLefiGilPrishaList = yitraLefiGilPrishaList;

        //Tsua one תשואה
        var tsua = GetTsua(ElementHeshbonOPolisa.Descendants("Tsua").FirstOrDefault(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyTsua = tsua;

        //  PirteiTaktziv
        fullHeshbonotOPolisotTemp.MyFullPirteiTaktzivList = GetFullPirteiTaktzive(ElementHeshbonOPolisa.Descendants("PirteiTaktziv").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);

        //PerutMeyupeKoach מיופה כוח מרובה
        var perutMeyupeKoachList = GetPerutMeyupeKoachList(ElementHeshbonOPolisa.Descendants("PerutMeyupeKoach").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);
        fullHeshbonotOPolisotTemp.MyPerutMeyupeKoachList = perutMeyupeKoachList;

        // ZihuiKisui
        var fullKisuim = GetFullKisuim(ElementHeshbonOPolisa.Descendants("Kisuim").ToList(), noPolice, _KOD_MEZAHE_YATZRAN, typeRec);



        fullHeshbonotOPolisotTemp.MyFullKisuim = fullKisuim;


    }



    catch (Exception ex) {
        WriteExceptionToFile.SendExceptionToFile(ex);

    }

    //  #endregion // end for each main



    return fullHeshbonotOPolisotTemp;
}
