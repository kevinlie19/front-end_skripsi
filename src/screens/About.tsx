import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function About() {
  let { navigate } = useNavigation();

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
          About
        </Text>
        <View style={styles.flex} />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    marginTop: 12,
  },
  title: {
    flex: 1,
    marginLeft: 17,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
});
