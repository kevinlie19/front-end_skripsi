import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Text, IconButton, ActivityIndicator, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { Loading } from '../core-ui';
import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { AllAvatars } from '../constants/avatars';
import { Avatars } from '../generated/Avatars';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { AVATARS } from '../graphql/queries/avatarsQuery';
import {
  UpdateProfile,
  UpdateProfileVariables,
} from '../generated/UpdateProfile';
import { UPDATE_PROFILE } from '../graphql/mutations/updateProfileMutation';
import {
  AddToAvatarCollection,
  AddToAvatarCollectionVariables,
} from '../generated/AddToAvatarCollection';
import { ADD_TO_AVATAR_COLLECTION } from '../graphql/mutations/addToAvatarMutation';

export default function AvatarCollection() {
  let { navigate } = useNavigation();

  let { loading: avatarLoading, data: avatarData } = useQuery<Avatars>(
    AVATARS,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  let { loading: profileLoading, data: profileData } = useQuery<MyProfile>(
    MY_PROFILE,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const [
    addToAvatarCollection,
    { loading: loadingAddToAvatarCollection },
  ] = useMutation<AddToAvatarCollection, AddToAvatarCollectionVariables>(
    ADD_TO_AVATAR_COLLECTION,
  );

  const [updateProfile, { loading: loadingUpdateProfile }] = useMutation<
    UpdateProfile,
    UpdateProfileVariables
  >(UPDATE_PROFILE);

  const onBuyAvatar = async (avatarId: string, price: number) => {
    if (profileData?.myProfile.point && profileData.myProfile.point >= price) {
      await addToAvatarCollection({
        variables: {
          avatarId,
        },
      });
      await updateProfile({
        variables: {
          point: profileData.myProfile.point - price,
        },
      });
    } else {
      Alert.alert(
        'Tidak punya cukup koin',
        'Selesaikanlah sebuah paket soal untuk mendapatkan koin',
        [{ text: 'OK' }],
        {
          cancelable: false,
        },
      );
    }
  };

  const onEquipAvatar = async (avatarId: string) => {
    await updateProfile({
      variables: {
        avatarId,
      },
    });
  };

  if (avatarLoading || profileLoading || !avatarData || !profileData) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            onPress={() => navigate('EditProfile')}
          />
        </View>
        <Text weight="medium" style={styles.title}>
          Pilih Avatar
        </Text>
        <Text weight="medium" style={styles.points}>
          {profileData.myProfile.point} koin
        </Text>
      </View>
      <View style={styles.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="always"
          data={avatarData.avatars}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.contentContainer} key={index}>
                <Avatar.Image
                  style={styles.avatar}
                  source={AllAvatars[Number(item.image)].src}
                />
                <View style={styles.marginLeft}>
                  <Text style={styles.avatarName} weight="medium">
                    {AllAvatars[index].name}
                  </Text>
                  <View style={styles.coins}>
                    <View style={styles.yellowCoin} />
                    <Text>{item.price}</Text>
                  </View>
                </View>
                {profileData?.myProfile.avatarCollection?.find(
                  (element) => item.id === element.id,
                ) ? (
                  profileData.myProfile.avatar?.id === item.id ? (
                    <View style={styles.buyTextContainer}>
                      {loadingUpdateProfile || loadingAddToAvatarCollection ? (
                        <ActivityIndicator />
                      ) : (
                        <IconButton
                          icon="check-circle-outline"
                          color={COLORS.gold}
                          style={styles.icon}
                        />
                      )}
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={styles.buyTextContainer}
                      onPress={() => {
                        onEquipAvatar(item.id);
                      }}
                    >
                      {loadingUpdateProfile || loadingAddToAvatarCollection ? (
                        <ActivityIndicator />
                      ) : (
                        <Text weight="medium" style={styles.equipText}>
                          PAKAI
                        </Text>
                      )}
                    </TouchableOpacity>
                  )
                ) : (
                  <TouchableOpacity
                    style={styles.buyTextContainer}
                    onPress={() => {
                      onBuyAvatar(item.id, item.price);
                    }}
                  >
                    {loadingUpdateProfile || loadingAddToAvatarCollection ? (
                      <ActivityIndicator />
                    ) : (
                      <Text weight="medium" style={styles.buyText}>
                        BELI
                      </Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
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
  },
  icon: {
    flex: 1,
    alignItems: 'flex-end',
  },
  points: {
    flex: 1,
    marginRight: 24,
    paddingBottom: 5,
    textAlign: 'right',
    color: COLORS.gold,
    fontSize: FONT_SIZE.medium,
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
    marginBottom: 16,
  },
  subTitle: {
    paddingHorizontal: 24,
    opacity: 0.6,
    color: COLORS.mediumGrey,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: COLORS.white,
  },
  avatarName: {
    fontSize: FONT_SIZE.medium,
  },
  contentContainer: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    elevation: 5,
    flexDirection: 'row',
    height: 96,
    alignItems: 'center',
    marginBottom: 24,
    marginHorizontal: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  equipText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.gold,
  },
  coins: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  yellowCoin: {
    width: 10,
    height: 10,
    backgroundColor: COLORS.gold,
    borderRadius: 5,
    marginRight: 8,
  },
  buyTextContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 16,
  },
  buyText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
  },
});
