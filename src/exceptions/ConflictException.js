import AppException from './AppException.js';

class ConflictException extends AppException {

    constructor(message = 'Conflicto') {

        super(message, 409);

    }

}

export default ConflictException;