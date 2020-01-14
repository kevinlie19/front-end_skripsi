import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function Register() {
  let { navigate } = useNavigation();

  return (
    <View style={styles.flex}>
      <View style={styles.body}>
        <Text weight="medium" style={styles.title}>
          Daftar
        </Text>
        <TextInput
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Nama"
          autoFocus={true}
          autoCapitalize="words"
        />
        <TextInput
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Alamat Email"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoFocus={true}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Kata Sandi"
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Ketik Ulang Kata Sandi"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.button} onPress={() => navigate('Login')}>
          <Text weight="medium" style={styles.text}>
            Daftar
          </Text>
        </Button>
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Sudah memiliki akun?</Text>
          <Text
            weight="bold"
            style={styles.daftar}
            onPress={() => navigate('Login')}
          >
            {'  Masuk'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    marginBottom: 36,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
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
  bottomTextContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  bottomText: {
    color: COLORS.darkWhite,
  },
  daftar: {
    color: COLORS.primaryColor,
  },
});
