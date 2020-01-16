import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';

export default function MyProfile() {
  let { navigate } = useNavigation();
  let avatarSrc = require('../../assets/images/home.png');

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
          {'1000 pts'}
        </Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Avatar.Image source={avatarSrc} />
        <View>
          <Text weight="medium" style={styles.fontMedium}>
            {'Kevin Lie'}
          </Text>
          <Text style={styles.dateRegister}>{'Registered on 15/01/2020'}</Text>
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
            onPress={() => navigate('Home')}
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
            onPress={() => navigate('Home')}
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
            onPress={() => navigate('Welcome')}
          >
            Log Out
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
    marginTop: 12,
  },
  title: {
    marginLeft: 30,
    fontSize: FONT_SIZE.large,
  },
  point: {
    color: COLORS.primaryColor,
    fontSize: FONT_SIZE.medium,
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
