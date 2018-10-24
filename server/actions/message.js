const mongoose = require('mongoose');
const moment = require('moment');
const channelAction = require('./channel');
const UserAction = require('./user');

const getStatusFlag = (type) => {
    if (type == 'pristine') return 0;
    else if (type == 'delivered') return 2;
    else if (type == 'read') return 3;
    return 0;
};

const getFlagText = (value) => {
    if (value == 0) return 'Pristine';
    else if (value == 2) return 'Delivered';
    else if (value == 3) return 'Read';
    return 'Pristine';
};

const getFormatedDate = (time) => {
    if ((Date.now() - time) < 86400) {
        return moment(time).fromNow();
    } else {
        return moment(time).format('h:mm:ss a MMM Do, YYYY');
    }
};

class MessageAction {
    addMessage(data) {
        return new Promise((resolve, reject) => {
             let to = data.to,
                 from = data.__id,
                 content = data.content,
                 type = data.type,
                 status = [],
                 flag = getStatusFlag('delivered'),
                 Message = mongoose.connection.models.message;

            const toUserOrChannel = type == 'channel' ? channelAction.getChannel(to) : UserAction.getUser(to);
            if (!toUserOrChannel) {
                reject('Invalid message receiver!');
                return;
            }
            if (type == 'private') {
                status[to] = flag;
            } else {
               toUserOrChannel.members.forEach((member => {
                   status[member] = flag;
               }));
            }

            const newMessage = new Message();
            newMessage.from =from;
            newMessage.to = to;
            newMessage.content = content;
            newMessage.type = type;
            newMessage.time = new Date();
            newMessage.status = status;
            newMessage.save()
                    .then(message => {
                        if (message) {
                            const id = message._id.toString();
                            const fromUser = UserAction.getUser(from);
                            const _message = {
                                id,
                                from,
                                to,
                                fromName: fromUser.name,
                                toName: toUserOrChannel.name,
                                content: content,
                                status : getFlagText(flag),
                                time: getFormatedDate(message.time),
                                type,
                                __broadcast: status
                            };
                            resolve(_message);
                        } else {
                            reject('Somthing went wrong while saving...');
                        }
                    })
                    .catch((error) => {
                        reject('Could be server bug! Do some debug to dig out');
                    });
        });
    }

    getConversationMessages(data) {
        return new Promise((resolve, reject) => {
            let Message = mongoose.connection.models.message,
                type = data.type,
                participant1 = mongoose.Types.ObjectId(data.__id),
                participant2 = mongoose.Types.ObjectId(data.id);

            const _private_where = { 
                $or: [
                        { $and: [ 
                                    { from: participant1 }, 
                                    { to: participant2 }
                                ] 
                        }, 
                        { $and: [ 
                                    { from: participant2 }, 
                                    { to: participant1 }
                                ]
                        } 
                    ]};
            const _condition = (type == 'channel') ? { to: data.id } : _private_where;
            
            Message.find(_condition)
                .then(messages => {
                    const _messages =[];
                    if (messages) {
                        messages.forEach( message => {
                            const fromUser = UserAction.getUser(message.from.toString());
                            const toUserOrChannel = message.type == 'channel' ? channelAction.getChannel(message.to.toString()) : UserAction.getUser(message.to.toString());
                            const _message = {
                                id: message._id.toString(),
                                from: message.from,
                                to: message.to,
                                fromName: fromUser.name,
                                toName: toUserOrChannel.name,
                                content: message.content,
                                status: getFlagText(message.status[data.id]),
                                time: getFormatedDate(message.time),
                                type: message.type
                            };
                            _messages.push(_message);
                        });
                    }
                    resolve({'messages':_messages});
                })
                .catch((error) => {
                    reject('Could be server bug! Do some debug to dig out');
                });
        });
    }
}
module.exports = new MessageAction();