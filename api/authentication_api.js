// authentication_api

var authentication_bl = require("../bll/authentication_bl");
var session_wrapper = require("../utils/session_wrapper");

module.exports = {
    authFree:true,
    async login(params) {//[app path]/api?apiType=authentication_api&method=login&params={"username":"natan","password":"111111"}
        try {
            var authRes = await authentication_bl.login(params);
            var data = {};
            if (authRes.isAuthenticated) {
                session_wrapper.addToSession(params.session, session_wrapper.sessionKeys.userId, authRes.userId);
                data = { isAuthenticated: true, userId: session_wrapper.getFromSession(params.session, session_wrapper.sessionKeys.userId) };
               
            }
            else {
                data = { isAuthenticated: false };
                 
            }
                
            
            return data; 
        } catch (err) {
            throw { hasError: 1, errmsg: err.errmsg };
        }
        
    },
    get_current_userid(params) {//[app path]/api?apiType=authentication_api&method=get_current_userid&params={}
        try {
            return session_wrapper.getFromSession(params.session, session_wrapper.sessionKeys.userId);
        } catch (err) {
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}