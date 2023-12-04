const gql = String.raw;

const typeDefs = gql`
    scalar Upload

    type User {
        _id: ID
        email: String
        username: String
        profilePicture: String
        createdAt: String
        updatedAt: String
    }

    type Query {
        authenticate: User
        getUserById(userId: ID!): User
    }

    type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(identifier: String!, password: String!): User
        logout: String
        uploadProfilePicture(id: ID!, profilePicture: Upload!): User
    }
`
module.exports = typeDefs;