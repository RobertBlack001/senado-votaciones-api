import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {

    console.log('');
    console.log('=====================================');
    console.log('  Senado Votaciones API');
    console.log('=====================================');
    console.log(`  Puerto   : ${PORT}`);
    console.log(`  Estado   : Iniciada`);
    console.log('=====================================');
    console.log('');

});

/**
 * Cierre controlado
 */
process.on('SIGINT', () => {

    console.log('\nCerrando servidor...');

    server.close(() => {

        console.log('Servidor detenido.');
        process.exit(0);

    });

});

process.on('SIGTERM', () => {

    console.log('\nCerrando servidor...');

    server.close(() => {

        console.log('Servidor detenido.');
        process.exit(0);

    });

});