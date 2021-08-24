import { gql } from "@apollo/client";

export const FETCH_CATEGORY_ID = gql`
  query Query($id: String) {
    category(id: $id) {
      _id
      name
    }
  }
`;

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
  mutation AddStockItemMutation(
    $_id: ID
    $file: Upload
    $name: String
    $price: Float
    $category: String
    $recipes: [add_recipe]
    $stock: Float
  ) {
    editStockItem(
      _id: $_id
      file: $file
      name: $name
      price: $price
      category: $category
      recipes: $recipes
      stock: $stock
    ) {
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
  }
`;

export const FETCH_ALL_STOCK_ITEM = gql`
  query FetchStockItems {
    updatedStockItems {
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

// by abdan
export const FETCH_ONE_STOCK_ITEM = gql`
  query FetchOneStockItem($stockItemId: String) {
    stockItem(id: $stockItemId) {
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
          total
          _id
          name
          unit
        }
        qty
      }
      stock
    }
  }
`;

//by abdan
export const EDIT_STOCK_ITEM = gql`
  mutation EditStockItem($editStockItemId: ID, $editStockItemStock: Float) {
    editStockItem(_id: $editStockItemId, stock: $editStockItemStock) {
      _id
      name
      stock
    }
  }
`;
