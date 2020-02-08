import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { Text, IconButton, Button } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function ChoosePaket() {
  let { navigate } = useNavigation();

  let onPressPaket = (paketValue: string) => {
    let temp = paketValue.split(' ');
    let category = temp[0] + temp[1];

    Alert.alert(
      `Memulai Ujian Nasional ${paketValue}`,
      'Waktu Pengerjaan Ujian Nasional adalah 120 Menit',
      [
        {
          text: 'Nanti Dulu',
        },
        {
          text: 'Mulai',
          onPress: () =>
            navigate('Exam', { paket: paketValue, category: category }),
        },
      ],
      { cancelable: false },
    );
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
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/choose.png')}
          />
        </View>
        <Button
          style={styles.button}
          onPress={() => {
            onPressPaket('Paket 1');
          }}
        >
          Paket 1
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            onPressPaket('Paket 2');
          }}
        >
          Paket 2
        </Button>
        <Button
          style={styles.button}
          onPress={() => {
            onPressPaket('Paket 3');
          }}
        >
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 500,
    height: 300,
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
