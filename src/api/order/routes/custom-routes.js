module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/api/orders',
      handler: 'order.find'
    }
  ]
}