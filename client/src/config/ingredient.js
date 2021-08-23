import { gql } from "@apollo/client";

// Fetch All Ingredients
export const FETCH_ALL_INGREDIENTS = gql`
  query FetchAllIngredients {
    stockIngredients {
      _id
      name
      unit
      total
    }
  }
`;

// Add Ingredient
export const ADD_INGREDIENT = gql`
  mutation AddIngredient(
    $addStockIngredientName: String
    $addStockIngredientUnit: String
    $addStockIngredientTotal: Float
  ) {
    addStockIngredient(
      name: $addStockIngredientName
      unit: $addStockIngredientUnit
      total: $addStockIngredientTotal
    ) {
      name
      unit
      total
      _id
    }
  }
`;

// Edit Ingredient
export const EDIT_INGREDIENT = gql`
  mutation EditIngredient(
    $editStockIngredientId: ID
    $editStockIngredientName: String
    $editStockIngredientUnit: String
    $editStockIngredientTotal: Float
  ) {
    editStockIngredient(
      _id: $editStockIngredientId
      name: $editStockIngredientName
      unit: $editStockIngredientUnit
      total: $editStockIngredientTotal
    ) {
      _id
      name
      unit
      total
    }
  }
`;

// Delete Ingredient
export const DELETE_INGREDIENT = gql`
  mutation DeleteIngredient($deleteStockIngredientId: ID) {
    deleteStockIngredient(_id: $deleteStockIngredientId)
  }
`;
