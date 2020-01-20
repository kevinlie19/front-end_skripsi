import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Avatar, ActivityIndicator } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import asyncStorage from '../helpers/asyncStorage';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileMutation';

export default function MyProfileScene() {
  let { navigate } = useNavigation();
  let avatarSrc = require('../../assets/images/home.png');

  let { loading, data } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'network-only',
  });

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  } else {
    return (
      <View style={styles.flex}>
        <View style={styles.navbar}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            style={styles.backIcon}
            onPress={() => navigate('Home')}
          />
          <Text weight="medium" style={styles.title}>
            Profil Saya
          </Text>
          <Text weight="medium" style={styles.point}>
            {data.myProfile.point} pts
          </Text>
        </View>
        <View style={styles.profileInfoContainer}>
          <Avatar.Image
            source={{ uri: data.myProfile.avatar?.image ?? avatarSrc }}
          />
          <View>
            <Text weight="medium" style={styles.fontMedium}>
              {data.myProfile.name}
            </Text>
            <Text style={styles.dateRegister}>{data.myProfile.email}</Text>
            <Text style={styles.dateRegister}>
              Registered on {dateFormat(data.myProfile.createdAt, 'dd/mm/yyyy')}
            </Text>
          </View>
          <IconButton icon="pencil" color={COLORS.primaryColor} />
        </View>
        <View style={styles.body}>
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
              Koleksi Badge
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
              About
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
              Log Out
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  backIcon: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 12,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  point: {
    flex: 1,
    color: COLORS.primaryColor,
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
