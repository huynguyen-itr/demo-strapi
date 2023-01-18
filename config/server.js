const PROTO_PATH = `${__dirname}/grpc_chat.proto`;
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  { keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true },
);
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const { grpcChat } = protoDescriptor.io.mark.grpc;
const clients = new Map();

function chat(call, callback) {
  callback(null, {
    isSuccess: true,
    message: 'Call success!',
  })
}

const server = new grpc.Server();
server.addService(grpcChat.ChatService.service, {
  chat,
});
// server.bindAsync('127.0.0.1:50055', grpc.ServerCredentials.createInsecure(), (err, result) => {
//   if (err) {
//     return console.log(err);
//   }
  // server.start();
  // console.log('gRPC Chat Server started...');
// });

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('', 'http://localhost:1337'),
  app: {
    keys: env.array('APP_KEYS'),
  },
});
