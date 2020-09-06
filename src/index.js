/**
 * Reading Environment Variables
 */
const dotenv = require('dotenv');
dotenv.config();

/**
 * Importing the Main App
 */
const app = require('./app');

//Iniciar el servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto ', app.get('port'));
});