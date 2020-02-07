import gql from 'graphql-tag';

export const ADD_TO_AVATAR_COLLECTION = gql`
  mutation AddToAvatarCollection($avatarId: ID!) {
    addToAvatarCollection(avatarId: $avatarId) {
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
