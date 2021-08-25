import { gql } from "@apollo/client";

export const ADD_SALE = gql`
  mutation AddSale($items: [add_item], $payment: String, $adminName: String) {
    addSales(items: $items, adminName: $payment, payment: $adminName) {
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
      date
      adminName
    }
  }
`;
