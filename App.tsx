import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { NavigationContainer } from '@react-navigation/native';
import { client } from './src/graphQL';
import { TabNavigation } from './src/routes';
import { Provider, DARK_MODE_THEME } from './src/theme';
import { Header } from './src/components';

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Provider value={DARK_MODE_THEME}>
        <NavigationContainer>
          {/* <Header /> */}
          <TabNavigation />
        </NavigationContainer>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
