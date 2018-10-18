export default class Socket {
    constructor(url, fn) {
        this.url = url;
        this.subscribe = fn;
    }
    isActive() {
        return (this.ws && this.ws.readyState  === 1);
    }
    connect() {
        try {
            this.ws = new WebSocket(this.url);
            this.initSocket = this.initSocket.bind(this);
            this.onClose = this.onClose.bind(this);
            this.onError = this.onError.bind(this);
            this.addEvents();
        } catch (err) {
            /*eslint-disable */
            console.log(`websocket connection error. ${err.name}: ${err.message}`);
            /*eslint-disable */
        }
    }
    reconnect() {
        this.removeEvents();
        this.ws = null;
        this.connect();
    }
    addEvents() {
        this.ws.addEventListener('open', this.initSocket);
        this.ws.addEventListener('close', this.onClose);
        this.ws.addEventListener('error', this.onError);
    }
    removeEvents() {
        this.ws.removeEventListener('open', this.initSocket);
        this.ws.removeEventListener('close', this.onClose);
        this.ws.removeEventListener('error', this.onError);
    }
    initSocket() {
        this.ws.onmessage = this.recieve.bind(this);
    }
    destroy() {
        this.removeEvents();
        this.ws.close();
        this.ws = null;
    }
    close() {
        this.ws.close();
    }
    onClose() {
        //console.log('Socket closed');
    }
    onError() {
        //console.log('Socket error');
    }
    recieve(event) {
        this.subscribe(event.data);
    }
    send(data) {
        this.ws.send(JSON.stringify(data));
    }
}