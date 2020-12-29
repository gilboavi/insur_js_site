var config = require("./config").config;

var apis = ['testapi', 'account_api', 'authentication_api', 'conversation_api', "followup_conversation_api",
    'life_police_api', 'documents_api', 'communication_api',
    'kupa_gemel_api', 'proposal_life_api', 'maintaining_api', 'meeting_api', 'cuts_api', 'read_xml_api',
    "police_from_mimshak_api", "simulator_api", "follow_checks_api" , 'families_api' , 'family_members_api',
    "insurance_api" ] ;

﻿var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var session_wrapper = require("./utils/session_wrapper")


var apiContainer = {};

apis.forEach(function (api_entry) {
    apiContainer[api_entry] = require('./api/' + api_entry);
});



function finishResponse(req, res, responseObj) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    if (responseObj.IsFile) {
        res.setHeader('Content-disposition', 'attachment; filename=' + responseObj.Filename);
        res.setHeader('Content-type', responseObj.Mimetype);
        res.write(responseObj.Buffer, 'binary');
        res.end(null, 'binary');
    }
    else {
        res.write(JSON.stringify(responseObj));
        res.end();
    }


};





module.exports = {
    setRoutes(app, session) {
        try {
            var sess = {
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: {
                    domain: config.cookiedomain
                }
            }
            if (app.get('env') === 'production') {
                app.set('trust proxy', 1) // trust first proxy
                sess.cookie.secure = true // serve secure cookies
            }
            app.use(session(sess));

            async function proceedApiReq(req, res, action) {
                var api = apiContainer[action.apiType];
                if (typeof (api) != 'undefined') {
                    var userId;
                    if (!api.authFree)
                        if (typeof (userId = session_wrapper.getFromSession(req.session, session_wrapper.sessionKeys.userId)) === "undefined") {
                            finishResponse(req, res, { hasError: 1, msg: "Authentication Required", makeAuthentication: 1 });
                            return;
                        }
                    var method = api[action.method];
                    if (typeof (method) != 'undefined') {
                        if (typeof (action.params) == "undefined") {
                            action.params = {};
                        }
                        if (typeof (action.params) == "string") {
                            action.params = JSON.parse(action.params);
                        }
                        try {
                            action.params.session = req.session;
                            action.params.userId = userId
                            let result = await method(action.params);
                            finishResponse(req, res, result);
                        } catch (e) {
                            finishResponse(req, res, { hasError: 1, msg: e.errmsg });
                        }
                    }
                    else {
                        finishResponse(req, res, { hasError: 1, msg: "wrong method" });

                    }
                }
                else {
                    finishResponse(req, res, { hasError: 1, msg: "wrong apiType" });
                }
            }

            app.all('/f_upload', async function (req, res, next) {
                var form = new formidable.IncomingForm();
                var files_tmp = {};
                var files = {};
                form.onPart = function (part) {
                    if (!part.filename) {
                        // let formidable handle all non-file parts 
                        form.handlePart(part);
                    }
                    else {
                        part.addListener('data', function (data) {
                            // .... 
                            if (files_tmp[part.name] == null)
                                files_tmp[part.name] = { totallength: 0, filename: part.filename, buffers: [] };
                            files_tmp[part.name].totallength = files_tmp[part.name].totallength + data.length;
                            files_tmp[part.name].buffers.push(new Buffer(data));
                        });
                    }

                }
                form.on('end', function () {
                    Object.keys(files_tmp).forEach(function (name) {
                        var fileData = files_tmp[name];
                        var fileBuff = Buffer.concat(fileData.buffers, fileData.totallength);
                        files[name] = {
                            filename: fileData.filename,
                            buffer: fileBuff
                        };
                    });

                });
                form.parse(req, async function (err, fields, filesss) {
                    var params = JSON.parse(fields.params);
                    params.files = files;
                    var action = {
                        apiType: fields.apiType,
                        method: fields.method,
                        params: params
                    };
                    await proceedApiReq(req, res, action);



                });
            });
            //example of use [app path]/api?apiType=testapi&method=sqltest&params={"test":"gg"}
            app.all('/api', async function (req, res, next) {


                var action = {};
                if (req.method == "GET") {
                    action = req.query;
                }
                // פניה של post
                else {
                    action = req.body;
                }
                await proceedApiReq(req, res, action);
            });

            
        } catch (e) {
            console.log(e);
        }
    }

}
