import ValidationException from "../../exceptions/ValidationException.js";

class RegistrarSolicitudPalabraRequest {

    constructor(data = {}) {

        this.idLegislador = Number(data.idLegislador);

        this.validar();

    }

    validar() {

        if (!this.idLegislador) {

            throw new ValidationException(
                "El idLegislador es obligatorio."
            );

        }

        if (!Number.isInteger(this.idLegislador)) {

            throw new ValidationException(
                "El idLegislador debe ser un número entero."
            );

        }

        if (this.idLegislador <= 0) {

            throw new ValidationException(
                "El idLegislador debe ser mayor a cero."
            );

        }

    }

}

export default RegistrarSolicitudPalabraRequest;