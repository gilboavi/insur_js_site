
const empty_yeshut_lakoach = (params) => {
    var yeshut_lakoach = {
        SUG_MEZAHE_LAKOACH: 0,
        MISPAR_ZIHUY_LAKOACH: null,
        SHEM_PRATI: null,
        SMASHEM_MISHPACHA: null,
        MIN: null,
        TAARICH_LEYDA: null,
        PTIRA: null,
        TAARICH_PTIRA: null,
        MATZAV_MISHPACHTI: null,
        ERETZ: null,
        SHEM_YISHUV: null,
        SHEM_RECHOV: null,
        MISPAR_BAIT: null,
        MISPAR_KNISA: null,
        MISPAR_DIRA: null,
        MIKUD: null,
        TA_DOAR: null,
        MISPAR_TELEPHONE_KAVI: null,
        MISPAR_SHLUCHA: null,
        MISPAR_CELLULAR: null,
        MISPAR_FAX: null,
        E_MAIL: null,
        HEAROT:null ,
        MISPAR_YELADIM: null
    }
    return yeshut_lakoach;
}

const empty_heshbon_o_polisa = (params) => {
    var heshbon_o_polisa = {
        Serial:0 ,
        MISPAR_POLISA_O_HESHBON : null,
        KOD_MEZAHE_YATZRAN: null,
        TypeRec: null,
        ASMACHTA:  null,
        MPR_MEFITZ_BE_YATZRAN :null,
        TAARICH_NECHONUT : null,
        TAARICH_HITZTARFUT_MUTZAR : null,
        TAARICH_HITZTARFUT_RISHON :null,
        SUG_KEREN_PENSIA: null,
        PENSIA_VATIKA_O_HADASHA: null,
        TAARICH_IDKUN_STATUS: null,
        STATUS_POLISA_O_CHESHBON : null,
        SUG_POLISA: null,
        SUG_TOCHNIT_O_CHESHBON : null,
        SHEM_TOCHNIT : null,
        KIDOD_ACHID : null,
        MADAD_BASIS: null,
        AZMADA_LEALVAHA : null,
        TAARICH_ACHRON_MOTAV_MUVET : null,
        KOLEL_ZAKAUT_AGACH :  null,
        SHIOR_AGACH_MEUADOT : null,
        AVTACHT_TESOA : null,
        TAARICH_CIUM_AVTACHT_TESOA : null,
        MISPAR_GIMLAOT :  null,
        KAYAM_KISUY_HIZONI : null,
        KISUY_ISHY_KVOZATI : null,
        TAARICH_TCHILA_RISK_ZMANI : null,
        TOM_TOKEF_RISK_ZMANI :null,
        SUG_MUZAR : null
    }
    return heshbon_o_polisa;
}

function field_val(params) {
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

function date_field_val(params) {
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

module.exports = {

    get_field_val: function (params) {
        var temp = null;
        try {
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 
            if (typeof temp != 'string') {
                temp = null;
            }
        } catch (e) {

        }
        return temp;
        //try {
        //    let a= field_val(params);
        //    return a;
        //}
        //catch (err) {
        //    // ... error checks 
        //    throw { hasError: 1, errmsg: err.errmsg };
        //}
    },

     get_date_field_val : function(params) {
        var temp = null;
        try {
            var temp1= params.entity.getElementsByTagName(params.xml_node_name);
            temp = params.entity.getElementsByTagName(params.xml_node_name)[0].childNodes[0].data; 

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
    },

     convert_date: function (old_date) {
         var temp = null;
         try {
             temp = old_date;

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
     },

    async get_empty_yeshut_lakoach(params) {
        try {
           
            return empty_yeshut_lakoach;
        }
        catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

     get_empty_heshbon_o_polisa: function(params) {
        var heshbon_o_polisa = {
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
        return heshbon_o_polisa;
    }

}