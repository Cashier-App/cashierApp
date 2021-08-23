import { gql } from "@apollo/client";

export const FETCH_CATEGORY = gql`
query Query {
  categories {
    _id
    name
  }
}
`;

export const FETCH_CATEGORY_ID = gql`
query Query($id: String) {
  category(id: $id) {
    _id
    name
  }
}
`;

export const ADD_CATEGORY_MUTATION = gql`
mutation AddCategoryMutation($name: String) {
  addCategory(name: $name) {
    _id
    name
  }
}
`;

export const UPDATE_CATEGORY_MUTATION = gql`
mutation EditCategoryMutation($_id: ID, $name: String) {
  editCategory(_id: $_id, name: $name) {
    _id
    name
  }
}
`;

export const DELETE_CATEGORY_MUTATION = gql`
mutation Mutation($_id: ID) {
  deleteCategory(_id: $_id)
}
`;
