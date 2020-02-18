import React, { useCallback } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, IconButton, Avatar } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { AllAvatars } from '../constants/avatars';
import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';
import { Leaderboard } from '../generated/Leaderboard';
import { LEADERBOARD } from '../graphql/queries/leaderboardQuery';
import { Loading } from '../core-ui';
import { useFocusEffect } from 'react-navigation-hooks';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';

export default function LeaderboardScene() {
  let { navigate } = useNavigation();

  let { loading, data, refetch } = useQuery<Leaderboard>(LEADERBOARD, {
    fetchPolicy: 'cache-and-network',
  });

  let { data: myProfileData } = useQuery<MyProfile>(MY_PROFILE, {
    fetchPolicy: 'cache-and-network',
  });

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  let onPressUser = (id: string) => {
    if (id === myProfileData?.myProfile.id) {
      navigate('MyProfile');
    } else {
      navigate('OtherProfile', { id });
    }
  };

  if (loading || !data) {
    return <Loading />;
  } else {
    return (
      <View style={styles.flex}>
        <View style={styles.navbar}>
          <View style={styles.backIconContainer}>
            <IconButton
              icon="arrow-left"
              color={COLORS.primaryColor}
              onPress={() => navigate('Home')}
            />
          </View>
          <Text weight="medium" style={styles.title}>
            Peringkat
          </Text>
          <View style={styles.flex} />
        </View>
        <View style={styles.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.leaderboard}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  style={styles.row}
                  onPress={() => onPressUser(item.id)}
                >
                  <Text weight="medium" style={{ fontSize: FONT_SIZE.medium }}>
                    {index + 1}.
                  </Text>
                  <View style={styles.flex}>
                    <Avatar.Image
                      style={styles.avatar}
                      source={AllAvatars[Number(item.avatar?.image ?? 0)].src}
                    />
                  </View>
                  <Text weight="medium" style={styles.name}>
                    {item.name}
                  </Text>
                  <Text weight="medium" style={styles.score}>
                    {item.highestScore / 10} / 100
                  </Text>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
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
  separator: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  avatar: {
    marginLeft: 29,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    fontSize: FONT_SIZE.medium,
  },
  score: {
    flex: 1,
    fontSize: FONT_SIZE.medium,
    color: COLORS.primaryColor,
    textAlign: 'right',
  },
});
