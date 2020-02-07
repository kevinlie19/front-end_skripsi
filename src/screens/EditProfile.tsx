import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { Text, IconButton, TextInput, Button, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { useFocusEffect } from 'react-navigation-hooks';

import { AllAvatars } from '../constants/avatars';
import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import {
  UpdateProfile,
  UpdateProfileVariables,
} from '../generated/UpdateProfile';
import { UPDATE_PROFILE } from '../graphql/mutations/updateProfileMutation';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { Loading } from '../core-ui';

export default function EditProfile() {
  let { navigate } = useNavigation();
  let [nameValue, setNameValue] = useState('');
  let [emailValue, setEmailValue] = useState('');

  let { loading, data, refetch } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
    onCompleted: ({ myProfile }) => {
      setNameValue(myProfile.name);
      setEmailValue(myProfile.email);
    },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const [updateProfile, { loading: loadingUpdate }] = useMutation<
    UpdateProfile,
    UpdateProfileVariables
  >(UPDATE_PROFILE, {
    onCompleted() {
      navigate('MyProfile');
      setNameValue('');
      setEmailValue('');
    },
    onError(error) {
      let newError = error.message.split(':');
      Alert.alert(newError[1]);
    },
  });

  let onPressSimpan = async () => {
    await updateProfile({
      variables: {
        name: nameValue,
        email: emailValue,
      },
    });
  };

  if (loadingUpdate || loading || !data) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            onPress={() => navigate('MyProfile')}
          />
        </View>
        <Text weight="medium" style={styles.title}>
          Edit Profil
        </Text>
        <View style={styles.flex} />
      </View>
      <View style={styles.body}>
        <View style={styles.avatarContainer}>
          <Avatar.Image
            style={styles.avatar}
            size={96}
            source={AllAvatars[Number(data?.myProfile.avatar?.image ?? 0)].src}
          />
          <Text
            weight="medium"
            style={styles.gantiAvatar}
            onPress={() => navigate('AvatarCollection')}
          >
            Ganti Avatar
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
          keyboardType="email-address"
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
