import AppException from './AppException.js';

class ValidationException extends AppException {

    constructor(message = 'Datos inválidos') {

        super(message, 400);

    }

}

export default ValidationException;