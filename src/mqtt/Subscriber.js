import MQTTClient from './MQTTClient.js';

class Subscriber {

    constructor() {
        this.subscriptions = new Map();
    }

    /**
     * Suscribe un callback a un topic.
     *
     * @param {string} topic
     * @param {function} callback
     * @param {object} options
     */
    async subscribe(topic, callback, options = {}) {

        if (typeof callback !== 'function') {
            throw new Error('El callback debe ser una función.');
        }

        await MQTTClient.subscribe(topic, options);

        this.subscriptions.set(topic, callback);

        console.log(`[MQTT] Suscrito al topic: ${topic}`);
    }

    /**
     * Inicializa la escucha de mensajes.
     */
    start() {

        MQTTClient.on('message', async (topic, payload) => {

            const callback = this.subscriptions.get(topic);

            if (!callback) {
                return;
            }

            try {

                const message = JSON.parse(payload.toString());

                await callback(message);

            } catch (error) {

                console.error(`[MQTT] Error procesando mensaje de ${topic}`, error);

            }

        });

    }

}

export default new Subscriber();