module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/order/order-details/:orderId',
      handler: 'order-detail.findUserOrderDetails'
    }
  ]
}