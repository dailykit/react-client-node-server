const { gql } = require("apollo-server-express");
const {
    KeycloakContext,
    KeycloakTypeDefs,
    KeycloakSchemaDirectives
} = require("keycloak-connect-graphql");

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        hello: String @auth
    }
`;

module.exports = typeDefs;
