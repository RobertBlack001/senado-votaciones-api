import AppException from '../exceptions/AppException.js';

const errorHandler = (error, req, res, next) => {

    if (error instanceof AppException) {

        return res.status(error.statusCode).json({

            success: false,

            message: error.message

        });

    }

    console.error(error);

    return res.status(500).json({

        success: false,

        message: 'Error interno del servidor'

    });

};

export default errorHandler;