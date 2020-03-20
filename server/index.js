const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const Keycloak = require("keycloak-connect");
const {
    KeycloakContext,
    KeycloakTypeDefs,
    KeycloakSchemaDirectives
} = require("keycloak-connect-graphql");
require("dotenv").config();

const app = express();

const keycloak = new Keycloak("./keycloak.json");

app.use(keycloak.middleware());

const server = new ApolloServer({
    typeDefs: [KeycloakTypeDefs, typeDefs],
    schemaDirectives: KeycloakSchemaDirectives,
    resolvers,
    context: ({ req }) => {
        return {
            kauth: new KeycloakContext({ req })
        };
    }
});
server.applyMiddleware({ app });

// Static files
app.use(express.static(path.join(__dirname, "/../client/build")));

app.get("/test", (req, res) => res.send("Yes!"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

app.listen({ port: 4000 }, () =>
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
);
