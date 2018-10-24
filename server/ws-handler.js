class UserSocket {
    constructor() {
        this.__sockets = Object.create(null);
    }
    set(id, ws) {
        this.__sockets[id] = ws;
    }
    get(id) {
        return this.__sockets[id];
    }
    remove(id) {
        this.__sockets[id] = null;
    }
}
module.exports = new UserSocket();