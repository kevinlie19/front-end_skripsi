import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function Login() {
  let { navigate } = useNavigation();

  return (
    <View style={styles.flex}>
      <View style={styles.body}>
        <View style={styles.navbar}>
          <View />
          <Text weight="medium" style={styles.title}>
            Masuk
          </Text>
          <Text weight="bold" style={styles.daftar}>
            Daftar
          </Text>
        </View>
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Alamat Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoFocus={true}
          keyboardType="email-address"
        />
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Kata Sandi"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.button} onPress={() => navigate('Home')}>
          <Text weight="medium" style={styles.text}>
            Masuk
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 45,
    marginBottom: 36,
    fontSize: FONT_SIZE.large,
  },
  body: {
    flex: 5,
    marginTop: 50,
    paddingHorizontal: 16,
  },
  textInput: {
    marginBottom: 24,
  },
  bottomContainer: {
    marginBottom: 30,
  },
  button: {
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primaryColor,
  },
  text: {
    color: COLORS.white,
    fontSize: FONT_SIZE.medium,
  },
  daftar: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
  },
});
