import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from 'naviflex';
import Onboarding from 'react-native-onboarding-swiper';

import { COLORS } from '../constants/colors';

export default function OnBoarding() {
  const { navigate } = useNavigation();

  let nextScene = () => navigate('Home');

  const page1 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.image1}
      />
    ),
    title: 'SELAMAT DATANG DI SUKUN',
    subtitle: 'Sukses Ujian Nasional Bahasa Indonesia',
  };

  const page2 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/smart.png')}
        style={styles.image2}
      />
    ),
    title: 'ANDA ADALAH SISWA BERBAKAT',
    subtitle: 'Tunjukkan Kemampuan Bahasa Indonesiamu',
  };

  const page3 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/graduation.png')}
        style={styles.image3}
      />
    ),
    title: 'AYO LULUS UJIAN NASIONAL BAHASA INDONESIA',
    subtitle: 'SUKUN 2020! Dapatkan Nilai Terbaikmu!',
  };

  return (
    <Onboarding
      pages={[page1, page2, page3]}
      onDone={nextScene}
      onSkip={nextScene}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  image1: {
    width: 350,
    height: 350,
  },
  image2: {
    width: 300,
    height: 300,
  },
  image3: {
    width: 300,
    height: 300,
  },
});
