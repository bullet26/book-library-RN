import { AppState } from 'react-native';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { createMMKV } from 'react-native-mmkv';

const storage = createMMKV();
const CACHE_KEY = 'APOLLO_CACHE_KEY';

const cache = new InMemoryCache();

const savedCache = storage.getString(CACHE_KEY);
if (savedCache) {
  try {
    cache.restore(JSON.parse(savedCache));
  } catch (e) {
    console.log('Failed to restore cache', e);
  }
}

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://book-server-rose.vercel.app/graphql' }),
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
});

const saveCache = () => {
  try {
    storage.set(CACHE_KEY, JSON.stringify(cache.extract()));
  } catch (e) {
    console.log('Failed to save cache', e);
  }
};

AppState.addEventListener('change', status => {
  if (status === 'background' || status === 'inactive') {
    saveCache();
  }
});
