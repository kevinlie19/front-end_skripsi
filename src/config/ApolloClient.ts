import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import asyncStorage from '../helpers/asyncStorage';

const cache = new InMemoryCache();
const authLink = setContext(async (_, { headers }) => {
  let token = await asyncStorage.getToken();
  return {
    headers: {
      ...headers,
      token: token || '',
    },
  };
});
const uploadLink = createUploadLink({
  uri: 'our staging link',
  credentials: 'same-origin',
});
const link = ApolloLink.from([authLink, uploadLink]);
export const client = new ApolloClient({
  cache,
  link,
});
