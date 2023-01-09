'use strict';

/**
 * product-price service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-price.product-price');
