//var each = require('foreach');
const me=this;
var fs = require('fs');
var xml2js = require('xml2jS');
var heshbon_o_polisa = require('../read_xml/heshbon_o_polisa');
var config = require("../config").config;

const sql = require('mssql');
const parseXML_bl = require('../bll/parseXML_bl');

function get_yeshut_yatzran(xml_file) {
    var yeshut_yatzran = {};
    xml2js.parseString(xml_file, function (err, result) {
        yeshut_yatzran = result.Mimshak.YeshutYatzran[0];
    });
    return yeshut_yatzran;
}

async function  getfile_promise(){
    return new Promise(async (resolveall, rejectall) => {
        try{
                var parser       = new xml2js.Parser();
                 var xmlfile =__dirname +" /../read_xml/avi.xml";
   
                fs.readFile(xmlfile, "utf-8", function (error, text) {
                    if (error) {
                        rejectall ( error);
                    }else {
                         parser.parseString(text, function (err, result) {
                         resolveall(JSON.stringify(result));
                     });
                     }
                });

            } catch (err) {
                  //  rejectall(e);
                  rejectall (err );
            }
    });  
        
}


async function  getfile2(){
    var parser       = new xml2js.Parser();
    var xmlfile =__dirname +" /../read_xml/avi.xml";
    var a;
     fs.readFile(xmlfile, "utf-8", function (error, text) {
              var y;
             if (error) {
                 throw error;
             }else {
                 parser.parseString(text, function (err, result) {
                    a= (JSON.stringify(result));
                    getfile2=a;
                 });
     
             }
           
        });
       // return a;
        
}

module.exports = {


    async ppp(params) {
        
       
            
        return new Promise(async (resolveall, rejectall) => {
            try{
            //     let that=this;
            //    var x=  getfile2();
            //   var y= await x;
               const p= await getfile_promise();

          
              resolveall({value:p});
            } catch (err) {
                  //  rejectall(e);
                  rejectall (err );
            }
        });   
            
     },
     
   
    async parseMimshak(params) {
        try {
           // let msg="הקובץ נקלט";
            let data= await parseXML_bl.parseMimshak(params);
            return data;
        } catch (err) {
            throw { hasError: 1, errmsg: err };
        }
    },

    async parseMimshak_object(params) {
        try {
           // let msg="הקובץ נקלט";
            let data= await parseXML_bl.parseMimshak_object(params);
            return data;
        } catch (err) {
            throw { hasError: 1, errmsg: err };
        }
    },

    async read_xml_old(params) {


        var xml_file = fs.readFileSync('./read_xml/avi.xml', 'utf-8');
        var yeshut_yatzran = {};
        var muzar = {};
        var yeshut_lakoach = {};
        yeshut_yatzran = get_yeshut_yatzran(xml_file);
        var kod_mezahe_yatzran = yeshut_yatzran["KOD-MEZAHE-YATZRAN"][0];
        muzar = yeshut_yatzran.Mutzarim[0].Mutzar;
        var my_sug_muzar = muzar[0].NetuneiMutzar[0]["SUG-MUTZAR"][0];
        yeshut_lakoach = muzar[0].NetuneiMutzar[0].YeshutLakoach[0];
        var my_id_client = yeshut_lakoach["MISPAR-ZIHUY-LAKOACH"][0];
        var heshbonot_o_polisot = {};
        var entity = {};
        var my_paramsa = {};
        var my_counter = 0
        try {
            let pool = await sql.connect(config.mssql.test_db)
            my_paramsa.pool = pool;
            my_paramsa.sql = sql;
            for (var i in muzar) {
                heshbonot_o_polisot = muzar[i].HeshbonotOPolisot[0].HeshbonOPolisa;
                for (var x  in heshbonot_o_polisot) {
                    entity = heshbonot_o_polisot[my_counter];
                   
                    my_paramsa.KOD_MEZAHE_YATZRAN = kod_mezahe_yatzran;
                    my_paramsa.sug_muzar = my_sug_muzar;
                    my_paramsa.id_client = my_id_client;
                    my_paramsa.entity = entity;
                 
                    let my_police = await heshbon_o_polisa.get_heshbon_o_polisa(my_paramsa);
                    my_counter++;
                }
            };
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
            
            
             
            
      
       

        sql.close();

        return {};
        //entity = heshbonot_o_polisot[0];
            //var my_paramsa = {};
            //my_paramsa.KOD_MEZAHE_YATZRAN = yeshut_yatzran["KOD-MEZAHE-YATZRAN"][0];
            //my_paramsa.sug_muzar = 3;
            //my_paramsa.id_client = 55;
            //my_paramsa.entity = entity;

            //try {
            //   let pool = await sql.connect(config.mssql.test_db)
            //   my_paramsa.pool = pool;
            //   my_paramsa.sql = sql;
            //    let my_police = await heshbon_o_polisa.get_heshbon_o_polisa(my_paramsa);

            //} catch (err) {
            //     ... error checks 
            //    throw { hasError: 1, errmsg: err.errmsg };
            //}



    },


    async read_xml_bak(params) {
       
           
            var xml = fs.readFileSync('./read_xml/avi.xml', 'utf-8');
            var yeshut_yatzran = {};
            xml2js.parseString(xml, function (err, result) {
                yeshut_yatzran = result.Mimshak.YeshutYatzran[0];



                    //.Mutzarim[0].Mutzar[0].NetuneiMutzar[0].YeshutLakoach[0]["SHEM-MISHPACHA"][0];
                var b = result.Mimshak.YeshutYatzran[0].Mutzarim[0].Mutzar[0].NetuneiMutzar[0].
                    YeshutLakoach[0]["SHEM-PRATI"][0];
                var c = result.Mimshak.YeshutYatzran[0]["SHEM-YATZRAN"][0];
                var entity = result.Mimshak.YeshutYatzran[0].Mutzarim[0].Mutzar[0].HeshbonotOPolisot[0].
                    HeshbonOPolisa[0];
               

                var my_paramsa = {};
                my_paramsa.KOD_MEZAHE_YATZRAN = result.Mimshak.YeshutYatzran[0]["KOD-MEZAHE-YATZRAN"][0];
                my_paramsa.sug_muzar = 3;
                my_paramsa.id_client = 55;
                my_paramsa.entity = entity;
                var my_police = heshbon_o_polisa.get_heshbon_o_polisa(my_paramsa);
               
                
               
               
                 
                var d = result.Mimshak.YeshutYatzran[0].Mutzarim[0].Mutzar[0].HeshbonotOPolisot[0].
                    HeshbonOPolisa[0]["SHEM-TOCHNIT"][0];
                var e = result.Mimshak.YeshutYatzran[0].Mutzarim[0].Mutzar[0].HeshbonotOPolisot[0].
                    HeshbonOPolisa[1]["SHEM-TOCHNIT"][0];
                a = a + "" + "3";
            })


       return {};
       
    
    
    
},


    async read_xml2() {
   

   // var filePath = GetFilePath();   // Assume this returns a fully qualified XML file path
    try {
       // var fileData = fs.readFileSync(filePath, 'ascii');
        var fileData = fs.readFileSync('./read_xml/avi.xml', 'utf-8');
        var parser = new xml2js.Parser();
        parser.parseString(fileData.substring(0, fileData.length), function (err, result) {
            var json = JSON.stringify(result);
        });

        console.log("File '" + filePath + "/ was successfully read.\n");
    } catch (ex) {
        console.log("Unable to read file '" + filePath + "'.");
        console.log(ex);
    }
}

}