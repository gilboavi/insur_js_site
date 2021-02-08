var authentication_dal = require("../dal/authentication_dal");


module.exports = {
    async login(params) {
        try {
            let db_result = await authentication_dal.get_user_auth_by_username(params);
            let authData = db_result[0][0];
            if (params.pass_word == authData.pass_word) { 
                return { isAuthenticated: true, userId: authData.serial };
            }
            else {
                return { isAuthenticated: false };
            }
        } catch (err) {
            throw { hasError: 1, errmsg: err.errmsg };
        }
    }
}