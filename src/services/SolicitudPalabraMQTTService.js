import Publisher from "../mqtt/Publisher.js";
import MQTTTopics from "../mqtt/MQTTTopics.js";
import MQTTEvents from "../mqtt/MQTTEvents.js";

class SolicitudPalabraMQTTService {

    async publicarSolicitudRegistrada(solicitud) {

        try {

            await Publisher.publish({
                topic: MQTTTopics.DASHBOARD,
                event: MQTTEvents.SOLICITUD_USO_PALABRA_REGISTRADA,
                data: {
                    id: solicitud.id,
                    idSesion: solicitud.idSesion,
                    idLegislador: solicitud.idLegislador,
                    estado: solicitud.estado,
                    createdAt: solicitud.createdAt
                }
            });

        } catch (error) {

            console.error("[MQTT]", error);

        }

    }

    async publicarSolicitudAceptada(solicitud) {

        try {

            await Publisher.publish({
                topic: MQTTTopics.DASHBOARD,
                event: MQTTEvents.SOLICITUD_USO_PALABRA_ACEPTADA,
                data: {
                    id: solicitud.id,
                    idSesion: solicitud.idSesion,
                    idLegislador: solicitud.idLegislador,
                    estado: solicitud.estado,
                    updatedAt: solicitud.updatedAt
                }
            });

        } catch (error) {

            console.error("[MQTT]", error);

        }

    }

    async publicarSolicitudCancelada(solicitud) {

        try {

            await Publisher.publish({
                topic: MQTTTopics.DASHBOARD,
                event: MQTTEvents.SOLICITUD_USO_PALABRA_CANCELADA,
                data: {
                    id: solicitud.id,
                    idSesion: solicitud.idSesion,
                    idLegislador: solicitud.idLegislador,
                    estado: solicitud.estado,
                    updatedAt: solicitud.updatedAt
                }
            });

        } catch (error) {

            console.error("[MQTT]", error);

        }

    }

}

export default new SolicitudPalabraMQTTService();