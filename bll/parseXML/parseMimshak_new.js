const DOMParser = require('xmldom').DOMParser;

const yeshut_yatzran = require('../../read_xml/yeshut_yatzran');
const yeshut_lakoach=require('../../read_xml/yeshut_lakoach');
const heshbon_o_polisa = require('../../read_xml/heshbon_o_polisa');
//const yeshut_lakoach = require('../../read_xml/yeshut_lakoach')
const ktovet_lemishloach = require('../../read_xml/ktovet_lemishloach')
const netunei_amit_o_mevutach = require('../../read_xml/netunei_amit_o_mevutach')
const sheer = require('../../read_xml/sheer')
const maslul_bituach = require('../../read_xml/maslul_bituach')
const perut_shiabud_ikul = require('../../read_xml/perut_shiabud_ikul')
const halvaa = require('../../read_xml/halvaa')
const pirtey_tvia = require('../../read_xml/pirtey_tvia')
const perut_mitryot = require('../../read_xml/perut_mitryot')
const yitra_lefi_gil_prisha = require('../../read_xml/yitra_lefi_gil_prisha')
const kupa = require('../../read_xml/kupa')
const tsua = require('../../read_xml/tsua')
const taktziv_pirtei_oved = require('../../read_xml/taktziv_pirtei_oved')
const taktziv_pirtei_haasaka = require('../../read_xml/taktziv_pirtei_haasaka')
const taktziv_perut_hafrashot_le_polisa = require('../../read_xml/taktziv_perut_hafrashot_le_polisa')
const taktziv_perut_maslulei_hashkaa = require('../../read_xml/taktziv_perut_maslulei_hashkaa')      
const taktziv_netunei_gvia = require('../../read_xml/taktziv_netunei_gvia')  
const taktziv_pirtei_hafkada_achrona = require('../../read_xml/taktziv_pirtei_hafkada_achrona')  
const taktziv_perut_hafkada_achrona = require('../../read_xml/taktziv_perut_hafkada_achrona')  
const taktziv_perut_hafkadot_metchilat_shana = require('../../read_xml/taktziv_perut_hafkadot_metchilat_shana')  
const taktziv_hafkadot_shnatiyot = require('../../read_xml/taktziv_hafkadot_shnatiyot')  
const taktziv_meshicha_niud = require('../../read_xml/taktziv_meshicha_niud')  
const taktziv_chov_pigur = require('../../read_xml/taktziv_chov_pigur') 
const taktziv_hotzaot_bafoal_lehodesh_divoach = require('../../read_xml/taktziv_hotzaot_bafoal_lehodesh_divoach') 
const taktziv_mivne_dmei_nihul = require('../../read_xml/taktziv_mivne_dmei_nihul') 
const taktziv_perut_yitrot_sesof_shana_kodemet = require('../../read_xml/taktziv_perut_yitrot_sesof_shana_kodemet') 
const taktziv_yitrot = require('../../read_xml/taktziv_yitrot') 
const taktziv_perut_yitrot = require('../../read_xml/taktziv_perut_yitrot') 
const taktziv_perut_yitra_le_tkufa = require('../../read_xml/taktziv_perut_yitra_le_tkufa') 
const taktziv_yitrot_shonot = require('../../read_xml/taktziv_yitrot_shonot') 
const perut_meyupe_koach = require('../../read_xml/perut_meyupe_koach') 
const zihui_kisui = require('../../read_xml/zihui_kisui') 
const pirtei_mevutach = require('../../read_xml/pirtei_mevutach') 
const schumei_bituah_sesodi = require('../../read_xml/schumei_bituah_sesodi') 
const pirtei_kisui_be_mutzar = require('../../read_xml/pirtei_kisui_be_mutzar') 
const pirtei_tosafot = require('../../read_xml/pirtei_tosafot') 
const mutav = require('../../read_xml/mutav') 
const kisui_b_keren_pensia = require('../../read_xml/kisui_b_keren_pensia') 
const miktsoa_isuk_tachviv = require('../../read_xml/miktsoa_isuk_tachviv') 

function find_empty_element(children){
    var fleg=false;
     try{
                for(child in children){
            
                    if(children[child].childNodes[0].data!=null){
                        fleg=true;
                        return fleg;   
                    }
                }
                    
        
                return fleg;
            }catch (err) {
                return fleg;
        }
}

function fill_kisuy_cross_tab(params){
    let my_kisuy_cross_tab=params.kisuy_cross_tab;
    let  schum_bituach=params.schum_bituach;
    switch(params.sug_kisuy_bitochi){
        case "1": 
            my_kisuy_cross_tab.a=schum_bituach;
            break;
        case "2": 
            my_kisuy_cross_tab.b=schum_bituach;
            break;
        case "3": 
            my_kisuy_cross_tab.c=schum_bituach;
            break;
        case "4": 
            my_kisuy_cross_tab.d=schum_bituach;
            break;
        case "5": 
            my_kisuy_cross_tab.e=schum_bituach;
            break;
        case "6": 
            my_kisuy_cross_tab.f=schum_bituach;
            break;
        case "7": 
            my_kisuy_cross_tab.g=schum_bituach;
            break;
        case "8": 
            my_kisuy_cross_tab.h=schum_bituach;
            break;
        case "9": 
            my_kisuy_cross_tab.i=schum_bituach;
            break;
        case "10": 
            my_kisuy_cross_tab.j=schum_bituach;
            break;
        case "11": 
            my_kisuy_cross_tab.k=schum_bituach;
            break;

    }
    return my_kisuy_cross_tab;
}

module.exports = {
    async parseXML_to_json(fileData) {
        
            return new Promise(async (resolvefile,rejectfile)=>{
                let answerArry=[];
                let mimshk={};
                let mimshk_array=[];
                let heshbon_o_polisa_array=[];
                let not_empty_elemnt=false;
                try { 
                 
                    var my_params = {};
                 
                    var doc = new DOMParser().parseFromString(fileData.buffer.toString("utf8"), 'text/xml');
                    // YeshutYatzran yeshut_yatzran
                    var my_yeshut_yatzran_xml = doc.getElementsByTagName("YeshutYatzran")[0];
                    my_params.entity = my_yeshut_yatzran_xml;
                    let yeshut_yatzran_object = await yeshut_yatzran.extract_yeshut_yatzran_from_xml(my_params);
                    const kod_mezahe_yatzran = yeshut_yatzran_object.KOD_MEZAHE_YATZRAN;
                    mimshk.yeshut_yatzran=yeshut_yatzran_object;
                    // YeshutLakoach yeshut_lakoach
                    var my_yeshut_lakoach = doc.getElementsByTagName("YeshutLakoach")[0];
                    my_params.entity = my_yeshut_lakoach;
                    let yeshut_lakoach_object = await yeshut_lakoach.extract_yeshut_lakoach_from_xml(my_params);
                    mimshk.yeshut_lakoach=yeshut_lakoach_object;
                    let id_client=yeshut_lakoach_object.MISPAR_ZIHUY_LAKOACH;
                   
        
                    var mutzarim = my_yeshut_yatzran_xml.getElementsByTagName("Mutzarim")[0];
                    var mutzar = mutzarim.getElementsByTagName("Mutzar");
                   
                 
                   
                 // Mutza
                    for (let i = 0; i < mutzar.$$length; i++) {
                        // NetuneiMutzar
                        var sug_muzar = mutzar[i].getElementsByTagName("NetuneiMutzar")[0].getElementsByTagName("SUG-MUTZAR")[0].childNodes[0].data; 
                        var netunei_mutzar = mutzar[i].getElementsByTagName("NetuneiMutzar")[0];
                           // YeshutLakoach
                            // var id_client_new = my_yeshut_lakoach.getElementsByTagName("MISPAR-ZIHUY-LAKOACH")[0].childNodes[0].data;
                    
                            // my_params.id_client =id_client_new;
                            // my_params.entity = my_yeshut_lakoach;
                         
                            var heshbonot_o_polisot = mutzar[i].getElementsByTagName("HeshbonotOPolisot")[0].getElementsByTagName("HeshbonOPolisa");
                            mimshk.heshbon_o_polisa=[];
                            for (let j = 0; j < heshbonot_o_polisot.$$length; j++) {
                            
                                my_params.entity  = heshbonot_o_polisot[j];
                                my_params.entity.SHEM_YATZRAN= yeshut_yatzran_object.SHEM_YATZRAN;
                                my_params.KOD_MEZAHE_YATZRAN = kod_mezahe_yatzran;
                            
                                my_params.my_no_police = (heshbonot_o_polisot[j].getElementsByTagName("MISPAR-POLISA-O-HESHBON")[0].childNodes[0].data).trim();
                                my_params.type_rec = (Math.random() *1000);                                          
                                my_params.sug_muzar = sug_muzar;
                                my_params.id_client = id_client;
            
                               
                                let heshbon_o_polisa_object= await heshbon_o_polisa.extract_heshbon_o_polisa_from_xml(my_params);
                               // mimshk.heshbon_o_polisa.push(heshbon_o_polisa_object);
                                heshbon_o_polisa_array.push(heshbon_o_polisa_object);
                                let my_police =  heshbon_o_polisa_object.MISPAR_POLISA_O_HESHBON;
                                
                                // KtovetLemishloach
                                let ktovet_lemishloach_object;
                                try{
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("KtovetLemishloach")[0] ;
                                        ktovet_lemishloach_object = await ktovet_lemishloach.extract_ktovet_lemishloach_from_xml(my_params);
                                        answerArry.push("KtovetLemishloach - ok");
                                    }catch (err) {
                                        answerArry.push("KtovetLemishloach - false");
                                    // throw err;
                                }
                                mimshk.ktovet_lemishloach=ktovet_lemishloach_object;
                                // NetuneiAmitOmevutach
                                let netunei_amit_o_mevutach_object;
                                try{
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("NetuneiAmitOmevutach")[0];
                                        netunei_amit_o_mevutach_object = await netunei_amit_o_mevutach.extract_netunei_amit_o_mevutach_from_xml(my_params);
                                        answerArry.push("NetuneiAmitOmevutach - ok");
                                    }catch (err) {
                                        answerArry.push("NetuneiAmitOmevutach - false");
                                }
                                mimshk.netunei_amit_o_mevutach=netunei_amit_o_mevutach_object;
                                // Sheer
                                let sheer_array=[];
                                try {
                                        
                                        
                                        var sheer_list = heshbonot_o_polisot[j].getElementsByTagName("Sheer");
                                        for (x = 0; x < sheer_list.$$length; x++) {
                                            my_params.entity = sheer_list[x];
                                            let sheer_object = await sheer.extract_sheer_from_xml(my_params);
                                            sheer_array.push(sheer_object);
                                            answerArry.push("Sheer - ok");
                                        }
                                    }catch (err) {
                                        answerArry.push("Sheer - false");
                                }
                                mimshk.sheer_array=sheer_array;
                                // MaslulBituach not finish
                                let maslul_bituach_array=[];
                                try {
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("MaslulBituach")[0]; 
                                        let maslul_bituach_object = await maslul_bituach.extract_maslul_bituach_from_xml(my_params);
                                        maslul_bituach_array.push(maslul_bituach_object)
                                        answerArry.push("MaslulBituach - ok");
                                    }catch (err) {
                                        answerArry.push("MaslulBituach - false");
                                }
                                mimshk.maslul_bituach_array=maslul_bituach_array;
                                // PerutShiabudIkul
                                let perut_shiabud_ikul_object;
                                try{
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("PerutShiabudIkul")[0]; 
                                        perut_shiabud_ikul_object = await perut_shiabud_ikul.extract_perut_shiabud_ikul_from_xml(my_params);
                                        answerArry.push("PerutShiabudIkul - ok");
                                    }catch (err) {
                                        answerArry.push("PerutShiabudIkul - false");
                                }
                                mimshk.perut_shiabud_ikul=perut_shiabud_ikul_object;
                                // Halvaa
                                let halvaa_object_array=[];
                                try{
                                        var halvaa_list = heshbonot_o_polisot[j].getElementsByTagName("Halvaa"); 
                                        for (x = 0; x < halvaa_list.$$length; x++) {
                                            my_params.entity = halvaa_list[x];
                                            let halvaa_object = await halvaa.extract_halvaa_from_xml(my_params);
                                            halvaa_object_array.push(halvaa_object);
                                            answerArry.push("Halvaa - ok");
                                        }
                                    }catch (err) {
                                        answerArry.push("Halvaa - false");
                                }
                                mimshk.halvaa_array=halvaa_object_array;
                                // PirteyTvia
                                let pirtey_tvia_array=[];
                                try {
                                        var pirtey_tvia_list = heshbonot_o_polisot[j].getElementsByTagName("PirteyTvia"); 
                                        for (x = 0; x < pirtey_tvia_list.$$length; x++) {
                                            my_params.entity = pirtey_tvia_list[x];
                                            let pirtey_tvia_object = await pirtey_tvia.extract_pirtey_tvia_from_xml(my_params);
                                            pirtey_tvia_array.push(pirtey_tvia_object)
                                            answerArry.push("PirteyTvia - ok");
                                        }
                                    }catch (err) {
                                        answerArry.push("PirteyTvia - false");
                                }
                                mimshk.pirtey_tvia_array=pirtey_tvia_array;
                               
                                // PerutMitryot
                                let perut_mitryot_array=[];
                                try{
                                        var perut_mitryot_list = heshbonot_o_polisot[j].getElementsByTagName("PerutMitryot"); 
                                        
                                        for (x = 0; x < perut_mitryot_list.$$length; x++) {
                                            my_params.entity = perut_mitryot_list[x];
                                            let perut_mitryot_object = await perut_mitryot.extract_perut_mitryot_from_xml(my_params);
                                            perut_mitryot_array.push(perut_mitryot_object)
                                            answerArry.push("PerutMitryot - ok");
                                        }
                                    }catch (err) {
                                            answerArry.push("PerutMitryot - false");
                                }
                                mimshk.perut_mitryot_array=perut_mitryot_array;
                                // YitraLefiGilPrisha
                                let yitra_lefi_gil_prisha_arry=[];
                                
                                try{
                                        let yitra_lefi_gil_prisha_and_kupa={
                                                                              yitra_lefi_gil_prisha:{},
                                                                               kupa_array:[]
                                                                            };
                                        var yitra_lefi_gil_prisha_list = heshbonot_o_polisot[j].getElementsByTagName("YitraLefiGilPrisha");
            
                                        for (x = 0; x < yitra_lefi_gil_prisha_list.$$length; x++) {
                                            let my_yitra_lefi_gil_prisha_and_kupa= yitra_lefi_gil_prisha_and_kupa;
                                            my_yitra_lefi_gil_prisha_and_kupa.yitra_lefi_gil_prisha={};
                                            my_yitra_lefi_gil_prisha_and_kupa.kupa_array=[];
                                            my_params.entity = yitra_lefi_gil_prisha_list[x];
                                            my_params.mone_gil_prisha = Math.random() * 101 | 0; // (Math.random() * 1000); 
                                            let yitra_lefi_gil_prisha_object = await yitra_lefi_gil_prisha.extract_yitra_lefi_gil_prisha_from_xml(my_params);
                                            my_yitra_lefi_gil_prisha_and_kupa.yitra_lefi_gil_prisha=yitra_lefi_gil_prisha_object;
                                            answerArry.push("YitraLefiGilPrisha - ok");
                                        
                                            // var serial_gil_prisha = result_yitra_lefi_gil_prisha.recordset[0].Serial;
                                            try{
                                                var kupa_list = yitra_lefi_gil_prisha_list[x].getElementsByTagName("Kupa")
                                                for (y = 0; y < kupa_list.$$length; y++) {
                                                    my_params.entity = kupa_list[y];
                                                    let kupa_object = await kupa.extract_kupa_from_xml(my_params);
                                                    my_yitra_lefi_gil_prisha_and_kupa.kupa_array.push(kupa_object);
                                                    answerArry.push("kupa - ok");
                                                }
                                               }catch (err) {
                                                   answerArry.push("kupa - false");//  throw err;
                                               }
                                            yitra_lefi_gil_prisha_arry.push(my_yitra_lefi_gil_prisha_and_kupa);
                                        }
                                       
                                    }catch (err) {
                                        answerArry.push("YitraLefiGilPrisha or kupa - false");
                                }
                                let yitra_lefi_gil_prisha_with_kupa = {};
                             
                                if (typeof(yitra_lefi_gil_prisha_arry[0])!="undefined"){
                                    yitra_lefi_gil_prisha_with_kupa = await yitra_lefi_gil_prisha.get_yitra_lefi_gil_prisha_with_kupa(yitra_lefi_gil_prisha_arry);
                                }
                            
                                mimshk.yitra_lefi_gil_prisha_with_kupa=yitra_lefi_gil_prisha_with_kupa;
                                mimshk.yitra_lefi_gil_prisha_array=yitra_lefi_gil_prisha_arry;
                                //Tsua
                                let tsua_object={};
                                try{
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("Tsua")[0];
                                        result_tsua = await tsua.extract_tsua_from_xml(my_params);
                                        answerArry.push("Tsua - ok");
                                    }catch (err) {
                                        answerArry.push("Tsua  - false");
                                }
                                mimshk.tsua=tsua_object;
                                //    PirteiTaktziv 
                                try{
                                    var pirti_taktziv_list = heshbonot_o_polisot[j].getElementsByTagName("PirteiTaktziv");
                                    }catch (err) {
                                        pirti_taktziv_list =null;
                                }
                                // PirtiTaktzi - i decided not to do for on PirtiTaktzi
                                //for (z = 0; z < pirti_taktziv_list.$$length; z++) {
                                for (z = 0; z < 1; z++) {
                                    // PirteiOved
                                    let pirtei_oved_object;
                                    try {
                                            my_params.entity = pirti_taktziv_list[z].getElementsByTagName("PirteiOved")[0];
                                            pirtei_oved_object = await taktziv_pirtei_oved.extract_taktziv_pirtei_oved_from_xml(my_params);
                                            answerArry.push("PirteiOved - ok");
                                        }catch (err) {
                                            answerArry.push("PirteiOved -false");
                                    }
                                    mimshk.pirtei_oved=pirtei_oved_object;
                                    //PirteiHaasaka
                                    let taktziv_pirtei_haasaka_object;
                                    try{ 
                                            my_params.entity = pirti_taktziv_list[z].getElementsByTagName("PirteiHaasaka")[0];
                                            let taktziv_pirtei_haasaka_object = await taktziv_pirtei_haasaka.extract_taktziv_pirtei_haasaka_from_xml(my_params);
                                            answerArry.push("PirteiHaasaka - ok");
                                        }catch (err) {
                                            answerArry.push("PirteiHaasaka -false");
                                    }
                                    mimshk.taktziv_pirtei_haasaka=taktziv_pirtei_haasaka_object;
                                    //PerutHafrashotLePolisa
                                    let perut_hafrashot_le_polisa_arry=[];
                                    try{
                                            var perut_hafrashot_le_polisa_list = pirti_taktziv_list[z].getElementsByTagName("PerutHafrashotLePolisa")
                                            for (y = 0; y < perut_hafrashot_le_polisa_list.$$length; y++) {
                                                my_params.entity = perut_hafrashot_le_polisa_list[y];
                                                let perut_hafrashot_le_polisa_object = await taktziv_perut_hafrashot_le_polisa.extract_taktziv_perut_hafrashot_le_polisa_from_xml(my_params);
                                                perut_hafrashot_le_polisa_arry.push(perut_hafrashot_le_polisa_object);
                                                answerArry.push("PerutHafrashotLePolisa - ok");
                                            }
                                        }catch (err) {
                                                answerArry.push("PerutHafrashotLePolisa -false");
                                    }
                                    mimshk.perut_hafrashot_le_polisa_arry=perut_hafrashot_le_polisa_arry;
                                    // PerutMasluleiHashkaa
                                    let perut_maslulei_hashkaa_array=[];
                                    try{
                                            var perut_maslulei_hashkaa_list = pirti_taktziv_list[z].getElementsByTagName("PerutMasluleiHashkaa")
                                            for (y = 0; y < perut_maslulei_hashkaa_list.$$length; y++) {
                                                my_params.entity = perut_maslulei_hashkaa_list[y];
                                                let perut_maslulei_hashkaa_object = await taktziv_perut_maslulei_hashkaa.extract_taktziv_perut_maslulei_hashkaa_from_xml(my_params);
                                                perut_maslulei_hashkaa_array.push(perut_maslulei_hashkaa_object);
                                                answerArry.push("PerutMasluleiHashkaa - ok");
                                            }
                                        }catch (err) {
                                                answerArry.push("PerutMasluleiHashkaa -false");
                                    }
                                    mimshk.perut_maslulei_hashkaa_array=perut_maslulei_hashkaa_array;
                                    // NetuneiGvia 
                                    let taktziv_netunei_gvia_object={};
                                    try{
                                            my_params.entity = pirti_taktziv_list[z].getElementsByTagName("NetuneiGvia")[0];
                                            taktziv_netunei_gvia_object = await taktziv_netunei_gvia.insert_taktziv_netunei_gvia(my_params);
                                            answerArry.push("NetuneiGvia - ok");
                                        }catch (err) {
                                            answerArry.push("NetuneiGvia -false");
                                    }
                                    mimshk.taktziv_netunei_gvia=taktziv_netunei_gvia_object;
                                    // PirteiHafkadaAchrona
                                    let pirtei_hafkada_achrona_array=[];
                                    try{
                                            pirtei_hafkada_achrona.perut_pirtei_hafkada_achrona={};
                                            pirtei_hafkada_achrona.perut_hafkada_achrona_array=[];
                                            var perut_pirtei_hafkada_achrona_list = pirtei_hafkada_achrona_list.getElementsByTagName("PerutPirteiHafkadaAchrona")
                                                for (y = 0; y < perut_pirtei_hafkada_achrona_list.$$length; y++) {
                                                    let pirtei_hafkada_achrona={};
                                                   // PerutPirteiHafkadaAchrona
                                                    my_params.entity = perut_pirtei_hafkada_achrona_list[y];
                                                    let perut_pirtei_hafkada_achrona_object = await taktziv_pirtei_hafkada_achrona.extract_taktziv_pirtei_hafkada_achrona_from_xml(my_params);
                                                    pirtei_hafkada_achrona.perut_pirtei_hafkada_achrona=perut_pirtei_hafkada_achrona_object;
                                                   // PerutHafkadaAchrona
                                                   try{
                                                        var perut_hafkada_achrona_list = yitra_lefi_gil_prisha_list[x].getElementsByTagName("PerutHafkadaAchrona")
                                                        for (y = 0; y < perut_hafkada_achrona_list.$$length; y++) {
                                                            my_params.entity = perut_hafkada_achrona_list[y];
                                                            let taktziv_perut_hafkada_achrona_object = await taktziv_perut_hafkada_achrona.extract_taktziv_perut_hafkada_achrona_from_xml(my_params);
                                                            pirtei_hafkada_achrona.perut_hafkada_achrona_array.push(taktziv_perut_hafkada_achrona_object);
                                                            answerArry.push("PerutHafkadaAchrona - ok");
                                                        }
                                                      }catch (err) {
                                                          answerArry.push("PerutHafkadaAchrona - false");//  throw err;
                                                      }
                                                   pirtei_hafkada_achrona_array.push(pirtei_hafkada_achrona);
                                                   
                                                }
                                        }catch (err) {
                                                        answerArry.push("perut_hafkada_achrona 2 - false");//  throw err;
                                        }
                                   
                                    mimshk.pirtei_hafkada_achrona_array=pirtei_hafkada_achrona_array;

                                    // PerutHafkadotMetchilatShana
                                    let taktziv_perut_hafkadot_metchilat_shana_array=[];
                                    try{
                                            var perut_hafkadot_metchilat_shana_list = pirti_taktziv_list[z].getElementsByTagName("PerutHafkadotMetchilatShana");
            
                                            for (y = 0; y < perut_hafkadot_metchilat_shana_list.$$length; y++) {
                                                my_params.entity = perut_hafkadot_metchilat_shana_list[y];
                                                let taktziv_perut_hafkadot_metchilat_shana_object =
                                                await taktziv_perut_hafkadot_metchilat_shana.extract_taktziv_perut_hafkadot_metchilat_shana_from_xml(my_params);
                                                taktziv_perut_hafkadot_metchilat_shana_array.push(taktziv_perut_hafkadot_metchilat_shana_object);
                                            }
                                            
                                            answerArry.push("PerutHafkadotMetchilatShana - ok");
                                        }catch (err) {
                                            answerArry.push("PerutHafkadotMetchilatShana - false");
                                    }
                                    mimshk.perut_hafkadot_metchilat_shana_array=taktziv_perut_hafkadot_metchilat_shana_array;
                                    // HafkadotShnatiyot
                                    let taktziv_hafkadot_shnatiyot_object={};
                                    try{
                                            my_params.entity = pirti_taktziv_list[z].getElementsByTagName("HafkadotShnatiyot")[0];
                                            taktziv_hafkadot_shnatiyot_object = await taktziv_hafkadot_shnatiyot.extract_taktziv_hafkadot_shnatiyot_from_xml(my_params);
                                            answerArry.push("HafkadotShnatiyot - ok");
                                        }catch (err) {
                                            answerArry.push("HafkadotShnatiyot - false");
                                    }
                                   
                                    // MeshichaNiud  
                                    let taktziv_meshicha_niud_array=[];
                                    try{
                                            var meshicha_niud_list = pirti_taktziv_list[z].getElementsByTagName("MeshichaNiud");
                                            
                                            for (y = 0; y < meshicha_niud_list.$$length; y++) {
                                                my_params.entity = meshicha_niud_list[y];
                                                let taktziv_meshicha_niud_object =  await taktziv_meshicha_niud.extract_taktziv_meshicha_niud_from_xml(my_params);
                                                taktziv_meshicha_niud_array.push(taktziv_meshicha_niud_object);
                                            }
                                            answerArry.push("MeshichaNiud - ok");
                                        }catch (err) {
                                            answerArry.push("MeshichaNiud - false");
                                    }
                                    // ChovPigur
                                    let taktziv_chov_pigur_array=[];
                                    try{
                                            var chov_pigur_list = pirti_taktziv_list[z].getElementsByTagName("ChovPigur");
            
                                            for (y = 0; y < chov_pigur_list.$$length; y++) {
                                                my_params.entity = chov_pigur_list[y];
                                                let taktziv_chov_pigur_object = await taktziv_chov_pigur.extract_taktziv_chov_pigur_from_xml(my_params);
                                                taktziv_chov_pigur_array.push(taktziv_chov_pigur_object);
                                            }
                                            answerArry.push("ChovPigur - ok");
                                        }catch (err) {
                                            answerArry.push("ChovPigur -false");
                                    }
                                    mimshk.chov_pigur_array=taktziv_chov_pigur_array;
                                    // PerutHotzaot
                                    let perut_hotzaot_object={};
                                    try{ 
                                        var perut_hotzaot= pirti_taktziv_list[z].getElementsByTagName("PerutHotzaot");
                                             // HotzaotBafoalLehodeshDivoach 
                                        try {  
                                                perut_hotzaot_object.hotzaot_bafoal_lehodesh_divoach={};
                                                my_params.entity = perut_hotzaot[0].getElementsByTagName("HotzaotBafoalLehodeshDivoach")[0];
                                            
                                                taktziv_hotzaot_bafoal_lehodesh_divoach_object =
                                                await taktziv_hotzaot_bafoal_lehodesh_divoach.extract_taktziv_hotzaot_bafoal_lehodesh_divoach_from_xml(my_params);
                                                perut_hotzaot_object.hotzaot_bafoal_lehodesh_divoach=taktziv_hotzaot_bafoal_lehodesh_divoach_object;
                                                answerArry.push("HotzaotBafoalLehodeshDivoach - ok");
                                            }catch (err) {
                                                answerArry.push("HotzaotBafoalLehodeshDivoach - false");
                                            }
                                            // MivneDmeiNihul
                                            try{
                                                    perut_hotzaot_object.mivne_dmei_nihul_array=[];
                                                    var mivne_dmei_nihul_list = perut_hotzaot[0].getElementsByTagName("MivneDmeiNihul")
                                                    for (y = 0; y < mivne_dmei_nihul_list.$$length; y++) {
                                                        my_params.entity = mivne_dmei_nihul_list[y];
                                                        let taktziv_mivne_dmei_nihul_object =
                                                        await taktziv_mivne_dmei_nihul.extract_taktziv_mivne_dmei_nihul_from_xml(my_params);
                                                        perut_hotzaot_object.mivne_dmei_nihul_array.push(taktziv_mivne_dmei_nihul_object);
                                                    }
                                                    answerArry.push("MivneDmeiNihul - ok");
                                                }catch (err) {
                                                    answerArry.push("MivneDmeiNihul - false");
                                                }
                                           
                                        }catch (err) {
                                                //  throw err;
                                        }
                                    mimshk.perut_hotzaot=perut_hotzaot_object;    
                                    //   PerutYitrotLesofShanaKodemet   perut_yitrot_sesof_shana_kodemet
                                    let taktziv_perut_yitrot_sesof_shana_kodemet_object={} ;
                                    try{
                                             my_params.entity = pirti_taktziv_list[z].getElementsByTagName("PerutYitrotLesofShanaKodemet")[0];
                                            taktziv_perut_yitrot_sesof_shana_kodemet_object =
                                            await taktziv_perut_yitrot_sesof_shana_kodemet.extract_taktziv_perut_yitrot_sesof_shana_kodemet_from_xml(my_params);
                                            answerArry.push("PerutYitrotLesofShanaKodemet - ok");
                                        }catch (err) {
                                            answerArry.push("PerutYitrotLesofShanaKodemet - ok");
                                        }
                                    mimshk.perut_yitrot_sesof_shana_kodemet=taktziv_perut_yitrot_sesof_shana_kodemet_object;
                                    // BlockItrot
                                    // Yitrot
                                    let yitrot_object={};
                                    try{
                                            yitrot_object.yitrot={};
                                            yitrot_object.perut_yitrot_array=[];
                                            yitrot_object.perut_yitra_le_tkufa_array=[];
                                            yitrot_object.yitrot_shonot={};
                                            let params_yitrot={};
                                            var yitrot_list = pirti_taktziv_list[z].getElementsByTagName("Yitrot")
                                            for (x = 0; x < yitrot_list.$$length; x++) {
                                               //Yitrot
                                                try{
                                                    try {
                                                            my_params.taarich_erech_tzvirt = yitrot_list[x].getElementsByTagName("TAARICH-ERECH-TZVIROT")[0].childNodes[0].data;
                                                            
                                                        } catch (e) {
                                                            my_params.taarich_erech_tzvirt = null;
                                                        
                                                    }
                                                    
                                                    my_params.entity = yitrot_list[x];
                                                    my_params.mone = Math.random() * 1000 | 0; // (Math.random() * 1000); 
                                                    yitrot_object.yitrot = await taktziv_yitrot.extract_taktziv_yitrot_from_xml(my_params);
                                                    answerArry.push("Yitrot - ok");
                                                    } catch (e) {
                                                    my_params.taarich_erech_tzvirt = null;
                                                    answerArry.push("Yitrot - false");
                                                }
                                                    //PerutYitrot
                                                try{
                                                        var perut_yitrot_list = yitrot_list[x].getElementsByTagName("PerutYitrot")
                                                        for (y = 0; y < perut_yitrot_list.$$length; y++) {
                                                            my_params.entity = perut_yitrot_list[y];
                                                            let taktziv_perut_yitrot_object = await taktziv_perut_yitrot.extract_taktziv_perut_yitrot_from_xml(my_params);
                                                            yitrot_object.perut_yitrot_array.push(taktziv_perut_yitrot_object);
                                                        }
                                                       
                                                        params_yitrot.perut_yitrot_list=yitrot_object.perut_yitrot_array;
                                                        params_yitrot.my_no_police=my_params.my_no_police;
                                                        let perut_yitrot_cross_tab = await taktziv_perut_yitrot.get_perut_yitrot_cross_tab(params_yitrot);
                                                        yitrot_object.perut_yitrot_cross_tab=perut_yitrot_cross_tab;
                                                        answerArry.push("PerutYitrot - ok");
                                                    }catch (err) {
                                                        answerArry.push("PerutYitrot - false");
                                                }
                                                // PerutYitraLeTkufa
                                                try{
                                                        var perut_yitra_le_tkufa_list = yitrot_list[x].getElementsByTagName("PerutYitraLeTkufa")
                                                        for (y = 0; y < perut_yitra_le_tkufa_list.$$length; y++) {
                                                            my_params.entity = perut_yitra_le_tkufa_list[y];
                                                            let taktziv_perut_yitra_le_tkufa_object =
                                                                await taktziv_perut_yitra_le_tkufa.extract_taktziv_perut_yitra_le_tkufa_from_xml(my_params);
                                                                yitrot_object.perut_yitra_le_tkufa_array.push(taktziv_perut_yitra_le_tkufa_object);
                                                        }
                                                        params_yitrot.perut_yitrot_le_tkufa_list=yitrot_object.perut_yitra_le_tkufa_array;
                                                        params_yitrot.my_no_police=my_params.my_no_police;
                                                        if (typeof(yitrot_object.perut_yitra_le_tkufa_array[0])!="undefined"){
                                                            let perut_yitrot_le_tkufa_cross_tab = await taktziv_perut_yitra_le_tkufa.get_perut_yitrot_le_tkufa_cross_tab(params_yitrot);
                                                            yitrot_object.perut_yitrot_le_tkufa_cross_tab=perut_yitrot_le_tkufa_cross_tab;
                                                        }
                                                        answerArry.push("PerutYitraLeTkufa - ok");
                                                    }catch (err) {
                                                        answerArry.push("PerutYitraLeTkufa - false");
                                                }
                                                // YitrotShonot
                                                try{
                                                        my_params.entity = yitrot_list[x].getElementsByTagName("YitrotShonot")[0];
                                                        taktziv_yitrot_shonot_object =
                                                            await taktziv_yitrot_shonot.extract_taktziv_yitrot_shonot_from_xml(my_params);
                                                            yitrot_object.yitrot_shonot=taktziv_yitrot_shonot_object;
                                                            answerArry.push("YitrotShonot - ok");
                                                        }catch (err) {
                                                            answerArry.push("YitrotShonot - false");
                                                }

                                            }   // end of for BlockItrot
                                        }catch (err) {
                                          // throw err;
                                        }
                                    mimshk.yitrot=yitrot_object;
                                    
                                } // end of FOR pirti_taktziv
            
                                // PerutMeyupeKoach
                                let perut_meyupe_koach_object={};
                                try{
                                        my_params.entity = heshbonot_o_polisot[j].getElementsByTagName("PerutMeyupeKoach")[0];
                                        perut_meyupe_koach_object = await perut_meyupe_koach.extract_perut_meyupe_koach_from_xml(my_params);
                                        answerArry.push("PerutMeyupeKoach - ok");
                                    }catch (err) {
                                        answerArry.push("PerutMeyupeKoach - false");
                                }
                                mimshk.perut_meyupe_koach=perut_meyupe_koach_object;
                                // Kisuim
                                let kisuim_object=[];
                                let params_kisuim={};
                                let kisuy_cross_tab={
                                    "a":0,
                                    "b":0,
                                    "c":0,
                                    "d":0,
                                    "e":0,
                                    "f":0,
                                    "g":0,
                                    "h":0,
                                    "i":0,
                                    "j":0,
                                    "k":0,
                                    "l":0
                                };
                                try{
                                        var kisuim_list = heshbonot_o_polisot[j].getElementsByTagName("Kisuim");
                                        for (z = 0; z < kisuim_list.$$length; z++) {
                                            // ZihuiKisui
                                            let zihui_kisui_object={};
                                            let zihui_kisui_current={};
                                            try{
                                                    var my_zihui_kisui = kisuim_list[z].getElementsByTagName("ZihuiKisui");
                                                    my_params.entity = my_zihui_kisui[0];
                                                    zihui_kisui_current = await zihui_kisui.extract_zihui_kisui_from_xml(my_params);
                                                    answerArry.push("ZihuiKisui - ok");
                                                }catch (err) {
                                                    answerArry.push("ZihuiKisui - false");
                                                }
                                            zihui_kisui_object.zihui_kisui=zihui_kisui_current;
                                            // PirteiMevutach
                                            let pirtei_mevutach_array=[];
                                            try{
                                                    var    pirtei_mevutach_list = my_zihui_kisui[0].getElementsByTagName("PirteiMevutach");
                                                
                                                    if (typeof pirtei_mevutach_list != 'undefined') {
                                                        for (y = 0; y < pirtei_mevutach_list.$$length; y++) {
                                                            my_params.entity = pirtei_mevutach_list[y];
                                                            let pirtei_mevutach_object =  await pirtei_mevutach.extract_pirtei_mevutach_from_xml(my_params);
                                                            pirtei_mevutach_array.push(pirtei_mevutach_object);
                                                        }
                                                    }
                                                    answerArry.push("PirteiMevutach - ok");
                                                }catch (err) {
                                                    answerArry.push("PirteiMevutach - false");
                                                }
                                            zihui_kisui_object.pirtei_mevutach_array= pirtei_mevutach_array;
                                            // SchumeiBituahYesodi
                                            let schumei_bituah_sesodi_object={};
                                            try{
                                                    my_params.entity = my_zihui_kisui[0].getElementsByTagName("SchumeiBituahYesodi")[0];
                                                //  if (typeof my_params.entity != 'undefined') {
                                                        var children = my_params.entity.childNodes;
                                                        not_empty_elemnt=find_empty_element(children);
                                                        if (not_empty_elemnt==true) {
                                                        
                                                            schumei_bituah_sesodi_object = await schumei_bituah_sesodi.extract_schumei_bituah_sesodi_from_xml(my_params);
                                                            if (sug_muzar==6){
                                                                heshbon_o_polisa_object.SCHUM_BITUAH_LEMAVET=   schumei_bituah_sesodi_object.SCHUM_BITUAH_LEMAVET;
                                                            }
                                                        }
                                                        answerArry.push("SchumeiBituahYesodi - ok");
                                                //  }
                                                
                                                }catch (err) {
                                                    answerArry.push("SchumeiBituahYesodi - false");
                                                }
                                            zihui_kisui_object.schumei_bituah_sesodi= schumei_bituah_sesodi_object;
                                            // PirteiKisuiBeMutzar
                                            let pirtei_kisui_be_mutzar_object={};
                                            try{
                                                    my_params.entity = my_zihui_kisui[0].getElementsByTagName("PirteiKisuiBeMutzar")[0];
                                
                                                    if (typeof my_params.entity != 'undefined') {
                                                        try {
                                                            my_params.shem_kisui_tatzran = my_zihui_kisui[z].getElementsByTagName("SHEM-KISUI-YATZRAN")[0].childNodes[0].data;
                                                            
                                                        } catch (e) {
                                                            my_params.shem_kisui_tatzran = "";
                                                        
                                                        }
            
                                                        pirtei_kisui_be_mutzar_object = await pirtei_kisui_be_mutzar.extract_pirtei_kisui_be_mutzar_from_xml(my_params);
                                                        answerArry.push("PirteiKisuiBeMutzar - ok");
                                                    }
                                                }catch (err) {
                                                    answerArry.push("PirteiKisuiBeMutzar - false");
                                                }
                                            zihui_kisui_object.pirtei_kisui_be_mutzar= pirtei_kisui_be_mutzar_object;
                                         //   kisuim_cross_tab
                                            params_kisuim.kisuy_cross_tab=kisuy_cross_tab;
                                            params_kisuim.schum_bituach=pirtei_kisui_be_mutzar_object.SCHUM_BITUACH;
                                            params_kisuim.sug_kisuy_bitochi=pirtei_kisui_be_mutzar_object.SUG_KISUY_BITOCHI;
                                            kisuy_cross_tab=fill_kisuy_cross_tab(params_kisuim);
                                            // PirteiTosafot pirtei_tosafot
                                            let pirtei_tosafot_array=[];
                                            try{
                                                    my_params.entity = my_zihui_kisui[0].getElementsByTagName("PirteiTosafot")[0];
                                                    if (typeof my_params.entity !='undefined' ) {
                                                    my_params.entity = my_zihui_kisui[0].getElementsByTagName("PirteiTosafot")[0];
                                                        
                                                        if (my_params.entity.childNodes.length>0) {
                                                            let pirtei_tosafot_object = await pirtei_tosafot.get_my_pirtei_tosafot(my_params);
                                                            pirtei_tosafot_array.push(pirtei_tosafot_object);
                                                        }
                                                        answerArry.push("PirteiTosafot - ok");
                                                    }
                                                }catch (err) {
                                                    answerArry.push("PirteiTosafot - false");
                                                }
                                            zihui_kisui_object.pirtei_tosafot_array= pirtei_tosafot_array;    
                                            //Mutav mutav
                                            let mutav_array=[];
                                            try{
                                                    var mutav_list = my_zihui_kisui[0].getElementsByTagName("Mutav");
                                                    if (typeof mutav_list != 'undefined') {
                                                        for (y = 0; y < mutav_list.$$length; y++) {
                                                            my_params.entity = mutav_list[y];
                                                            if (my_params.entity.childNodes.length > 0) {
                                                               let mutav_object = await mutav.extract_tmutav_from_xml(my_params);
                                                               mutav_array.push(mutav_object);
                                                            }
                                                        }
                                                        answerArry.push("Mutav - ok");
                                                    }
                                                }catch (err) {
                                                    answerArry.push("Mutav - false");
                                                }
                                            zihui_kisui_object.mutav_array= mutav_array;
                                            //KisuiBKerenPensia 
                                          // let kisui_b_keren_pensia_array={};
                                            let kisui_b_keren_pensia_object ={};
                                            try {
                                                    not_empty_elemnt=false;
                                                    my_params.entity = my_zihui_kisui[0].getElementsByTagName("KisuiBKerenPensia")[0];
                                                    if (typeof my_params.entity != 'undefined'){
                                                        var children = my_params.entity.childNodes;
                                                        not_empty_elemnt=find_empty_element(children);
                                                        if (not_empty_elemnt==true) {
                                                             kisui_b_keren_pensia_object = await kisui_b_keren_pensia.extract_kisui_b_keren_pensia_from_xml(my_params);
                                                          //  kisui_b_keren_pensia_array=kisui_b_keren_pensia_object;
                                                        }
                                                    }
                                                    answerArry.push("KisuiBKerenPensia - ok");
                                                }catch (err) {
                                                    answerArry.push("KisuiBKerenPensia - false");
                                                }
                                            zihui_kisui_object.kisui_b_keren_pensia=kisui_b_keren_pensia_object;
                                        
                                            
                                            //Miktsoa-Isuk-Tachviv miktsoa_isuk_tachviv
                                            let miktsoa_isuk_tachviv_array=[]; 
                                            try{
                                                    var miktsoa_isuk_tachviv_list = my_zihui_kisui[0].getElementsByTagName("Miktsoa-Isuk-Tachviv");
                                                    if (typeof miktsoa_isuk_tachviv_list != 'undefined') {
                                                        for (y = 0; y < miktsoa_isuk_tachviv_list.$$length; y++) {
                                                            my_params.entity = miktsoa_isuk_tachviv_list[y];
                                                            if (my_params.entity.childNodes.length > 0) {
                                                                let miktsoa_isuk_tachviv_object = await miktsoa_isuk_tachviv.extract_miktsoa_isuk_tachviv_from_xml(my_params);
                                                                miktsoa_isuk_tachviv_array.push(miktsoa_isuk_tachviv_object);
                                                            }
                                                        }
                                                    }
                                                    answerArry.push("miktsoa_isuk_tachviv - ok");
                                                }catch (err) {
                                                    answerArry.push("miktsoa_isuk_tachviv - false");
                                                }
                                            zihui_kisui_object.miktsoa_isuk_tachviv_array=miktsoa_isuk_tachviv_array;
            
                                            kisuim_object.push(zihui_kisui_object);
                                        } // end of for Kisuim

                                        mimshk.kisuim= kisuim_object;
                                        mimshk.kisuy_cross_tab= kisuy_cross_tab;
                                        heshbon_o_polisa_object.a=kisuy_cross_tab.a;
                                        heshbon_o_polisa_object.b=kisuy_cross_tab.b;
                                        heshbon_o_polisa_object.c=kisuy_cross_tab.c;
                                        heshbon_o_polisa_object.d=kisuy_cross_tab.d;
                                        heshbon_o_polisa_object.e=kisuy_cross_tab.e;
                                        heshbon_o_polisa_object.f=kisuy_cross_tab.f;
                                        heshbon_o_polisa_object.g=kisuy_cross_tab.g;
                                        heshbon_o_polisa_object.h=kisuy_cross_tab.h;
                                        heshbon_o_polisa_object.i=kisuy_cross_tab.i;
                                        heshbon_o_polisa_object.j=kisuy_cross_tab.j;
                                    }catch (err) {
                                    //  throw err;
                                }

                                mimshk.heshbon_o_polisa_array=heshbon_o_polisa_array;
                                mimshk.heshbon_o_polisa.push(heshbon_o_polisa_object);
                                mimshk_array.push(mimshk);
                            } // end of FOR  heshbonot_o_polisot
               
                       
                     
                   
                    }
                   var xxx=JSON.stringify( mimshk);
                   // resolvefile(answerArry);
                  // resolvefile(JSON.stringify( mimshk));
                 
                  resolvefile( mimshk);
                // resolvefile( heshbon_o_polisa_array);
                } catch (err) {
                  //  return "not ok";
                
                    rejectfile(err);
                }
            });
            // finally {
            //     heshbon_o_polisa.close_connection(connection);
            // }
    }
}