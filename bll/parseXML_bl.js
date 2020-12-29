



const fs = require('fs');
const config = require("../config").config;
const cp = require('child_process');

const xml2js       = require('xml2js');

const parseMimshak = require("./parseXML/parseMimshak");
const parseMimshak_new = require("./parseXML/parseMimshak_new");
const mimshk_object = require("./../read_xml/mimshk_object");

function get_file_buffer(my_file){
    var xml_file = fs.readFileSync('./read_xml/avi.xml');
    var fileData = {
        filename: "avi.xml",
        buffer:my_file // xml_file
    };
    return fileData;
}



module.exports = {

   
   
    async parseMimshak(params){
        return new Promise(async (resolveall, rejectall) => {
            try {
                    let that=this;
                   
                    var my_files= params.files;
                   

                    let filespromises = [];
                        Object.keys(my_files).forEach(function(key) {
                            let onefpromise = new Promise (async (resolveonef,rejectonef)=>{
                               
                                    let file_name;
                                    let file_buffer;
                                    let my_message = [];
                                    let fileData;    
                                    var res;
                                    file_buffer = my_files[key].buffer;
                                    file_name=my_files[key].filename;
                                    fileData=   get_file_buffer(file_buffer);
                                    prom= that.parseMimshak_with_out_for(fileData);
                                               
                                    res = await prom;
                                    
                                    resolveonef(file_name+"-"+ JSON.stringify(res));
                               
                            });
                            filespromises.push(onefpromise);                        
                           
                        });
                    
                        Promise.all(filespromises).then(values => { 
                           
                            resolveall({ result: values });
                          });

                     
                    
                } catch (e) {
                    rejectall(e);
                }
         });
      
      

    },
    
    async parseMimshak_object(params){
        return new Promise(async (resolveall, rejectall) => {
            try {
                    let that=this;
                    let my_params={};
                    var my_files= params.files;
                    let mimshk_array=[];
                    let filespromises = [];
                        Object.keys(my_files).forEach(function(key) {
                            let onefpromise = new Promise (async (resolveonef,rejectonef)=>{
                               
                                    let file_name;
                                    let file_buffer;
                                    let my_message = [];
                                    let fileData;    
                                    var res;
                                    file_buffer = my_files[key].buffer;
                                    file_name=my_files[key].filename;
                                 //   fileData=   get_file_buffer(file_buffer);
                                     fileData = {
                                        filename: "avi.xml",
                                        buffer:file_buffer // xml_file
                                    };
                                   // prom= that.parseMimshak_with_out_for_object(fileData);
                                               
                                    res = await that.parseMimshak_with_out_for_object(fileData);;
                                    mimshk_array.push(res);
                                    resolveonef(file_name+"-"+ JSON.stringify(res));
                               
                            });
                            filespromises.push(onefpromise);                        
                           
                        });
                    
                        Promise.all(filespromises).then(values => { 
                             my_params.Doc=JSON.stringify(mimshk_array);
                             my_params.Comment="";
                             my_params.Date_doc=new Date("2018-01-01");
                             my_params.ClientSerial=594;//params.client_serial;
        // here insert to db                   
                             // let frrr =  mimshk_object.inser_to_mimshk_object(my_params);
                            resolveall({ result: mimshk_array });
                          });

                     
                    
                } catch (e) {
                    rejectall(e);
                }
         });
      
      

    },
   

    // calls by parseMimshak
    // paese one xml file , send to dal for saving
    // and returns string that indictes success or false
    async parseMimshak_with_out_for(fileData) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
          
          //  return new Promise(async (resolve) => {
                    if (!config.xml.parseXmlInChildProc) {
                            var prom = parseMimshak.parseXML(fileData);
                            var res = await prom;
                        //   return  resolve({ result: res });
                        return   res ;
                    }
                    var res = await parseXMLChildProc(fileData);
                    //return resolve({ result: res });
                    return   res ;
         //   });
               
    
    },

    async parseMimshak_with_out_for_object(fileData) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        
        //  return new Promise(async (resolve) => {
                  if (!config.xml.parseXmlInChildProc) {
                          var res =await parseMimshak_new.parseXML_to_json(fileData);
                          return   res ;
                  }
                  var res = await parseXMLChildProc(fileData);
                  //return resolve({ result: res });
                  return   res ;
       //   });
             
  
    },

 //  === not in use

    parseMimshak_with_out_for_new(fileData) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        
                    return new Promise(async (resolve) => {
                            if (!config.xml.parseXmlInChildProc) {
                                    var prom = parseMimshak.parseXML(fileData);
                                    var res = await prom;
                                   return  resolve({ result: res });
                            }
                            var res = await parseXMLChildProc(fileData);
                            return resolve({ result: res });
                    });
            
            },

    parseMimshak_with_out_for_bak1(fileData) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        
                    return new Promise(async (resolveall, rejectall) => {
                        try {
                            
                          // let fileData=   get_file_buffer(my_file);
                          
                            if (!config.xml.parseXmlInChildProc) {
                                try {
                                    var prom = parseMimshak.parseXML(fileData);
                                    var res = await prom;
                                    resolveall({ result: res });
                                } catch (e) {
                                    rejectall(e);
                                }
                            }
                            else {
                                try {
                                    var res = await parseXMLChildProc(fileData);
                                    resolveall({ result: res });
                                } catch (e) {
                                    rejectall(e);
                                }
                            }
                        } catch (e) {
                            rejectall(e);
                        }
                    });
            
            },
       
            

   
    async ppp(params){
        
        
        var parser       = new xml2js.Parser();
       // var xmlfile = __dirname + "/../tmp/xmlfiles/booksxml.xml";
       var xmlfile =__dirname +" /../read_xml/avi.xml";
            fs.readFile(xmlfile, "utf-8", function (error, text) {
        
                if (error) {
        
                    throw error;
        
                }else {
        
                    parser.parseString(text, function (err, result) {
        
                       
        
                        return (JSON.stringify(result));
        
                    });
        
                }
        
           });
    },
    async parseMimshak_bak1(params){
        return new Promise(async (resolveall, rejectall) => {
            try {
                    let that=this;
                    let file_name;
                    let file_buffer;
                    let my_message = [];
                    let fileData;    
                    var res;
                    var my_files= params.files;

                    let filespromises = [];
                        Object.keys(my_files).forEach(function(key) {
                            let onefpromise = new Promise (async (resolveonef,rejectonef)=>{
                                try 
                                { 
                                    file_buffer = my_files[key].buffer;
                                    file_name=my_files[key].filename;
                                    fileData=   get_file_buffer(file_buffer);
                                    prom= that.parseMimshak_with_out_for(fileData);
                                               
                                    res = await prom;
                                    resolveonef(file_name+"-"+ JSON.stringify(res));
                                }
                                catch (e) 
                                {
                                    resolveonef(file_name+"-"+ JSON.stringify(e));
                                 }
                            });
                            filespromises.push(onefpromise);                        
                           
                        });
                    
                        Promise.all(filespromises).then(values => { 
                            resolveall({ result: values });
                          });

                     
                    
                } catch (e) {
                    rejectall(e);
                }
            });
      
      

    },

    async parseMimshak_boaz(params){
        return new Promise(async (resolveall, rejectall) => {
                    const fileObj = params.files,
                    filesArray = Object.keys(fileObj),
                    response = filesArray
                        .map(async key => { // retruns ne array
                                const 
                                    file_name=fileObj[key].filename || "unkown file" 
                                try {    
                                const    
                                    file_buffer = fileObj[key].buffer,
                                    fileData= get_file_buffer(file_buffer),
                                    prom= await this.parseMimshak_with_out_for(fileData),
                                    result  = JSON.stringify(  prom );
                                    return { 
                                        file_name, 
                                        result
                                    };
                                } catch(error){
                                    return {
                                        file_name,
                                        error
                                    };
                                }
                               
                            })
                            .reduce(async (sum,promise)=>{
                                const data = await promise;
                                if(data.error){
                                    sum.errors.push(data);
                                }else{
                                    sum.results.push(data.file_name);
                                }
                                return sum;
                            },{
                                errors : [],
                                results :[] 
                            });
                        resolveall(response);
            });
      
      

    },
    async parseMimshak_try1(params){
        
                let file_name;
                let file_buffer;
                let my_message = [];
                let fileData;    
                var res;
                var my_files= params.files;
              //  res = await parseMimshak.parseXML(fileData);
                Object.keys(my_files).forEach(async function(key) {
                    file_buffer = my_files[key].buffer;
                    file_name=my_files[key].filename;
                     
        
                  //  my_file=params.files[Object.keys(params.files)[0]].buffer
                     fileData=   get_file_buffer(file_buffer);
                     res=await parseMimshak.parseXML(fileData);
                   
                    my_message.push(file_name+"-"+res);
                });
        
                return my_message;
                    // parseMimshak.parseXML(fileData).done(function (data) { filename
                    //     return data;
                              
                    //     }).fail(function (err) {
                    //         throw(err);
                    // });
                    
              
        
    },

    async parseMimshak_working1(params){
        
         let that=this;
         let file_name;
         let file_buffer;
         let my_message = [];
         let fileData;    
         var res;
         var my_files= params.files;
       //  res = await parseMimshak.parseXML(fileData);
         Object.keys(my_files).forEach(async function(key) {
             file_buffer = my_files[key].buffer;
             file_name=my_files[key].filename;
              
 
           //  my_file=params.files[Object.keys(params.files)[0]].buffer
              fileData=   get_file_buffer(file_buffer);
              res=await that.parseMimshak_with_out_for(fileData);
            
             my_message.push(file_name+"-"+res);
         });
 
         return my_message;
             // parseMimshak.parseXML(fileData).done(function (data) { filename
             //     return data;
                       
             //     }).fail(function (err) {
             //         throw(err);
             // });
             
       
 
     },
 

     parseMimshak_bak(params) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        try {
            return new Promise(async (resolveall, rejectall) => {
                try {
                    var my_files= params.files;
                    Object.keys(my_files).forEach(function(key) {
                        var val = my_files[key].buffer;
                       var a="oo";
                      });
                    var xml_file = fs.readFileSync('./read_xml/avi.xml');
                    var fileData = {
                        filename: "avi.xml",
                        buffer: params.files[Object.keys(params.files)[0]].buffer // xml_file
                    };
                  
                    if (!config.xml.parseXmlInChildProc) {
                        try {
                            var res = await parseMimshak.parseXML(fileData)
                            resolveall({ result: res });
                        } catch (e) {
                            rejectall(e);
                        }
                    }
                    else {
                        try {
                            var res = await parseXMLChildProc(fileData);
                            resolveall({ result: res });
                        } catch (e) {
                            rejectall(e);
                        }
                    }
                } catch (e) {
                    rejectall(e);
                }
            });
        } catch (err) {
            throw err;
        }
    }
};

    async function parseXMLChildProc(fileData) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        try {
            return new Promise(async (resolveall, rejectall) => {
                try {
                    resolveall({});
                } catch (e) {
                    rejectall({ error: e });
                }
            });
        } catch (err) {
            throw err;
        }
    }