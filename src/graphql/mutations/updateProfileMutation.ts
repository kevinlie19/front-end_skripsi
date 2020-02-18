import gql from 'graphql-tag';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String
    $email: String
    $password: String
    $avatarId: ID
    $highestScore: Int
    $point: Int
  ) {
    updateProfile(
      name: $name
      email: $email
      password: $password
      avatarId: $avatarId
      highestScore: $highestScore
      point: $point
    ) {
      id
      email
      password
      name
      avatar {
        id
        image
        price
      }
      avatarCollection {
        id
        image
        price
      }
      highestScore
      point
      createdAt
    }
  }
`;
