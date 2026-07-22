import MQTTClient from './MQTTClient.js';

class Publisher {

    async publish({
        topic,
        event,
        data = {},
        qos = 1,
        retain = false
    }) {

        this.validate(topic, event);

        const message = this.buildMessage(
            event,
            data
        );

        await MQTTClient.publish(
            topic,
            JSON.stringify(message),
            {
                qos,
                retain
            }
        );

        console.log(
            `[MQTT] Evento publicado -> ${event} | Topic -> ${topic}`
        );

    }

    validate(topic, event) {

        if (!topic) {
            throw new Error('El topic es obligatorio.');
        }

        if (!event) {
            throw new Error('El evento es obligatorio.');
        }

    }

    buildMessage(event, data) {

        return {
            event,
            timestamp: new Date().toISOString(),
            data
        };

    }

}

export default new Publisher();