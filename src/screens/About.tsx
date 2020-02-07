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
          Tentang Aplikasi
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
});
