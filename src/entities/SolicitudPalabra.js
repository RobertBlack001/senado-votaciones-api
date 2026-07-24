class SolicitudPalabra {
    constructor(data = {}) {
        this.id = data.id ?? null;
        this.idSesion = data.idSesion ?? null;
        this.idLegislador = data.idLegislador ?? null;
        this.estado = data.estado ?? null;
        this.createdAt = data.createdAt ?? null;
        this.updatedAt = data.updatedAt ?? null;
    }
}

export default SolicitudPalabra;
