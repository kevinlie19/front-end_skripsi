import { ApolloCache } from 'apollo-cache';
import { SetLocalStateVariables } from '../../generated/local/SetLocalState';

function loginResolver(
  _: object,
  args: SetLocalStateVariables,
  { cache }: { cache: ApolloCache<object> },
) {
  let { user } = args;

  cache.writeData({
    data: {
      user: {
        __typename: 'User',
        ...user,
      },
    },
  });
  return null;
}

export { loginResolver };
