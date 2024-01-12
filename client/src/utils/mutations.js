import { gql } from '@apollo/client'

export const REGISTER = gql`
  mutation Register($email: String!, $username: String!, $password: String!) {
    register(email: $email, username: $username, password: $password) {
      _id
      email
      username
    }
  }
`

export const LOGIN = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      _id
      email
      username
      highscores {
        score
        languageName
      }
    }
  }
`

export const CREATE_LANGUAGE = gql`
  mutation CreateLanguage($name: String!) {
    createLanguage(name: $name) {
      _id
      name
    }
  }
`;

export const CREATE_CODE_BLOCK = gql`
  mutation CreateCodeBlock($languageId: ID!, $value: String!) {
    createCodeBlock(languageId: $languageId, value: $value) {
      value
    }
  }
`;

export const UPDATE_HIGH_SCORE = gql`
  mutation UpdateHighScore($score: Float!, $languageName: String!) {
    updateHighScore(score: $score, languageName: $languageName)
  }
`;
