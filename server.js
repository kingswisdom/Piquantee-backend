/*-------------------------------------------------------/
|-----------------Variables globales--------------------/
|-----------------------------------------------------*/

const http = require('http');
const app = require('./app');
const port = normalizePort(process.env.PORT || '3000');
const server = http.createServer(app);

/*-------------------------------------------------------/
|-----------------------Processus-----------------------/
|-----------------------------------------------------*/

app.set('port', port);
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

/*-------------------------------------------------------/
|----------------------Fonctions------------------------/
|-----------------------------------------------------*/

const normalizePort = value => {                                                         //Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne
  const port = parseInt(value, 10);

  if (isNaN(port)) {
    return value;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const errorHandler = error => {                                                          //Recherche les différentes erreurs et les gère de manière appropriée
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};