import AppException from './AppException.js';

class NotFoundException extends AppException {

    constructor(message = 'Recurso no encontrado') {

        super(message, 404);

    }

}

export default NotFoundException;