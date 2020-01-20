import { AsyncStorage } from 'react-native';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { persistCache } from 'apollo-cache-persist';
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types';

import asyncStorage from '../helpers/asyncStorage';
import { loginResolver } from '../localGraphQL/resolver/authResolver';
import { userData } from './userData';

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
  uri: 'https://back-end-skripsi.herokuapp.com/',
  credentials: 'same-origin',
});
const link = ApolloLink.from([authLink, uploadLink]);

async function setupPersistCache() {
  await persistCache({
    cache,
    storage: AsyncStorage as PersistentStorage<
      PersistedData<NormalizedCacheObject>
    >,
  });
}

function setupApolloClient() {
  setupPersistCache();

  cache.writeData(userData);

  return new ApolloClient({
    link,
    cache,
    resolvers: {
      Mutation: {
        setLocalState: loginResolver,
      },
    },
  });
}
export const client = setupApolloClient();
