import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Text, TextInput, Button, Modal, ActivityIndicator } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useMutation } from '@apollo/react-hooks';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { REGISTER_USER } from '../graphql/mutations/registerMutation';
import { Register_register, RegisterVariables } from '../generated/Register';
import { validateEmail, validatePassword } from '../helpers/validation';

export default function Register() {
  let { navigate } = useNavigation();
  let [nameValue, setNameValue] = useState('');
  let [emailValue, setEmailValue] = useState('');
  let [passwordValue, setPasswordValue] = useState('');
  let [rePasswordValue, setRePasswordValue] = useState('');

  const [register, { loading: loadingRegister }] = useMutation<
    Register_register,
    RegisterVariables
  >(REGISTER_USER, {
    onCompleted() {
      navigate('Login');
    },
    onError(error) {
      let newError = error.message.split(':');
      Alert.alert(newError[1]);
    },
  });

  let onPressRegister = async () => {
    if (validateEmail(emailValue) && validatePassword(passwordValue)) {
      await register({
        variables: {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          avatarId: 'ck5hvr6pixpkm0b00p8py21tp',
        },
      });
    } else if (!validateEmail(emailValue)) {
      Alert.alert(
        'Email is not valid',
        'Please fill the email again',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else if (!validatePassword(passwordValue)) {
      Alert.alert(
        'Password is not valid',
        'Please fill the password again',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else {
      Alert.alert('Unexpected Error', 'Please try again', [{ text: 'OK' }], {
        cancelable: false,
      });
    }
  };

  return (
    <View style={styles.flex}>
      <Modal
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        animationType="fade"
        visible={loadingRegister}
      >
        <ActivityIndicator size="large" color={COLORS.primaryColor} />
      </Modal>
      <View style={styles.body}>
        <View style={styles.navbar}>
          <View />
          <Text weight="medium" style={styles.title}>
            Daftar
          </Text>
          <Text
            weight="bold"
            style={styles.masukText}
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
          value={nameValue}
          onChangeText={setNameValue}
          autoFocus={true}
          autoCapitalize="words"
        />
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Alamat Email"
          value={emailValue}
          onChangeText={setEmailValue}
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
          value={passwordValue}
          onChangeText={setPasswordValue}
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Ulangi Kata Sandi"
          value={rePasswordValue}
          onChangeText={setRePasswordValue}
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.buttonStyle} onPress={onPressRegister}>
          <Text weight="medium" style={styles.buttonText}>
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
  buttonStyle: {
    marginHorizontal: 24,
    borderRadius: 8,
    backgroundColor: COLORS.primaryColor,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.medium,
  },
  masukText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
  },
});
