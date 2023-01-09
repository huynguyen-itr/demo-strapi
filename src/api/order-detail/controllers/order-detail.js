'use strict';

/**
 * order-detail controller
 */
const jwt_decode = require('jwt-decode');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order-detail.order-detail', ({ strapi }) => ({
  async findUserOrderDetails(ctx) {
    try {
      const { userId } = ctx;
      const { orderId } = ctx.params;
      const query = {
        select: ['id', 'quantity'],
        where: {
          order: {
            id: orderId,
            user: {
              id: userId
            }
          },
        },
        sort: 'id:desc',
        populate: { 
          product: {
            populate: {
              image: true
            }
          }
        }
      }

      const entries = await strapi.db.query('api::order-detail.order-detail').findMany(query);
      const transformResponse = this.transformResponse(entries);

      return transformResponse;
    } catch (error) {
      console.log(error)
    }
  }
}));
