import gql from 'graphql-tag';

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
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
      badge {
        id
        name
      }
      highestScore
      point
      createdAt
    }
  }
`;