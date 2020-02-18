import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Image,
  Animated,
} from 'react-native';
import { Text, Button } from 'exoflex';
import { useNavigation } from 'naviflex';

import { COLORS } from '../constants/colors';
import { useDimensions } from '../helpers/useDimensions';

export default function Welcome() {
  let { navigate } = useNavigation();
  let widthScreen = useDimensions();

  let src = require('../../assets/images/welcome.png');

  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      delay: 500,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  let buttonDefaultStyle = {
    minWidth: 120,
    width: widthScreen.width - 48,
    borderRadius: 8,
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  } as StyleProp<ViewStyle>;

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <SafeAreaView style={styles.container}>
        <View style={styles.body}>
          <Image source={src} style={styles.imageWelcome} />
        </View>

        <View style={styles.bottomContainer}>
          <Button
            contentStyle={buttonDefaultStyle}
            onPress={() => navigate('Login')}
          >
            <Text weight="bold" style={styles.buttonText}>
              Masuk
            </Text>
          </Button>
          <View style={styles.buttonSeparator} />
          <Button
            contentStyle={buttonDefaultStyle}
            onPress={() => navigate('Register')}
          >
            <Text weight="bold" style={styles.buttonText}>
              Daftar
            </Text>
          </Button>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageWelcome: {
    width: 420,
    height: 420,
  },
  bottomContainer: {
    marginBottom: 16,
  },
  buttonSeparator: {
    height: 16,
  },
  buttonText: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
