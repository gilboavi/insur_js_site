var documents_dal = require("../dal/documents_dal");
const path = require('path');
const Guid = require("guid");
const config = require("../config").config;
const fs = require("fs")
const mime = require("mime");



module.exports = {
    async get_documents_list_by_clientserial(params) {
        try {
            let db_result = await documents_dal.get_documents_list_by_clientserial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_document_by_serial(params) {
        var a = params.serial;
        var b = a;
        try {
            let db_result = await documents_dal.get_document_by_serial(params)
            let result = db_result;
            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async get_file_by_serial(params) {
       
        try {
            let db_result = await documents_dal.get_document_by_serial(params)
            let result = db_result;
            let file_name = db_result.main[0].file_name;
         //   let filepath = path.join(config.fileFolder, file_name);
            return new Promise((resolveall, rejectall) => {
                try {
                    if(file_name!=""){
                        let filePath = path.join(config.fileFolder, file_name);
                    // var filename = path.basename(filePath);
                        var mimetype = mime.getType(file_name);

                        let buffer = fs.readFileSync(filePath);
                        let fileInfo = {
                            IsFile: true,
                            Filename: file_name,
                            Mimetype: mimetype,
                            Buffer: buffer
                        };

                        resolveall(fileInfo);
                   } else{
                    resolveall("file no exist");
                   }
                } catch (err) {
                    rejectall(err);
                }
           
            });
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    },

    async save_document(params) {
        
        // 4554332323.txt
        try {
            params.file_name="";
            if(params.files[Object.keys(params.files)[0]]){
                let old_file_name = params.files[Object.keys(params.files)[0]].filename;
                let file_extname = path.extname(old_file_name); 
                var client_serial = params.client_serial;
                params.files[Object.keys(params.files)[0]].oldfilename = old_file_name;
                var new_file_name = client_serial +"_"+ Guid.raw() + file_extname;
                params.file_name=new_file_name;
                params.files[Object.keys(params.files)[0]].newfilename = new_file_name;
            }
            let db_result = await documents_dal.save_documents(params);
            if(params.files[Object.keys(params.files)[0]]){
                let filepath = path.join(config.fileFolder, new_file_name);
                fs.writeFileSync(filepath, params.files[Object.keys(params.files)[0]].buffer );
            }
            let result = db_result;

            return result;
        } catch (err) {
            // ... error checks 
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }

}