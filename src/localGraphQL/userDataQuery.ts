import gql from 'graphql-tag';

export const SET_LOCAL_STATE = gql`
  mutation SetLocalState($user: UserInput!) {
    setLocalState(user: $user) @client {
      user {
        name
      }
    }
  }
`;

export const GET_LOCAL_STATE = gql`
  query GetLocalState {
    user @client {
      name
    }
  }
`;
