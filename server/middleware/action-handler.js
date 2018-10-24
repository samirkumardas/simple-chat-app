const userAction = require('../actions/user');
const channelAction = require('../actions/channel');
const messageAction = require('../actions/message');

const finalizePromise = (promise, packet, next) => {
    promise.then(reply => {
             packet.reply = {...reply, ...packet.reply};
             next();
         }).catch(errorDesc => {
             packet.reply.error = true;
             packet.reply.errorDesc = errorDesc;
             next();
         });
};

module.exports = function (packet, next, done) {
    let promise;
    if (packet.act == 'signup') {
         promise = userAction.singup({
            name: packet.name,
            email: packet.email,
            password: packet.password
         });
         
    } else if (packet.act == 'login') {
         promise = userAction.login({
            email: packet.email,
            password: packet.password
         });
    } else if (packet.act == 'add_channel') {
        promise = channelAction.addChannel({
            name: packet.name,
            purpose: packet.purpose,
            members: packet.members,
            __id: packet.__id
        });
    } else if (packet.act == 'channels') {
        promise = channelAction.getMyChannels({
            __id: packet.__id
        });
    } else if (packet.act == 'members') {
        promise =  userAction.geUsers({
            __id: packet.__id
        });
    } else if (packet.act == 'message') {
        promise = messageAction.addMessage({
            to: packet.to,
            type: packet.type,
            content: packet.content,
            __id: packet.__id
         });
    } else if (packet.act == 'messages') {
        promise = messageAction.getConversationMessages({
            type: packet.type,
            id: packet.id,
            __id: packet.__id
         });
    } else if (packet.act == 'ack') {

    }
    finalizePromise(promise, packet, next);
};