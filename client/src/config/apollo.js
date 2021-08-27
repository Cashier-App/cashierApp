import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";

const client = new ApolloClient({
  // uri: "http://localhost:4000/graphql",
  link: createUploadLink({ uri: "http://localhost:4000/graphql" }),
  cache: new InMemoryCache(),
});
export default client;
