import { gql } from "@apollo/client";
export const ADD_STOCK_ITEM_MUTATION = gql`
  mutation AddStockItem(
    $file: Upload!
    $name: String
    $price: Float
    $category: String
    $recipes: [add_recipe]
    $stock: Float
  ) {
    addStockItem(
      file: $file
      name: $name
      price: $price
      category: $category
      recipes: $recipes
      stock: $stock
    ) {
      name
      price
      category {
        name
      }
      imageUrl
      recipes {
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
  }
`;
