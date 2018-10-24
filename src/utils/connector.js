import Socket from './socket';
import CONSTANTS from '../config/constants';

class Connector {
    constructor() {
        this.packets = Object.create(null);
        this.queue = [];
        this.subscribers = [];
        this.packetId = 1;
        this.failedOffset = 10000;
        this.noOfRetry = 1;
        this.keepAliveInterval = false;
        this.lastReconnectTime = this.lastCleanTime  = this.lastPingTime = Date.now();
        this.onReceive = this.onReceive.bind(this);
        this.request = this.request.bind(this);
        this.socket = new Socket(CONSTANTS.SOCKET_URL, this.onReceive);
        this.socket.connect();
        this.startKeepAliveInterval();
    }
    subscribe(fn) {
        this.subscribers.push(fn);
    }
    unsubscribe(fn) {
        this.subscribers = this.subscribers.filter( each => {
             return fn !== each;
        });
    }
    broadcast(data) {
        this.subscribers.forEach(fn => {
            fn(data);
        });
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
        try {
            data = JSON.parse(data);
         } catch(parseError) {
            data = {
                error: true,
                errorDesc: 'json parse error'
            }
        }
        let packetId = data.packetId || 0;
        if (this.packets[packetId]) {
            if (data.error) {
                this.packets[packetId].reject(data);
            } else {
                this.packets[packetId].resolve(data);
            }
            this.removePacket(packetId);
        } else if (data.act && data.act !=='pong') {
            this.broadcast(data);
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
            this.socket.reconnect();
            this.noOfRetry++;
            this.lastReconnectTime = now;
        }
    }
    cleanFailedPacket() {
        const now = Date.now();
        for (let packetId in this.packets) {
            let packet = this.packets[packetId];
            if ((now - packet.time) > this.failedOffset) {
                packet.data.errorDesc = 'Unable to communicate with server!';
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

            if ((now - this.lastPingTime) > 30000) {
                this.socket.send({
                    act: 'ping'
                });
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