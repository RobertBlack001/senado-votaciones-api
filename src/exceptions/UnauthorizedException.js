import AppException from './AppException.js';

class UnauthorizedException extends AppException {

    constructor(message = 'No autorizado') {

        super(message, 401);

    }

}

export default UnauthorizedException;