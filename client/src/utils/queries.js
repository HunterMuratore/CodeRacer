import { gql } from '@apollo/client'

export const AUTHENTICATE = gql`
  query {
    authenticate {
      _id
      email
      username
      profilePicture
      highscores {
        score
        languageName
      }
    }
  }
`;

export const GET_LANGUAGES = gql`
  query GetLanguages {
    getLanguages {
      _id
      name
    }
  }
`;

export const GET_CODE_BLOCKS = gql`
  query GetCodeBlocks($languageId: ID!) {
    getCodeBlocks(languageId: $languageId) {
      value
    }
  }
`;