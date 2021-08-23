import { gql } from "@apollo/client";

export const FETCH_CATEGORY = gql`
query Query {
  categories {
    _id
    name
  }
}
`;
