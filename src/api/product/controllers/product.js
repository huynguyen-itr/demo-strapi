'use strict';
const stripe = require('stripe')('sk_test_4wmHw3j7xVkoN9L3awz5jk1b00AtVIIOYP');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', ({ strapi }) => ({
  async create(ctx) {
    const product = await stripe.products.create({
      name: 'Strapi product 1',
      default_price_data: {
        unit_amount: 1000,
        currency: 'usd',
      },
      expand: ['default_price'],
    });
    const response = await super.create(ctx);
    return response;
  }
}));
