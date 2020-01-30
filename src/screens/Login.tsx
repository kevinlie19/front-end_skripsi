import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
  Portal,
} from 'exoflex';
import { useNavigation } from 'naviflex';
import { useMutation } from '@apollo/react-hooks';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { LOGIN_USER } from '../graphql/mutations/loginMutation';
import { Login, LoginVariables } from '../generated/Login';
import { validateEmail, validatePassword } from '../helpers/validation';
import asyncStorage from '../helpers/asyncStorage';

export default function LoginScene() {
  let { navigate } = useNavigation();
  let [emailValue, setEmailValue] = useState('');
  let [passwordValue, setPasswordValue] = useState('');

  const [login, { loading: loadingLogin }] = useMutation<Login, LoginVariables>(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        if (login.token && login.user) {
          asyncStorage.saveToken(login.token);
          navigate('Home');
          setEmailValue('');
          setPasswordValue('');
        } else {
          Alert.alert(
            'Unexpected Error',
            'Please try again',
            [{ text: 'OK' }],
            {
              cancelable: false,
            },
          );
        }
      },
      onError(error) {
        let newError = error.message.split(':');
        Alert.alert(newError[1]);
      },
    },
  );

  let onPressLogin = async () => {
    if (validateEmail(emailValue) && validatePassword(passwordValue)) {
      await login({
        variables: {
          email: emailValue,
          password: passwordValue,
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
      <Portal>
        <Modal
          contentContainerStyle={styles.modal}
          animationType="fade"
          visible={loadingLogin}
        >
          <ActivityIndicator size="large" color={COLORS.primaryColor} />
        </Modal>
      </Portal>
      <View style={styles.body}>
        <View style={styles.navbar}>
          <View />
          <Text weight="medium" style={styles.title}>
            Masuk
          </Text>
          <Text
            weight="bold"
            style={styles.daftarText}
            onPress={() => navigate('Register')}
          >
            Daftar
          </Text>
        </View>
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
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.buttonStyle} onPress={onPressLogin}>
          <Text weight="medium" style={styles.buttonText}>
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
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginLeft: 48,
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
  daftarText: {
    color: COLORS.primaryColor,
    fontSize: FONT_SIZE.medium,
  },
});
