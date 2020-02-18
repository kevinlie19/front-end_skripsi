import gql from 'graphql-tag';

export const AVATARS = gql`
  query Avatars {
    avatars {
      id
      image
      price
    }
  }
`;
