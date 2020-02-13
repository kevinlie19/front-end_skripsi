import React, { useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, IconButton, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';
import dateFormat from 'dateformat';
import { useFocusEffect } from 'react-navigation-hooks';

import { AllAvatars } from '../constants/avatars';
import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { OTHER_PROFILE } from '../graphql/queries/otherProfileQuery';
import { Loading } from '../core-ui';
import { OtherProfile } from '../generated/OtherProfile';
import { Badges } from '../constants/badges';

export default function OtherProfileScene() {
  let { navigate, goBack, getParam } = useNavigation();

  let userId = getParam('id');

  let { loading, data, refetch } = useQuery<OtherProfile>(OTHER_PROFILE, {
    fetchPolicy: 'cache-and-network',
    variables: { id: userId },
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (loading || !data) {
    return <Loading />;
  }

  const kondisiSatu = data?.otherProfile.highestScore / 10 === 100;
  const kondisiDua = data?.otherProfile.avatarCollection?.length === 14;
  const kondisiTiga =
    data?.otherProfile.progress.Paket1 / 10 === 100 &&
    data?.otherProfile.progress.Paket2 / 10 === 100 &&
    data?.otherProfile.progress.Paket3 / 10 === 100;
  const kondisiEmpat = data?.otherProfile.highestScore / 10 >= 60;
  const kondisiLima = data?.otherProfile.progress.Paket1 / 10 >= 60;
  const kondisiEnam = data?.otherProfile.progress.Paket2 / 10 >= 60;
  const kondisiTujuh = data?.otherProfile.progress.Paket3 / 10 >= 60;

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
          Profil {data.otherProfile.name}
        </Text>
        <Text weight="medium" style={styles.point}>
          {data.otherProfile.highestScore / 10} pts
        </Text>
      </View>
      <View style={styles.profileInfoContainer}>
        <Avatar.Image
          style={styles.avatar}
          source={AllAvatars[Number(data.otherProfile.avatar?.image ?? 0)].src}
          onPress={() => navigate('AvatarCollection')}
        />
        <View style={styles.flex}>
          <Text weight="medium" style={styles.fontMedium}>
            {data.otherProfile.name}
          </Text>
          <Text style={styles.dateRegister}>{data.otherProfile.email}</Text>
          <Text style={styles.dateRegister}>
            Registered on{' '}
            {dateFormat(data.otherProfile.createdAt, 'dd/mm/yyyy')}
          </Text>
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <Text weight="medium" style={styles.subTitle}>
            Koleksi Lencana
          </Text>
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
                style={
                  kondisiDua ? styles.requirement : styles.lockedRequirement
                }
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
  subTitle: {
    fontSize: FONT_SIZE.medium,
    paddingLeft: 16,
    paddingBottom: 16,
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
  avatar: {
    backgroundColor: COLORS.white,
    marginRight: 60,
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
