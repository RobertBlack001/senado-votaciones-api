class MQTTEvents {

    // ==========================
    // Sesiones
    // ==========================

    static SESION_INICIADA = 'SESION_INICIADA';
    static SESION_FINALIZADA = 'SESION_FINALIZADA';

    // ==========================
    // Votaciones
    // ==========================

    static VOTACION_INICIADA = 'VOTACION_INICIADA';
    static VOTACION_CERRADA = 'VOTACION_CERRADA';
    static VOTACION_EXTENDIDA = 'VOTACION_EXTENDIDA';
    static VOTO_REGISTRADO = 'VOTO_REGISTRADO';
    static VOTO_MODIFICADO = 'VOTO_MODIFICADO';

    // ==========================
    // Tablets
    // ==========================

    static TABLET_CONECTADA = 'TABLET_CONECTADA';
    static TABLET_DESCONECTADA = 'TABLET_DESCONECTADA';

}

export default MQTTEvents;