import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://book-server-rose.vercel.app/graphql' }),
  cache: new InMemoryCache(),
});
