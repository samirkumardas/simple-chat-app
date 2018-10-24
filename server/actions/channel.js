const mongoose = require('mongoose');

class ChannelAction {
    constructor() {
        this.__channels = Object.create(null);
    }
    addChannel(data) {
        return new Promise((resolve, reject) => {
             let name = data.name,
                 purpose = data.purpose,
                 owner = data.__id,
                 members = data.members || [],
                 Channel = mongoose.connection.models.channel;
            members.push(owner); // owser also be member of channel
            const newChannel = new Channel();
            newChannel.name = name;
            newChannel.purpose = purpose;
            newChannel.owner = owner;
            newChannel.members = members;
            newChannel.creationTime = new Date();
            newChannel.save()
                    .then(channel => {
                        if (channel) {
                            const id = channel._id.toString();
                            const _channel = {
                                name,
                                purpose,
                                owner,
                                members,
                                id
                            };
                            this.__channels[id] = _channel;
                            resolve(_channel);
                        } else {
                            reject('Unable to create channel');
                        }
                    })
                    .catch((error) => {
                        reject('Could be a server bug! Do some debug to dig out' + error);
                    });
        });
    }
    getMyChannels(data) {
        return new Promise((resolve, reject) => {
            let Channel = mongoose.connection.models.channel;
            Channel.find({ members: data.__id })
                .then(channels => {
                    const _channels =[];
                    if (channels) {
                        channels.forEach( channel => {
                            const id = channel._id.toString(), 
                                  members_str = channel.members.toString(),
                                  members = members_str ? members_str.split(',') : [];
                            const _channel = {
                                id,
                                name: channel.name,
                                purpose: channel.purpose,
                                owner: channel.owner.toString(),
                                members: members
                            };
                            _channels.push(_channel);
                            this.__channels[id] = _channel;
                        });
                    }
                    resolve({'channels':_channels});
                })
                .catch((error) => {
                    reject('Could be server bug! Do some debug to dig out');
                });
        });
    }
    getChannel(id) {
        return this.__channels[id];
    }
}
module.exports = new ChannelAction();