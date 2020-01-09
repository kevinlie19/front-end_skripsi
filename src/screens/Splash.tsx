import React from 'react';
import { StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useNavigation } from 'naviflex';

export default function Splash() {
  let { navigate } = useNavigation();
  const src = require('../../assets/images/splash.jpg');

  let timeOut = () => {
    setTimeout(() => {
      navigate('Welcome');
    }, 2000);
  };

  timeOut();

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={src} style={styles.image} />
    </SafeAreaView>
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
