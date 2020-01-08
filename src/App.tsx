import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { BuiltInFonts, Provider } from 'exoflex';
import * as Font from 'expo-font';
import { ApolloProvider } from '@apollo/react-hooks';

import { client } from './config/ApolloClient';
import Router from './routes/Router';
import { CustomFonts } from './constants/fonts';
import { CustomTheme } from './constants/theme';

export default function App() {
  let [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({ ...BuiltInFonts, ...CustomFonts }).then(() =>
      setFontsLoaded(true),
    );
  }, []);

  return fontsLoaded ? (
    <ApolloProvider client={client}>
      <Provider theme={CustomTheme}>
        <View style={styles.container}>
          <Router />
        </View>
      </Provider>
    </ApolloProvider>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
