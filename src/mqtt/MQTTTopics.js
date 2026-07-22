class MQTTTopics {

    // ==========================
    // Canales generales
    // ==========================

    static SESION = 'senado/sesion';

    static VOTACION = 'senado/votacion';

    static DASHBOARD = 'senado/dashboard';

    // ==========================
    // Tablets
    // ==========================

    static tabletCommand(idTablet) {
        return `senado/tablet/${idTablet}/comando`;
    }

    static tabletResponse(idTablet) {
        return `senado/tablet/${idTablet}/respuesta`;
    }

}

export default MQTTTopics;