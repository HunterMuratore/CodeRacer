const user_resolvers = require('./lib/user_resolvers');
const language_resolvers = require('./lib/language_resolvers');

const resolvers = {
    Query: {
        ...user_resolvers.Query,
        ...language_resolvers.Query,
    },

    Mutation: {
        ...user_resolvers.Mutation,
        ...language_resolvers.Mutation,
    }
}

module.exports = resolvers;
