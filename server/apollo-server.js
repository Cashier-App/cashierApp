const { ApolloServer } = require("apollo-server-express");
const { resolvers, typeDefs } = require("./graphQL/schema");
const {
  GraphQLUpload,
  graphqlUploadExpress, // A Koa implementation is also exported.
} = require("graphql-upload");
const app = require("./app");
const port = process.env.PORT || 4000;

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      // Note: This example uses the `req` argument to access headers,
      // but the arguments received by `context` vary by integration.
      // This means they vary for Express, Koa, Lambda, etc.
      //
      // To find out the correct arguments for a specific integration,
      // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

      // Get the user token from the headers.
      const token = req.headers.access_token || "";

      // Try to retrieve a user with the token
      const user = getUser(token);

      // Add the user to the context
      return { user };
    },
  });
  await server.start();

  // This middleware should be added before calling `applyMiddleware`.
  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => app.listen({ port: port }, r));

  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
startServer();
