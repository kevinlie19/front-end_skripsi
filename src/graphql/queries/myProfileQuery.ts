import gql from 'graphql-tag';

export const MY_PROFILE = gql`
  query MyProfile {
    myProfile {
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
      progress {
        id
        Paket1
        Paket2
        Paket3
      }
      createdAt
    }
  }
`;
