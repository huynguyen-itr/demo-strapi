'use strict';
const stripe = require('stripe')('sk_test_4wmHw3j7xVkoN9L3awz5jk1b00AtVIIOYP');
/**
 * A set of functions called "actions" for `stripe-webhooks`
 */

module.exports = {
  stripeWebhooks: async (ctx, next) => {
    try {
      const { body } = ctx.request;
      if (!body) {
        return;
      }
      
      if (body.type !== 'payment_intent.succeeded') {
        return;
      }

      const { orderId } = body.data.object.metadata;
      if (!orderId || !userId) {
        return;
      }

      const transactionModel = strapi.db.query('api::transaction.transaction');
      const orderModel = strapi.db.query('api::order.order');

      delete body.data.object.id;
      await transactionModel.create({
        data: {
          user: userId,
          order: orderId,
          stripe_id: body.id,
          status: body.type,
          publishedAt: new Date().toISOString(),
          ...body.data.object
        }
      });

      await orderModel.update({
        where: { id: orderId },
        data: {
          paymentStatus: body.data.object.status,
        },
      });

      ctx.body = 'ok';
    } catch (err) {
      ctx.body = err;
    }
  },
};
