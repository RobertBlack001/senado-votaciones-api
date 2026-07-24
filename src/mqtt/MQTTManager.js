import MQTTClient from './MQTTClient.js';
import Subscriber from './Subscriber.js';
import MQTTTopics from './MQTTTopics.js';

class MQTTManager {

    async start() {

        await MQTTClient.connect();

        Subscriber.start();

        await Subscriber.subscribe(
            MQTTTopics.VOTACION,
            async (message) => {

                console.log('[MQTT][VOTACION]:');
                console.log(message);

            }
        );

        await Subscriber.subscribe(
            MQTTTopics.DASHBOARD,
            async (message) => {

                console.log('[MQTT][DASHBOARD]');
                console.log(message);

            }
        );

        console.log('[MQTT] Módulo inicializado');

    }
    

}

export default new MQTTManager();