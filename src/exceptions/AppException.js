/**
 * Excepción base de la aplicación.
 *
 * Todas las excepciones del sistema deberán extender
 * esta clase.
 */
class AppException extends Error {

    constructor(message, statusCode = 500) {

        super(message);

        this.name = this.constructor.name;

        this.statusCode = statusCode;

        Error.captureStackTrace?.(
            this,
            this.constructor
        );

    }

}

export default AppException;