import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, IconButton, TextInput, Button } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { sha256 } from 'js-sha256';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import {
  UpdateProfile,
  UpdateProfileVariables,
} from '../generated/UpdateProfile';
import { UPDATE_PROFILE } from '../graphql/mutations/updateProfileMutation';
import { Loading } from '../core-ui';
import { validatePassword } from '../helpers/validation';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';

export default function ChangePassword() {
  let { navigate, goBack } = useNavigation();
  let [userPassword, setUserPassword] = useState('');
  let [oldPasswordValue, setOldPasswordValue] = useState('');
  let [passwordValue, setPasswordValue] = useState('');
  let [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  let { loading, data } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
    onCompleted: () => {
      setUserPassword(data?.myProfile.password ?? '');
    },
  });

  const [updateProfile, { loading: loadingUpdate }] = useMutation<
    UpdateProfile,
    UpdateProfileVariables
  >(UPDATE_PROFILE, {
    onCompleted() {
      navigate('MyProfile');
      setPasswordValue('');
      setRepeatPasswordValue('');
    },
    onError(error) {
      let newError = error.message.split(':');
      Alert.alert(newError[1]);
    },
  });

  let onPressSimpan = async () => {
    if (
      validatePassword(passwordValue) &&
      passwordValue === repeatPasswordValue &&
      sha256(oldPasswordValue + `"EZAF"`) === userPassword
    ) {
      await updateProfile({
        variables: {
          password: passwordValue,
        },
      });
    } else if (
      !validatePassword(passwordValue) ||
      passwordValue !== repeatPasswordValue
    ) {
      Alert.alert(
        'Kata Sandi Tidak Valid',
        'Mohon Mengisi Kata Sandi Kembali',
        [{ text: 'OK' }],
        { cancelable: false },
      );
    } else if (sha256(oldPasswordValue + `"EZAF"`) !== userPassword) {
      Alert.alert(
        'Kata Sandi Lama Tidak Valid',
        'Mohon Mengisi Kata Sandi Lama Kembali',
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

  if (loadingUpdate || loading) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            onPress={() => goBack()}
          />
        </View>
        <Text weight="medium" style={styles.title}>
          Ubah Kata Sandi
        </Text>
        <View style={styles.flex} />
      </View>
      <View style={styles.body}>
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Kata Sandi Lama"
          value={oldPasswordValue}
          onChangeText={setOldPasswordValue}
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Kata Sandi Baru"
          value={passwordValue}
          onChangeText={setPasswordValue}
          textContentType="password"
          secureTextEntry={true}
        />
        <TextInput
          mode="flat"
          style={styles.flex}
          containerStyle={styles.textInput}
          label="Ulangi Kata Sandi Baru"
          value={repeatPasswordValue}
          onChangeText={setRepeatPasswordValue}
          textContentType="password"
          secureTextEntry={true}
        />
      </View>
      <View style={styles.bottomContainer}>
        <Button style={styles.buttonStyle} onPress={onPressSimpan}>
          <Text weight="medium" style={styles.buttonText}>
            Simpan
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
    marginTop: 25,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIconContainer: {
    flex: 1,
    paddingTop: 3,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    paddingRight: 5,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  body: {
    flex: 5,
    paddingTop: 20,
    paddingHorizontal: 24,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: COLORS.white,
  },
  gantiAvatar: {
    marginTop: 10,
    color: COLORS.primaryColor,
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
});
