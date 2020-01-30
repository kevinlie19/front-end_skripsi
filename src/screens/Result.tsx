import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'exoflex';

import { FONT_SIZE } from '../constants/fonts';

export default function Result() {
  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <Text weight="medium" style={styles.title}>
          Hasil Ujian
        </Text>
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
