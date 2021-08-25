import { gql } from "@apollo/client";

export const ADD_SALE = gql`
  mutation AddSale(
    $addSalesPayment: String
    $addSalesAdminName: String
    $addSalesItems: [add_item]
  ) {
    addSales(
      payment: $addSalesPayment
      adminName: $addSalesAdminName
      items: $addSalesItems
    ) {
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
