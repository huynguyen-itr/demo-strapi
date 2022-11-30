export const PRODUCT_QUERY = `query{
    products{
      data{
        attributes{
          description
          title
          slug
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
  }
  `;

export const GET_PRODUCT_QUERY = `
query getProducts($slug:String!){
  products(filters: {slug :{eq: $slug}}){
    data{
      attributes{
        title
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
        total_price
        total_quantity
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
              title
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
