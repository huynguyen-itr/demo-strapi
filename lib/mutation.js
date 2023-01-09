export const CREATE_ORDER = `
mutation createOrder ($data: OrderInput!) {
  createOrder (data: $data) {
    data {
      id
      attributes {
        totalPrice
        totalQuantity
        publishedAt
      }
    }
  }
}`;