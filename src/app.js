import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import Response from './utils/response.js';
import errorHandler from './middlewares/errorHandler.js'

import routes from './routes/index.js';

const app = express();

app.use(helmet());

app.use(cors({
    origin: '*'
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(routes);

app.use((req, res) => {

    return Response.notFound(
        res,
        'Endpoint no encontrado'
    );

});

// Middleware de errores
app.use(errorHandler);

export default app;