const axios = require('axios');
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::restaurant.restaurant', ({strapi}) => ({
  async find(ctx) {
    // const result = await axios.get('https://world.openpetfoodfacts.org/api/v0/product/20106836.json');
    const entries = await strapi.db.query('api::category.category').findMany({
      // select: ['name'],
      // where: { name: 'Hello World' },
      // orderBy: { publishedAt: 'DESC' },
      populate: ['category'],
    });
    const { data, meta } = await super.find(ctx);

    return { data, meta };
    
  }
}));
