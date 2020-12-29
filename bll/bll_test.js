var test_dal = require("../dal/test_dal");
var config = require("../config").config;
const path = require('path');
const fs = require('fs');

const cp = require('child_process');

const parseTestLogic = require("./parseXML/parseTestLogic");



module.exports = {
    async sqltest(params) {
        var sqlStr = getSqlStr(params);
        if (true) {

            try {
                let db_result = await test_dal.sqltest(sqlStr)
                let result = db_result[0];
                result[0].bll_added = "test";
                return result;

                // Stored procedure 



            } catch (err) {
                // ... error checks 
                throw { hasError: 1, errmsg: err.errmsg };
            }
        }
    },
    async saveFiles(params) {
        try {
            return new Promise(async (resolveall, rejectall) => {
                var filePromises = [];
                var dirPath = path.join(config.fileSavePath, "fileTest");
                try {
                    await new Promise((resolvedir, rejectdir) => {
                        fs.stat(dirPath, (err, stats) => {
                            if (err) {
                                // Directory doesn't exist or something.
                                fs.mkdir(dirPath, (errmkd, folder) => {
                                    if (!errmkd)
                                        resolvedir();
                                    else
                                        rejectdir(errmkd);
                                });
                            }
                            else if (!stats.isDirectory()) {
                                rejectdir(new Error(dirPath + ' is not a directory!'));
                            }
                            else {
                                resolvedir();
                            }
                        });
                    });

                    Object.keys(params.files).forEach((name) => {
                        var fileEnt = params.files[name];
                        filePromises.push(new Promise((resolve, reject) => {
                            fs.writeFile(path.join(dirPath, fileEnt.filename), fileEnt.buffer, 'utf8', (err) => {
                                if (err) {
                                    reject({ filename: fileEnt.filename, errmsg: err.errmsg });
                                }
                                else {
                                    resolve({ filename: fileEnt.filename });
                                }
                            });
                        }));
                    });
                    try {
                        let values = await Promise.all(filePromises);
                        resolveall(values);
                    } catch (reason) {
                        rejectall(reason);
                    }
                } catch (e) {
                    rejectall(e);
                }
            });
        } catch (err) {
            throw err;
        }
    },
    async parseTestXML(params) {// child process: https://www.youtube.com/watch?v=9o8B3L0-d9c
        try {
            return new Promise(async (resolveall, rejectall) => {
                if (!config.xml.parseXmlInChildProc) {
                    try {
                        var res = parseTestLogic.parseXML(params.files[Object.keys(params.files)[0]])
                        resolveall({ result: res });
                    } catch (e) {
                        rejectall(e);
                    }
                }
                else {
                    try {
                        var res = await parseXMLChildProc(params.files[Object.keys(params.files)[0]]);
                        resolveall({ result: res });
                    } catch (e) {
                        rejectall(e);
                    }
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
                var execArgv = [];
                if (typeof v8debug === 'object')
                    execArgv = ['--debug=5859'];

                let n = cp.fork('./bll/parseXML/parseTestExecute.js', [], { execArgv: execArgv });
                n.on('message', (m) => {
                    console.log('PARENT got message:', m);
                    if (m.error != null) {
                        rejectall(m.error);
                    }
                    else {
                        resolveall(m.result);
                    }
                });
                n.send(fileData);

            } catch (e) {
                rejectall(e);
            }
        });
    } catch (err) {
        throw err;
    }
}

function getSqlStr(myParams) {
    var sqlStr = "";
    var my_int = 0;
    var x = myParams.serial;
    var a = myParams['serial'];
    switch (myParams.numerator) {
        case "1":
            my_int = parseInt(myParams.serial, 10);
            sqlStr = "Select * from Clients Where Serial =" + myParams.serial;
            break;
        default:
            sqlStr = "";
            break;
    }
    return sqlStr;
}