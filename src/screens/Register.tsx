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
        <View style={styles.navbar}>
          <View />
          <Text weight="medium" style={styles.title}>
            Daftar
          </Text>
          <Text
            weight="bold"
            style={styles.masuk}
            onPress={() => navigate('Login')}
          >
            Masuk
          </Text>
        </View>
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Nama"
          autoFocus={true}
          autoCapitalize="words"
        />
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
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Ulangi Kata Sandi"
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.button} onPress={() => navigate('Login')}>
          <Text weight="medium" style={styles.text}>
            Buat Akun Baru
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
    marginLeft: 50,
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
  masuk: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
  },
});
