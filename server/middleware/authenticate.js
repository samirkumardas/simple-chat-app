const jwt = require('jsonwebtoken');
const constant = require('../config/constant');
const userAction = require('../actions/user');

module.exports = function (packet, next, done) {
    if (packet.act && constant.SESSION_LESS_ACTION.indexOf(packet.act) !== -1) {
       next();
       return;
    }
    
    if (packet.token) {
        jwt.verify(packet.token, constant.JWT_TOKEN, function(err, decoded) {
             if (!err || (err && err.name == 'TokenExpiredError')) {
                const decoded = jwt.decode(packet.token);
                packet.__id = decoded.__id;
                if (err && err.name == 'TokenExpiredError') {
                    packet.reply.token = userAction.getSessionToken(decoded.__email, decoded.__id);
                }
                next();
             } else {
                packet.reply.error = true;
                packet.reply.errorDesc = 'INVALID_SESSION';
                done();
             }
        });
    }
};