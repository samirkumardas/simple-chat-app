const constant = require('../config/constant');
const userAction = require('../actions/user');
const userSocket = require('../ws-handler');

module.exports = function (packet, next, done) {
    if (packet.act
        && constant.BROADCAST_ACTIONS.indexOf(packet.act) !== -1
        && packet.reply.__broadcast) {
        
        const brodcastTo = packet.reply.__broadcast;
        packet.reply.__broadcast = true; /* Don't need broadcast data any more */

        for (let __id in brodcastTo) {
            if (packet.__id != __id) {
                const ws = userSocket.get(__id);
                if (ws && ws.readyState === 1) {
                    ws.send(JSON.stringify(packet.reply));
                    userAction.updateMessageStatus(__id, packet.reply.id);
                }
            }
        }
    }
    next();
};