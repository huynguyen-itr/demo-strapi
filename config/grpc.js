const path = require('path');

const protosDir = path.join(__dirname, '../grpc/protos');

module.exports = {
  grpc: {
    server: {
      name: 'biocare-cardiac-bridge',
      port: parseInt(process.env.GRPC_PORT || '6900', 10),
      get host() {
        return `0.0.0.0:${this.port}`;
      },
      proto: {
        packageName: 'cardiac',
        serviceName: 'BiocareCardiacBridge',
        protoPath: path.join(protosDir, 'biocare_cardiac_bridge.proto'),
      },
    },
    clients: {
      socketioServer: {
        host: process.env.SOCKET_IO_SERVER_SERVICE || '0.0.0.0:6700',
        proto: {
          packageName: 'cardiac',
          serviceName: 'SocketioServer',
          protoPath: path.join(protosDir, 'socketio_server.proto'),
        },
      },
    },
  },
};
