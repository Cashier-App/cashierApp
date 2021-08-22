const { ApolloServer } = require("apollo-server");
const { resolvers, typeDefs } = require("./graphQL/schema");
const port = process.env.PORT || 4000;
const server = new ApolloServer({ typeDefs, resolvers });
server.listen(port, () => console.log("Server running at port", port));
