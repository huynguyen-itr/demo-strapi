module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/stripe_webhooks',
     handler: 'stripe-webhooks.stripeWebhooks',
    //  config: {
    //    policies: [],
    //    middlewares: [],
    //  },
    },
  ],
};
