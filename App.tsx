import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { SafeAreaView } from 'react-native';
import { client } from './src/apollo';
import { CardListBooks } from './src/components';

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <SafeAreaView>
        <CardListBooks />
      </SafeAreaView>
    </ApolloProvider>
  );
}

export default App;
