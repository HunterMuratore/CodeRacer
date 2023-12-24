const gql = String.raw;

const typeDefs = gql`
    scalar Upload

    type CodeBlock {
        value: String
    }

    type HighScore {
        score: Float
        languageId: ID
    }

    type Language {
        _id: ID
        name: String
        codeBlocks: [CodeBlock]
    }

    type User {
        _id: ID
        email: String
        username: String
        profilePicture: String
        highscores: [HighScore]
        createdAt: String
        updatedAt: String
    }

    type Query {
        authenticate: User
        getUserById(userId: ID!): User
        getLanguages: [Language]
        getCodeBlocks(languageId: ID!): [CodeBlock]
    }

    type Mutation {
        register(email: String!, username: String!, password: String!): User
        login(identifier: String!, password: String!): User
        logout: String
        uploadProfilePicture(id: ID!, profilePicture: Upload!): User
        createLanguage(name: String!): Language
        createCodeBlock(languageId: ID!, value: String!): CodeBlock
        updateHighScore(score: Float!, languageName: String!): String
    }
`
module.exports = typeDefs;