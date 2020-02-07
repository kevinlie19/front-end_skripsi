import gql from 'graphql-tag';

export const LEADERBOARD = gql`
  query Leaderboard {
    leaderboard {
      id
      name
      avatar {
        id
        image
        price
      }
      highestScore
    }
  }
`;
