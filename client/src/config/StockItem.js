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

export const UPDATE_STOCK_ITEM_MUTATION = gql`
mutation EditStockItem($_id: ID, $file: Upload!, $name: String, $price: Float, $category: String, $recipes: [add_recipe], $stock: Float) {
  editStockItem(_id: $_id, file: $file, name: $name, price: $price, category: $category, recipes: $recipes, stock: $stock) {
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
  }
}
`

export const FETCH_ALL_STOCK_ITEM = gql`
  query FetchStockItems {
    stockItems {
      _id
      name
      price
      category {
        _id
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

export const DELETE_STOCK_ITEM = gql`
  mutation DeleteStockItem($_id: ID) {
    deleteStockItem(_id: $_id)
  }
`;
