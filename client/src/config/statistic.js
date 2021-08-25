import { gql } from "@apollo/client";

export const FETCH_SALES = gql`
query Query {
    sales {
      _id
      items {
        _id
        item {
          _id
          name
          price
          category {
            _id
            name
          }
          imageUrl
          recipes {
            _id
            ingredient {
              _id
              name
              unit
              total
            }
            qty
          }
          stock
        }
        qty
      }
      payment
      total
      adminName
      date
    }
  }
`;