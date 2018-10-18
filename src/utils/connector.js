import Socket from './socket';
import CONSTANTS from '../config/constants';

class Connector {
    constructor() {
        this.packets = Object.create(null);
        this.queue = [];
        this.packetId = 1;
        this.failedOffset = 10000;
        this.noOfRetry = 1;
        this.keepAliveInterval = false;
        this.lastReconnectTime = this.lastCleanTime  = this.lastPingTime = Date.now();
        this.socket = new Socket(CONSTANTS.SOCKET_URL);
        this.onReceive = this.onReceive.bind(this);
        this.request = this.request.bind(this);
        this.socket.connect();
        this.startKeepAliveInterval();
    }
    getPacketId() {
        return this.packetId++;
    }
    request(data) {
        return new Promise((resolve, reject) => {
            let packetId = this.getPacketId();
            this.packets[packetId] = {
                packetId,
                data,
                resolve,
                reject,
                time: Date.now()
            };
            this.queue.push(packetId);
        });
    }
    onReceive(data) {
        let packetId = data.packetId;
        if (this.packets[packetId]) {
            this.packets[packetId].resolve(data);
            this.removePacket(packetId);
        }
    }
    removePacket(packetId) {
        delete this.packets[packetId];
    }
    processQueue() {
        if (!this.queue.length) return false;
        if (this.socket.isActive()) {
            let packetId = this.queue.shift();
            if (this.packets[packetId]) {
                let data = this.packets[packetId].data;
                data.packetId = packetId;
                this.socket.send(data);
            }
            this.noOfRetry = 1;
        } else {
            this.reconnect();
        }
    }
    reconnect() {
        const now = Date.now();
        if ((now - this.lastReconnectTime) < (this.noOfRetry * 1000)) return;
        if (this.noOfRetry < 4) {
            this.ws.reconnect();
            this.noOfRetry++;
            this.lastReconnectTime = now;
        }
    }
    cleanFailedPacket() {
        const now = Date.now();
        for (let packetId in this.packets) {
            let packet = this.packets[packetId];
            if ((now - packet.time) > this.failedOffset) {
                packet.data.error = 'Unable to communicate with server!';
                packet.reject(packet.data);
                this.removePacket(packetId);
            }
        }
    }
    startKeepAliveInterval() {
        this.keepAliveInterval = setInterval(() => {
            const now = Date.now();
            if ((now - this.lastCleanTime) > this.failedOffset) {
                this.cleanFailedPacket();
                this.lastCleanTime = now;
            }

            if ((now - this.lastPingTime) > 5000) {
                this.socket.send('ping');
                this.lastPingTime = now;
            }
            this.processQueue();
        }, 1000);
    }
    stopKeepAliveInterval() {
        if (this.keepAliveInterval) {
            clearInterval(this.keepAliveInterval);
            this.keepAliveInterval = false;
        }
    }
    destroy() {
        this.stopKeepAliveInterval();
        this.socket.destroy();
    }
}

export default new Connector(); /* single instance */