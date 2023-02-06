let grpcServer;

const healthStatus = {
  postgresdb: true,
};

async function updateHealthcheck(status, server) {
  if (!grpcServer && server) {
    grpcServer = server;
  }

  Object.assign(healthStatus, status);
  return grpcServer?.updateHealthcheck(status);
}

module.exports = {
  healthStatus,
  updateHealthcheck,
};
