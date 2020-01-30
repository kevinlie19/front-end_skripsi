import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';
import { Button } from 'exoflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function ChoosePaket() {
  let { navigate } = useNavigation();

  let onPressPaket = () => {
    navigate('Result');
  };

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
          Pilih Paket
        </Text>
        <View style={styles.flex} />
      </View>
      <View style={styles.body}>
        <Button style={styles.button} onPress={onPressPaket}>
          Paket 1
        </Button>
        <Button style={styles.button} onPress={onPressPaket}>
          Paket 2
        </Button>
        <Button style={styles.button} onPress={onPressPaket}>
          Paket 3
        </Button>
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
  body: {
    flex: 5,
    paddingHorizontal: 24,
    justifyContent: 'space-around',
  },
  button: {
    borderRadius: 8,
  },
});
