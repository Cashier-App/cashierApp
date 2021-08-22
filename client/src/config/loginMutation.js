import { gql } from "@apollo/client";
export const LOGIN_MUTATION = gql`
  mutation loginUser($email: String, $password: String) {
    loginUser(email: $email, password: $password) {
      access_token
    }
  }
`;
