import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { COLORS } from '../constants/colors';
import { FONT_SIZE } from '../constants/fonts';

export default function Leaderboard() {
  let { navigate } = useNavigation();

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
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          data={}
          renderItem={({ item }) => {}}
          keyExtractor={(item) => item.id}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  navbar: {
    marginTop: 35,
    paddingLeft: 8,
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
});
