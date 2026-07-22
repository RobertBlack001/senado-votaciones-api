import mqtt from 'mqtt';

class MQTTClient {

    constructor() {
        this.client = null;
        this.connected = false;
    }

    async connect() {

        if (this.connected) {
            return;
        }

        if (this.client) {

            return new Promise((resolve, reject) => {

                this.client.once('connect', () => {
                    this.connected = true;
                    resolve();
                });

                this.client.once('error', reject);

            });

        }

        const options = {
            clientId: process.env.MQTT_CLIENT_ID,
            username: process.env.MQTT_USERNAME,
            password: process.env.MQTT_PASSWORD,
            reconnectPeriod: 5000,
            connectTimeout: 30000,
            clean: true
        };

        const url = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORT}`;

        console.log(`[MQTT] Conectando a ${url}`);

        return new Promise((resolve, reject) => {

            this.client = mqtt.connect(url, options);

            this.client.on('reconnect', () => {
                console.log('[MQTT] Reconectando...');
            });

            this.client.on('close', () => {
                this.connected = false;
                console.log('[MQTT] Conexión cerrada');
            });

            this.client.on('offline', () => {
                this.connected = false;
                console.log('[MQTT] Cliente offline');
            });

            this.client.on('error', (error) => {
                console.error('[MQTT] Error:', error.message);
            });

            this.client.once('connect', () => {

                this.connected = true;

                console.log('[MQTT] ✅ Conectado');

                resolve();

            });

            this.client.once('error', reject);

        });

    }

    disconnect() {

        if (!this.client) {
            return;
        }

        this.client.end(false, () => {
            console.log('[MQTT] Desconectado');
        });

    }

    async publish(topic, message, options = {}) {

        if (!this.connected) {
            throw new Error('MQTT no está conectado.');
        }

        return new Promise((resolve, reject) => {

            this.client.publish(
                topic,
                message,
                options,
                (error) => {

                    if (error) {
                        return reject(error);
                    }

                    resolve();

                }
            );

        });

    }

    async subscribe(topic, options = {}) {

        if (!this.connected) {
            throw new Error('MQTT no está conectado.');
        }

        return new Promise((resolve, reject) => {

            this.client.subscribe(
                topic,
                options,
                (error, granted) => {

                    if (error) {
                        return reject(error);
                    }

                    resolve(granted);

                }
            );

        });

    }

    async unsubscribe(topic) {

        if (!this.connected) {
            throw new Error('MQTT no está conectado.');
        }

        return new Promise((resolve, reject) => {

            this.client.unsubscribe(
                topic,
                (error) => {

                    if (error) {
                        return reject(error);
                    }

                    resolve();

                }
            );

        });

    }

    on(event, callback) {

        if (!this.client) {
            throw new Error('MQTT no inicializado.');
        }

        this.client.on(event, callback);

    }

    isConnected() {
        return this.connected;
    }

}

export default new MQTTClient();