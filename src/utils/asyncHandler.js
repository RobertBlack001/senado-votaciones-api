/**
 * Envuelve controladores asíncronos para evitar
 * repetir bloques try/catch en cada uno.
 *
 * Cualquier excepción será enviada al middleware
 * global de manejo de errores.
 *
 * @param {Function} fn
 * @returns {Function}
 */
const asyncHandler = (fn) => {

    return async (req, res, next) => {

        try {

            await fn(req, res, next);

        } catch (error) {

            next(error);

        }

    };

};

export default asyncHandler;