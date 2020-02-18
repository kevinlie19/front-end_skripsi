import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Animated } from 'react-native';
import { useNavigation } from 'naviflex';

import asyncStorage from '../helpers/asyncStorage';
import { COLORS } from '../constants/colors';

export default function Splash() {
  let { navigate } = useNavigation();
  const src = require('../../assets/images/splash.png');

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: 200,
      useNativeDriver: true,
    }).start();

    timeOut();
  }, [fadeAnim]);

  let timeOut = () => {
    setTimeout(async () => {
      if (await asyncStorage.getToken()) {
        navigate('Home');
      } else {
        navigate('Welcome');
      }
    }, 2000);
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.container}>
        <ImageBackground source={src} style={styles.image} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  image: {
    width: 320,
    height: 320,
  },
});
