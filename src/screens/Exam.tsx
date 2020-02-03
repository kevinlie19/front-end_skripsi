import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function Exam() {
  let { navigate, getParam } = useNavigation();

  let index = 0;

  let onPressBack = () => {
    navigate('Home');
  };

  let onPressIndex = () => {};

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            onPress={onPressBack}
          />
        </View>
        <Text weight="medium" style={styles.title}>
          {getParam('paket')}
        </Text>
        <View style={(styles.flex, { justifyContent: 'flex-end' })}>
          <View style={styles.nomorContainer}>
            <Text weight="medium" style={styles.nomor} onPress={onPressIndex}>
              {index + 1} / 40
            </Text>
          </View>
        </View>
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
    paddingRight: 16,
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
    paddingLeft: 12,
    paddingBottom: 5,
    fontSize: FONT_SIZE.large,
    textAlign: 'left',
  },
  nomorContainer: {
    marginBottom: 5,
    width: 56,
    height: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gold,
  },
  nomor: {
    color: COLORS.white,
    textAlign: 'right',
  },
});
