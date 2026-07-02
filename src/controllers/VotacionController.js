import VotacionService from '../services/VotacionService.js';
import AbrirVotacionRequest from '../dtos/requests/AbrirVotacionRequest.js';
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

    async abrir(req, res) {

        const { id } = req.params;
        const request = new AbrirVotacionRequest(req.body);

        const data = await VotacionService.abrir(
            id,
            request
        );

        return Response.success(
            res,
            data,
            'Votación iniciada correctamente.'
        );

    }

}

export default new VotacionController();