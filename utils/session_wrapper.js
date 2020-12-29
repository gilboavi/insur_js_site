module.exports = {
    sessionKeys: {
        userId:"userId"
    },
    addToSession(session, key, value) {
        session[key] = value;
    },
    getFromSession(session, key) {
        return session[key];
    }
}