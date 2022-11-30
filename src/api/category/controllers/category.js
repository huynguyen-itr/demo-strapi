const PROTO_PATH = __dirname + '../../../../../config/grpc_chat.proto';
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { createCoreController } = require('@strapi/strapi').factories;

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
const client = new grpcChat.ChatService('localhost:50050',
  grpc.credentials.createInsecure());

module.exports = createCoreController('api::category.category', ({strapi}) => ({
  async find(ctx) {

    const client = new grpcChat.ChatService('localhost:50050', grpc.credentials.createInsecure()); 
    client.chat({ from: 'abc', message: 'hello' }, (error, data) => {
      console.log('data', data);
    });

    const { data, meta } = await super.find(ctx);

    return { data, meta };
  }
}));
