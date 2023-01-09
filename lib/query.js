export const PRODUCT_QUERY = `
query{
    products{
      data{
        id
        attributes{
          description
          name
          slug
          price
          image{
            data{
              attributes{
              formats
              }
            }
          }
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
  `;

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {slug :{eq: $slug}}){
    data{
      id
      attributes{
        name
        slug
        description
        price
        image{
          data{
            attributes{
              formats
            }
          }
        }
      }
    }
  }
}`;

export const ORDERS_QUERY = `
query orders {
  orders {
    data {
      id
      attributes {
        user {
          data {
            id
            attributes {
              username
              email
            }
          }
        }
        totalPrice
        totalQuantity
        createdAt
      }
    }
  }
}`;

export const ORDER_DETAILS_QUERY = `
query orderDetails ($filter: OrderDetailFiltersInput) {
  orderDetails (filters: $filter) {
    data {
      id
      attributes {
        product {
          data {
            id
            attributes {
              name
              price
              image {
                data {
                  attributes {
                    formats
                  }
                }
              }
            }
          }
        }
        quantity
        discount
      }
    }
  }
}`;
