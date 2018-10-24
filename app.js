const mongoose = require('mongoose');
const ws = require('ws');

const constant = require('./config/constant');
const modelCreator = require('./model');
const PacketHandler = require('./packet-handler');

/* middleware */
const authenticate = require('./middleware/authenticate');
const actionHandler = require('./middleware/action-handler');
const broadcastMessage = require('./middleware/broadcast-message');

const PORT = process.env.PORT || constant.PORT;

/* Mongo */
mongoose.connect(constant.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', () => console.log('Unable to connect with database.'));
db.once('open', () => {
    modelCreator();
});
/* Mongo end */

const messageHandler = new PacketHandler();
messageHandler.use(authenticate);
messageHandler.use(actionHandler);
messageHandler.use(broadcastMessage);

const wss = new ws.Server({ port: PORT });
wss.on('connection', (ws) => {
    console.log('Client Connected. Readly for request ....');
    ws.on('message', (packet) => {
        messageHandler.process(packet, ws);
    });
});