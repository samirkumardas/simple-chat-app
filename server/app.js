const mongoose = require('mongoose');
const ws = require('ws');

const constant = require('./config/constant');
const modelCreator = require('./model');
const PacketHandler = require('./packet-handler');

/* middleware */
const authenticate = require('./middleware/authenticate');
const actionProcessor = require('./middleware/action-processor');
const broadcastMessage = require('./middleware/broadcast-message');

const PORT = process.env.PORT || constant.PORT;

/* Mongo */
mongoose.connect(constant.MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', (error) => { 
    console.log(`Unable to connect with database - ${error}`);
    process.exit();
});
db.once('open', () => {
    modelCreator();
    addDemoData();
});
/* Mongo end */

const messageHandler = new PacketHandler();
messageHandler.use(authenticate);
messageHandler.use(actionProcessor);
messageHandler.use(broadcastMessage);

const wss = new ws.Server({ port: PORT });
wss.on('connection', (ws) => {
    console.log('Client Connected. Readly for request ....');
    ws.on('message', (packet) => {
        messageHandler.process(packet, ws);
    });
});


/* Only Demostration purpose */
const importData = require('./demo-data');
function addDemoData() {
    const User = mongoose.connection.models.user;
    User.findOne({'email': 'test1@test.com'})
        .then((user) => {
            if (!user) {
                importData();
            }
        });
}