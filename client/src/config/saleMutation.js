import { gql } from "@apollo/client";

export const ADD_SALE = gql`
  mutation AddSale($payment: String, $adminName: String, $items: [add_item]) {
    addSales(payment: $payment, adminName: $adminName, items: $items) {
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
