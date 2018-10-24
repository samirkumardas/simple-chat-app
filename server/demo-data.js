const userAction = require('./actions/user');
const channelAction = require('./actions/channel');

async function importData() {
    let _users = [],
        counter = 0,
        user;
    
    user = await userAction.singup({
        name: 'Test1',
        email: 'test1@test.com',
        password: '123456'
    });
    _users.push(user.id);

    user = await userAction.singup({
        name: 'Test2',
        email: 'test2@test.com',
        password: '123456'
    });
    _users.push(user.id);

    user = await userAction.singup({
        name: 'Test3',
        email: 'test3@test.com',
        password: '123456'
    });
    _users.push(user.id);

    await channelAction.addChannel({
        name: 'Channel-1',
        purpose: 'Purpose - 1',
        __id: _users[counter++],
        members: _users
    });

   await channelAction.addChannel({
        name: 'Channel-2',
        purpose: 'Purpose - 2',
        __id: _users[counter++],
        members: _users
    });
}

module.exports = importData;
