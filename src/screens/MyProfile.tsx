import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';
import { useFocusEffect } from 'react-navigation-hooks';

import { AllAvatars } from '../constants/avatars';
import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import asyncStorage from '../helpers/asyncStorage';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { Loading } from '../core-ui';

export default function MyProfileScene() {
  let { navigate, goBack } = useNavigation();

  let { loading, data, refetch } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (loading || !data) {
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
          Profil Saya
        </Text>
        <View style={styles.flex}>
          <Text weight="medium" style={styles.point}>
            Nilai : {data.myProfile.highestScore / 10}
          </Text>
          <View style={styles.userInfo}>
            <View style={styles.yellowCoin} />
            <Text weight="medium" style={styles.koin}>
              {data.myProfile.point}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.profileInfoContainer}>
        <Avatar.Image
          style={styles.avatar}
          source={AllAvatars[Number(data.myProfile.avatar?.image ?? 0)].src}
          onPress={() => navigate('Shop')}
        />
        <View>
          <Text weight="medium" style={styles.fontMedium}>
            {data.myProfile.name}
          </Text>
          <Text style={styles.dateRegister}>{data.myProfile.email}</Text>
          <Text style={styles.dateRegister}>
            Terdaftar Sejak {dateFormat(data.myProfile.createdAt, 'dd/mm/yyyy')}
          </Text>
        </View>
        <IconButton
          icon="pencil"
          color={COLORS.primaryColor}
          onPress={() => navigate('EditProfile')}
        />
      </View>
      <View style={styles.body}>
        <View style={styles.menuContainer}>
          <IconButton
            icon="shopping"
            color={COLORS.primaryColor}
            style={styles.menuIcon}
          />
          <Text
            weight="medium"
            style={styles.fontMedium}
            onPress={() => navigate('Shop')}
          >
            Toko Avatar
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <IconButton
            icon="star-circle"
            color={COLORS.primaryColor}
            style={styles.menuIcon}
          />
          <Text
            weight="medium"
            style={styles.fontMedium}
            onPress={() => navigate('BadgeCollection')}
          >
            Koleksi Lencana
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <IconButton
            icon="information-outline"
            color={COLORS.primaryColor}
            style={styles.menuIcon}
          />
          <Text
            weight="medium"
            style={styles.fontMedium}
            onPress={() => navigate('About')}
          >
            Tentang Aplikasi
          </Text>
        </View>
        <View style={styles.menuContainer}>
          <IconButton
            icon="power"
            color={COLORS.primaryColor}
            style={styles.menuIcon}
          />
          <Text
            weight="medium"
            style={styles.fontMedium}
            onPress={async () => {
              await asyncStorage.removeToken();
              navigate('Welcome');
            }}
          >
            Keluar
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
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  yellowCoin: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 5,
    marginRight: 8,
  },
  navbar: {
    marginTop: 25,
    paddingLeft: 8,
    paddingRight: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIconContainer: {
    flex: 1,
    paddingTop: 5,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    marginLeft: 15,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  point: {
    color: COLORS.primaryColor,
    fontSize: FONT_SIZE.medium,
    textAlign: 'right',
  },
  koin: {
    paddingBottom: 2,
    color: COLORS.gold,
    fontSize: FONT_SIZE.medium,
    textAlign: 'right',
  },
  profileInfoContainer: {
    paddingVertical: 16,
    paddingLeft: 24,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: COLORS.white,
  },
  fontMedium: {
    fontSize: FONT_SIZE.medium,
  },
  dateRegister: {
    opacity: 0.6,
  },
  body: {
    flex: 5,
    marginTop: 16,
  },
  menuContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    paddingTop: 3,
    marginLeft: 8,
  },
});
