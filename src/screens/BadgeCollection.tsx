import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';

export default function BadgeCollection() {
  let { navigate } = useNavigation();

  // let { loading, data } = useQuery<Leaderboard>(LEADERBOARD, {
  //   fetchPolicy: 'network-only',
  // });

  // if (loading || !data) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" />
  //     </View>
  //   );
  // } else {
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
      <View style={styles.body}>
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={data.leaderboard}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.row}>
                <Text>{index}.</Text>
                <View style={styles.flex}>
                  <Avatar.Image
                    style={styles.avatar}
                    source={{ uri: item.avatar?.image ?? ''}}
                  />
                </View>
                <Text weight="medium" style={styles.flex}>
                  {item.name}
                </Text>
                <Text style={styles.score}>{item.highestScore}/100</Text>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    </View>
  );
  // }
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
  separator: {
    marginVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  avatar: {
    marginLeft: 29,
  },
  score: {
    flex: 1,
    opacity: 0.6,
    color: COLORS.mediumGrey,
    textAlign: 'right',
  },
});
