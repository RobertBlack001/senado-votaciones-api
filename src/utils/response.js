class Response {

    /**
     * Respuesta exitosa (200)
     */
    static success(res, data = null, message = 'Operación realizada correctamente') {

        const response = {
            success: true,
            message
        };

        if (data !== undefined && data !== null) {
            response.data = data;
        }

        return res.status(200).json(response);


    }

    /**
     * Recurso creado (201)
     */
    static created(res, data = null, message = 'Recurso creado correctamente') {

        const response = {
            success: true,
            message
        };

        if (data !== undefined && data !== null) {
            response.data = data;
        }

        return res.status(201xx).json(response);


    }

    /**
     * Petición incorrecta (400)
     */
    static badRequest(res, message = 'Petición incorrecta', errors = null) {

        return res.status(400).json({
            success: false,
            message,
            errors
        });

    }

    /**
     * No autorizado (401)
     */
    static unauthorized(res, message = 'No autorizado') {

        return res.status(401).json({
            success: false,
            message
        });

    }

    /**
     * Prohibido (403)
     */
    static forbidden(res, message = 'Acceso denegado') {

        return res.status(403).json({
            success: false,
            message
        });

    }

    /**
     * No encontrado (404)
     */
    static notFound(res, message = 'Recurso no encontrado') {

        return res.status(404).json({
            success: false,
            message
        });

    }

    /**
     * Conflicto (409)
     */
    static conflict(res, message = 'Conflicto') {

        return res.status(409).json({
            success: false,
            message
        });

    }

    /**
     * Error interno (500)
     */
    static error(res, message = 'Error interno del servidor') {

        return res.status(500).json({
            success: false,
            message
        });

    }

}

export default Response;