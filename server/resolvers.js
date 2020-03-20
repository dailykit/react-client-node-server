const { auth, hasRole } = require("keycloak-connect-graphql");

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: hasRole("dailyos:Admin")(() => "Hello world!")
    }
};

module.exports = resolvers;
