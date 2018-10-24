const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const constant = require('../config/constant');
const userSocket = require('../ws-handler');

class UserAction {
    constructor() {
        this.__users = Object.create(null);
    }
    singup(data) {
        return new Promise((resolve, reject) => {
             let name = data.name,
                 email = data.email,
                 password = data.password,
                 User = mongoose.connection.models.user;

             User.findOne({'email': email})
                .then((user) => {
                    if (user) {
                        reject('User already exist');
                    } else {
                        const newUser = new User();
                        bcrypt.hash(password, constant.SALT_ROUNDS)
                            .then(hash => {
                                newUser.email = email;
                                newUser.name = name;
                                newUser.password = hash;
                                newUser.save()
                                    .then(user => {
                                        if (user) {
                                            const id = user._id.toString();
                                            const token = this.getSessionToken(email, id);
                                            const _user = {
                                                name,
                                                email,
                                                token,
                                                id
                                            }
                                            this.__users[id] = _user;
                                            resolve(_user);
                                        } else {
                                            reject('Unable to register');
                                        }
                                    });
                            });
                    }
                })
                .catch((error) => {
                    reject('Unable to register');
                });
        });
    }

    login(data) {
        return new Promise((resolve, reject) => {
             let email = data.email,
                 password = data.password,
                 User = mongoose.connection.models.user;

            User.findOne({'email': email})
                .then((user) => {
                    if (user) {
                        const id = user._id.toString(),
                              name = user.name,
                              _password = user.password;
                        bcrypt.compare(password, _password).then((res) => {
                            if (res) {
                                const token = this.getSessionToken(email, id);
                                resolve({
                                    name,
                                    email,
                                    token,
                                    id
                                });
                                this.__users[id] = { id, name };
                            } else {
                                reject('Username or password is incorrect');
                            }
                        });
                    } else {
                       reject('Username or password is incorrect');
                    }
                })
                .catch((error) => {
                    reject('Could be server bug! Do some debug to dig out');
                });
        });
    }
    logout(data) {
        return new Promise((resolve, reject) => {
            userSocket.remove(data.__id);
            resolve({
                ok: true
            });
        });
    }
    geUsers(data) {
        return new Promise((resolve, reject) => {
            let User = mongoose.connection.models.user;
            User.find({ _id: { $ne: data.__id } })
                .then(users => {
                    const _users = [];
                    if (users) {
                        users.forEach( user => {
                            const id = user._id.toString();
                            const _user = {
                                id,
                                name: user.name
                            };
                            _users.push(_user);
                            this.__users[id] = _user;
                        });
                    }
                    resolve({'members':_users});
                })
                .catch((error) => {
                    reject('Could be server bug! Do some debug to dig out');
                });
        });
    }

    updateMessageStatus(message_id, user_id) {
        return true; /* TO DO */
    }

    getUser(id) {
        return this.__users[id];
    }

    getSessionToken(__email, __id) {
        return jwt.sign({ __email, __id }, constant.JWT_TOKEN, { expiresIn: constant.TOKEN_VALIDITTY });
    }
}
module.exports = new UserAction();