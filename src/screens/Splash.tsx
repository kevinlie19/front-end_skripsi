import React from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { useNavigation } from 'naviflex';

import asyncStorage from '../helpers/asyncStorage';

export default function Splash() {
  let { navigate } = useNavigation();
  const src = require('../../assets/images/splash.jpg');

  let timeOut = () => {
    setTimeout(async () => {
      if (await asyncStorage.getToken()) {
        navigate('Home');
      } else {
        navigate('Welcome');
      }
    }, 2000);
  };

  timeOut();

  return (
    <View style={styles.container}>
      <ImageBackground source={src} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
