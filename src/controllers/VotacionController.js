import VotacionService from '../services/VotacionService.js';
import Response from '../utils/Response.js';

class VotacionController {

    async obtenerEstado(req, res) {

        const { id } = req.params;

        const data = await VotacionService.obtenerEstado(id);

        return Response.success(
            res,
            data
        );

    }

}

export default new VotacionController();