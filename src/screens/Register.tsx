import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
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
import { REGISTER_USER } from '../graphql/mutations/registerMutation';
import { Register, RegisterVariables } from '../generated/Register';
import { validateEmail, validatePassword } from '../helpers/validation';

export default function RegisterScene() {
  let { navigate } = useNavigation();
  let [nameValue, setNameValue] = useState('');
  let [emailValue, setEmailValue] = useState('');
  let [passwordValue, setPasswordValue] = useState('');
  let [rePasswordValue, setRePasswordValue] = useState('');

  const [register, { loading: loadingRegister }] = useMutation<
    Register,
    RegisterVariables
  >(REGISTER_USER, {
    onCompleted() {
      navigate('Login');
      setNameValue('');
      setEmailValue('');
      setPasswordValue('');
      setRePasswordValue('');
    },
    onError(error) {
      if (error.message === 'GraphQL error: Email already exists') {
        Alert.alert('Alamat Email Sudah Digunakan', 'Mohon Mencoba Kembali', [
          { text: 'OK' },
        ]);
      } else {
        Alert.alert(
          'Terjadi Kesalahan Yang Tidak Diketahui',
          'Mohon Mencoba Kembali',
          [{ text: 'OK' }],
          {
            cancelable: false,
          },
        );
      }
    },
  });

  let onPressRegister = async () => {
    if (validateEmail(emailValue) && validatePassword(passwordValue)) {
      await register({
        variables: {
          name: nameValue,
          email: emailValue,
          password: passwordValue,
          avatarId: 'ck6rb0dqthqz60b09gbl4txll',
        },
      });
    } else if (!validateEmail(emailValue)) {
      Alert.alert(
        'Alamat Email Tidak Valid',
        'Mohon Mengisi Alamat Email Kembali',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else if (
      !validatePassword(passwordValue) ||
      passwordValue !== rePasswordValue
    ) {
      Alert.alert(
        'Kata Sandi Tidak Valid',
        'Mohon Mengisi Kata Sandi Kembali',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else {
      Alert.alert(
        'Terjadi Kesalahan Yang Tidak Diketahui',
        'Mohon Mencoba Kembali',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    }
  };

  return (
    <KeyboardAvoidingView behavior="padding" enabled style={styles.flex}>
      <View style={styles.flex}>
        <Portal>
          <Modal
            contentContainerStyle={styles.modal}
            animationType="fade"
            visible={loadingRegister}
          >
            <ActivityIndicator size="large" color={COLORS.primaryColor} />
          </Modal>
        </Portal>
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
          </ScrollView>
        </View>
        <View style={styles.bottomContainer}>
          <Button style={styles.buttonStyle} onPress={onPressRegister}>
            <Text weight="medium" style={styles.buttonText}>
              Buat Akun Baru
            </Text>
          </Button>
        </View>
      </View>
    </KeyboardAvoidingView>
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
