import { gql } from "@apollo/client";
export const REGISTER_MUTATION = gql`
  mutation Mutation($email: String, $password: String, $name: String) {
    registerUser(email: $email, password: $password, name: $name)
  }
`;
