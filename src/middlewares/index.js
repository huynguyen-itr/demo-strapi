const jwt_decode = require('jwt-decode');

module.exports = (config, { strapi }) => {
  return (ctx, next) => {
    try {
      const { authorization } = ctx.headers;
      if (!authorization) {
        return next();
      }

      const token = authorization.split(' ')[1];
      const decoded = jwt_decode(token);
      ctx.userId  = decoded.id;

      return next();
    } catch (error) {
      return ctx.badRequest(error);
    }
  };
};