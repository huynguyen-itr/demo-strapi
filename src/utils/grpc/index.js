const { Client, Server } = require('ugrpc');
const config = require('../../config');

async function processAny(params) {
  const client = Client.createGrpcClient(config.grpc.clients.bioheartApi);
  const options = Client.createCallOptions(30000);
  return new Promise((resolve, reject) => {
    client.processAny(params, options, (err, response) => {
      if (err) {
        logger.error('processAny ERROR ', { err });
        reject(err);
      } else {
        logger.debug('processAny SUCCESS ', { response });
        resolve(response);
      }
    });
  });
}
module.exports = {
  processAny,
};