import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://book-deploy-server-graphql.vercel.app/graphql',
  cache: new InMemoryCache(),
});
