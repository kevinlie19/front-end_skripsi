import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { Badges } from '../constants/badges';
import { Loading } from '../core-ui';

export default function BadgeCollection() {
  let { goBack } = useNavigation();

  let { loading: loadingMyProfile, data: myProfileData } = useQuery<MyProfile>(
    MY_PROFILE,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  if (loadingMyProfile || !myProfileData) {
    return <Loading />;
  }

  const kondisiSatu = myProfileData?.myProfile.highestScore / 10 === 100;
  const kondisiDua = myProfileData?.myProfile.avatarCollection?.length === 14;
  const kondisiTiga =
    myProfileData?.myProfile.progress.Paket1 / 10 === 100 &&
    myProfileData?.myProfile.progress.Paket2 / 10 === 100 &&
    myProfileData?.myProfile.progress.Paket3 / 10 === 100;
  const kondisiEmpat = myProfileData?.myProfile.highestScore / 10 >= 60;
  const kondisiLima = myProfileData?.myProfile.progress.Paket1 / 10 >= 60;
  const kondisiEnam = myProfileData?.myProfile.progress.Paket2 / 10 >= 60;
  const kondisiTujuh = myProfileData?.myProfile.progress.Paket3 / 10 >= 60;

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
          Koleksi Lencana
        </Text>
        <View style={styles.flex} />
      </View>

      <ScrollView>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiSatu ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiSatu
                ? Badges[0].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiSatu ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[0].name}
            </Text>
            <Text
              style={
                kondisiSatu ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[0].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiDua ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiDua
                ? Badges[1].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiDua ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[1].name}
            </Text>
            <Text
              style={kondisiDua ? styles.requirement : styles.lockedRequirement}
              weight="medium"
            >
              {Badges[1].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiTiga ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiTiga
                ? Badges[2].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiTiga ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[2].name}
            </Text>
            <Text
              style={
                kondisiTiga ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[2].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiEmpat ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiEmpat
                ? Badges[3].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiEmpat ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[3].name}
            </Text>
            <Text
              style={
                kondisiEmpat ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[3].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiLima ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiLima
                ? Badges[4].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiLima ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[4].name}
            </Text>
            <Text
              style={
                kondisiLima ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[4].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiEnam ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiEnam
                ? Badges[5].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiEnam ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[5].name}
            </Text>
            <Text
              style={
                kondisiEnam ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[5].description}
            </Text>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Avatar.Image
            style={kondisiTujuh ? styles.avatar : styles.lockedAvatar}
            source={
              kondisiTujuh
                ? Badges[6].src
                : require('../../assets/badges/Lock.png')
            }
          />
          <View style={styles.marginLeft}>
            <Text
              style={kondisiTujuh ? styles.badgeName : styles.lockedBadgeName}
              weight="medium"
            >
              {Badges[6].name}
            </Text>
            <Text
              style={
                kondisiTujuh ? styles.requirement : styles.lockedRequirement
              }
              weight="medium"
            >
              {Badges[6].description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  marginLeft: {
    marginLeft: 16,
    maxWidth: 250,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  navbar: {
    marginTop: 35,
    paddingLeft: 8,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  backIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
    paddingBottom: 5,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  body: {
    flex: 5,
  },
  avatar: {
    marginLeft: 24,
    marginRight: 16,
    backgroundColor: COLORS.white,
  },
  lockedAvatar: {
    opacity: 0.5,
    marginLeft: 24,
    marginRight: 16,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    height: 96,
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  badgeName: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
  },
  lockedBadgeName: {
    opacity: 0.5,
    fontSize: FONT_SIZE.medium,
  },
  requirement: {
    marginTop: 8,
  },
  lockedRequirement: {
    marginTop: 8,
    opacity: 0.6,
  },
});
