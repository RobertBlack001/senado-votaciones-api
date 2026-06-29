import healthService from '../services/HealthService.js';
import Response from '../utils/response.js';

class HealthController {

    async getStatus(req, res) {

        const data = healthService.getStatus();

        return Response.success(
            res,
            data,
            'Servicio disponible'
        );

    }

}

export default new HealthController();