import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StyleProp,
  ViewStyle,
  Image,
} from 'react-native';
import { Text, Button } from 'exoflex';
import { useNavigation } from 'naviflex';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { useDimensions } from '../helpers/useDimensions';

export default function Welcome() {
  let { navigate } = useNavigation();
  let widthScreen = useDimensions();
  let src = require('../../assets/images/welcomeAsset.png');

  let buttonDefaultStyle = {
    minWidth: 120,
    width: widthScreen.width - 48,
    borderRadius: 8,
    backgroundColor: COLORS.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  } as StyleProp<ViewStyle>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.body}>
        <Text weight="bold" style={styles.title}>
          NAME
        </Text>

        <Image source={src} style={styles.imageWelcome} />
      </View>

      <View style={styles.bottomContainer}>
        <Button
          contentStyle={buttonDefaultStyle}
          onPress={() => navigate('Login')}
        >
          <Text weight="bold" style={styles.buttonText}>
            Login
          </Text>
        </Button>
        <View style={styles.buttonSeparator} />
        <Button
          contentStyle={buttonDefaultStyle}
          onPress={() => navigate('Register')}
        >
          <Text weight="bold" style={styles.buttonText}>
            Register
          </Text>
        </Button>
      </View>
    </SafeAreaView>
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
  title: {
    marginBottom: 120,
    fontSize: FONT_SIZE.xLarge,
  },
  imageWelcome: {
    aspectRatio: 1,
    width: 200,
    height: undefined,
  },
  bottomContainer: {
    marginBottom: 36,
  },
  buttonSeparator: {
    height: 16,
  },
  buttonText: {
    color: COLORS.white,
    textTransform: 'uppercase',
  },
});
