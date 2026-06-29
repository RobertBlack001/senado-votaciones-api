class HealthService {

    getStatus() {

        return {
            success: true,
            service: 'senado-votaciones-api',
            version: '1.0.0',
            status: 'OK',
            timestamp: new Date().toISOString()
        };

    }

}

export default new HealthService();