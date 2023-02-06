'use strict';
// const stripe = require('stripe')('sk_test_4wmHw3j7xVkoN9L3awz5jk1b00AtVIIOYP');

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::product.product', () => ({}));
