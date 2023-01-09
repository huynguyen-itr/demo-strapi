const jwt_decode = require('jwt-decode');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({strapi}) => ({
  async create(ctx) {
    console.log('create');
    // const orderDetails = await Promise.all(cartItems.map(item => axios.post('http://localhost:1337/api/order-details', {
    //   data: {
    //     orderId: order.data.id,
    //     productId: item.id,
    //     quantity: item.quantity,
    //   }
    // }, headers)));
    const { data, meta } = await super.create(ctx);

    return { data, meta };
  },

  async find(ctx) {
    try {
      const { userId } = ctx;
      ctx.query = {
        filters: {
          user: {
            id: {
              $eq: userId
            },
          }
        },
        sort: 'id:desc',
      };

      const { data, meta } = await super.find(ctx);

      return { data, meta };
    } catch (error) {
      console.log(error);
    }
  }
}));
