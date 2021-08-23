import { gql } from "@apollo/client";

export const FETCH_CATEGORY = gql`
query Query {
  categories {
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
`
