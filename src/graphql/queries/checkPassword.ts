import gql from 'graphql-tag';

export const CHECK_PASSWORD = gql`
  query CheckPassword($password: String!) {
    checkPassword(password: $password)
  }
`;
