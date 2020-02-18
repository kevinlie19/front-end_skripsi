import gql from 'graphql-tag';

export const OTHER_PROFILE = gql`
  query OtherProfile($id: ID!) {
    otherProfile(id: $id) {
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
