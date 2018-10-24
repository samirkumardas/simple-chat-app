const mongoose = require('mongoose');
const user = require('./schema/user');
const channel = require('./schema/channel');
const message = require('./schema/message');

const schemas = {
    user,
    channel,
    message
};

module.exports = () => {
    Object.keys(schemas).forEach( key => {
        mongoose.model(key, new mongoose.Schema(schemas[key](mongoose.Schema)));
    });
};