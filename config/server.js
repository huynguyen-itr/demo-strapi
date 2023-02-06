const { Server } = require('ugrpc');
const config = require('./grpc');
const controllers = require('../grpc/controllers');

module.exports = ({ env }) => {
  const host = env('HOST', '0.0.0.0');
  const port = env.int('PORT', 1337);
  const keys = env.array('APP_KEYS');
  // const url = env('', 'http://localhost:1337');

  const params = {
    ...config.grpc.server,
    controllers,
  };

  const server = new Server(params);
  const start = server.startServer();
  start.then(data => {
    logger.info('Start', data);
  }).catch(error => console.log(error));

  process.on('SIGINT', () => {
    logger.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown');
    shutdown(server);
  });
  
  process.on('SIGTERM', () => {
    logger.info('Got SIGTERM (docker container stop). Graceful shutdown');
    shutdown(server);
  });

  return {
    host,
    port,
    app: {
      keys,
    },
  };
};

function shutdown(server) {
  setTimeout(async () => {
    await server.stopServer();
    process.exit();
  }, 10000);
}
