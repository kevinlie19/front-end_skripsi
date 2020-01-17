import gql from 'graphql-tag';

export const REGISTER_USER = gql`
  mutation Register(
    $name: String!
    $email: String!
    $password: String!
    $avatarId: ID!
  ) {
    register(
      name: $name
      email: $email
      password: $password
      avatarId: $avatarId
    ) {
      token
    }
  }
`;
