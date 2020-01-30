import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, ActivityIndicator, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { Badges } from '../constants/badges';

export default function BadgeCollection() {
  let { navigate } = useNavigation();

  let { loading, data } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  if (loading || !data) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const kondisiSatu = data?.myProfile.highestScore === 100;
  const kondisiDua = data?.myProfile.avatarCollection?.length === 14;
  const kondisiTiga =
    data?.myProfile.progress.Paket1 === 100 &&
    data?.myProfile.progress.Paket2 === 100 &&
    data?.myProfile.progress.Paket3 === 100;
  const kondisiEmpat = data?.myProfile.highestScore >= 60;
  const kondisiLima = data?.myProfile.progress.Paket1 >= 60;
  const kondisiEnam = data?.myProfile.progress.Paket2 >= 60;
  const kondisiTujuh = data?.myProfile.progress.Paket3 >= 60;

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
              kondisiSatu
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
              kondisiSatu
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
              kondisiSatu
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
              kondisiSatu
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
              kondisiSatu
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
              kondisiSatu
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
