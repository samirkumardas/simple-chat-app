const userSocket = require('./ws-handler');

function PacketHandler(fn) {
    this.middlewares = [];
}

PacketHandler.prototype.use = function use(fn) {
    this.middlewares.push(fn);
}
PacketHandler.prototype.process = function process(packet, ws) {
    var middlewares = this.middlewares.map(function(use){
        return use;
    });
     try {
        packet = JSON.parse(packet);
        packet.reply = { act: packet.act, packetId: packet.packetId || 0 };
     } catch(parseError) {
        packet = { reply: {
            error: true,
            errorDesc: 'json parse error'
        }};
    }

    function done() {
        if (packet && packet.reply) {
            ws.send(JSON.stringify(packet.reply));
        }

        /* save session associated with a user */
        if (packet.__id
            && userSocket.get(packet.__id) !== ws) {
            userSocket.set(packet.__id, ws);
        }
        middlewares = [];
    }

    function next() {
        if (middlewares.length) {
            var fn = middlewares.shift();
            fn.apply(null, [packet, next.bind(null), done.bind(null)]);
        } else {
           done();
        }
    }
    next();
}

PacketHandler.prototype.destroy = function destroy() {
    this.middleware = null;
}
module.exports = PacketHandler;