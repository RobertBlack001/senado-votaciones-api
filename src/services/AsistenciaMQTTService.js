import Publisher from "../mqtt/Publisher.js";
import MQTTTopics from "../mqtt/MQTTTopics.js";
import MQTTEvents from "../mqtt/MQTTEvents.js";

class AsistenciaMQTTService {

    async publicarRecoleccionIniciada(recoleccion) {

        await this.publicar(
            MQTTEvents.RECOLECCION_ASISTENCIA_INICIADA,
            recoleccion
        );

    }

    async publicarRecoleccionFinalizada(recoleccion) {

        await this.publicar(
            MQTTEvents.RECOLECCION_ASISTENCIA_FINALIZADA,
            recoleccion
        );

    }

    async publicarAsistenciaRegistrada(asistencia) {

        await this.publicar(
            MQTTEvents.ASISTENCIA_REGISTRADA,
            asistencia
        );

    }

    async publicarTipoAsistenciaActualizado(asistencia) {

        await this.publicar(
            MQTTEvents.TIPO_ASISTENCIA_ACTUALIZADO,
            asistencia
        );

    }

    async publicar(event, data) {

        try {

            await Publisher.publish({
                topic: MQTTTopics.ASISTENCIA,
                event,
                data
            });

        } catch (error) {

            console.error(
                `[MQTT][ASISTENCIA] Error al publicar el evento ${event}:`,
                error.message
            );

        }

    }

}

export default new AsistenciaMQTTService();