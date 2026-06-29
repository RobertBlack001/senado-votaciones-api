import AppException from './AppException.js';

class ForbiddenException extends AppException {

    constructor(message = 'Acceso denegado') {

        super(message, 403);

    }

}

export default ForbiddenException;