import gql from 'graphql-tag';

export const UPDATE_USER_PROGRESS = gql`
  mutation UpdateUserProgress($Paket1: Int, $Paket2: Int, $Paket3: Int) {
    updateUserProgress(Paket1: $Paket1, Paket2: $Paket2, Paket3: $Paket3) {
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
