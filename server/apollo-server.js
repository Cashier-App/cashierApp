const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require("./graphql/typeDef");
const { resolvers } = require("./graphql/resolvers");
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");
const express = require("express");
const port = process.env.PORT || 4000;
const server = new ApolloServer({ typeDefs, resolvers });
// server.listen(port, () => console.log("Server running at port", port));

server.start().then(async () => {
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({ app });
  await new Promise((r) =>
    app.listen({ port }, console.log("Server running at port", port))
  );
});
