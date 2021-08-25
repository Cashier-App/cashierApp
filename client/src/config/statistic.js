import { gql } from "@apollo/client";

export const FETCH_SALES = gql`
  query fetchSales {
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
