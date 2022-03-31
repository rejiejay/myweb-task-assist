class Broadcast {
    constructor() {
        const self = this
        this.receiveHandle = []

        try {
            this.myChannel = new window.BroadcastChannel('jeker-diary-record-system');
            this.myChannel.onmessage = (event) => {
                console.log('jeker-diary-record-system BroadcastChannel message event received!');
                self.receiveHandle.forEach(handle => {
                    try {
                        handle && handle(event)
                    } catch (error) {
                        console.error(error);
                    }
                })
            }
        } catch (error) {
            this.myChannel = {}
            console.error(error);
        }
    }

    postMessage(messageObject) {
        this.myChannel.postMessage(messageObject);
    }

    receiveMessage(handle) {
        this.receiveHandle.push(handle);
    }
}

export default new Broadcast();
