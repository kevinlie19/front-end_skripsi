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
        <IconButton
          icon="arrow-left"
          color={COLORS.primaryColor}
          onPress={() => navigate('Home')}
        />
        <Text weight="medium" style={styles.title}>
          Peringkat
        </Text>
        <View />
      </View>
      <View style={styles.body}></View>
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
  title: {
    marginRight: 42,
    marginBottom: 8,
    fontSize: FONT_SIZE.large,
  },
  body: {
    flex: 5,
  },
});
