class MQTTEvents {

    // ==========================
    // Sesiones
    // ==========================

    static SESION_INICIADA = 'SESION_INICIADA';
    static SESION_FINALIZADA = 'SESION_FINALIZADA';

    // ==========================
    // Asistencia
    // ==========================

    static RECOLECCION_ASISTENCIA_INICIADA = 'RECOLECCION_ASISTENCIA_INICIADA';
    static ASISTENCIA_REGISTRADA = 'ASISTENCIA_REGISTRADA';
    static TIPO_ASISTENCIA_ACTUALIZADO = 'TIPO_ASISTENCIA_ACTUALIZADO';
    static RECOLECCION_ASISTENCIA_FINALIZADA = 'RECOLECCION_ASISTENCIA_FINALIZADA';

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