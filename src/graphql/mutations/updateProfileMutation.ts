import gql from 'graphql-tag';

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile(
    $name: String
    $email: String
    $avatarId: ID
    $highestScore: Int
    $point: Int
  ) {
    updateProfile(
      name: $name
      email: $email
      avatarId: $avatarId
      highestScore: $highestScore
      point: $point
    ) {
      id
      email
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
