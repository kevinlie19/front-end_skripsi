import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from 'naviflex';
import Onboarding from 'react-native-onboarding-swiper';

import { COLORS } from '../constants/colors';

export default function TutorialExam() {
  const { navigate } = useNavigation();

  let nextScene = () => navigate('Exam');

  const page1 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/2020.png')}
        style={styles.image1}
      />
    ),
    title: 'SELAMAT DATANG',
    subtitle: 'Done with React Native Onboarding Swiper',
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
    subtitle: 'Mari Lulus Ujian Nasional Bahasa Indonesia',
  };

  const page3 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/quiz.png')}
        style={styles.image3}
      />
    ),
    title: 'AYO MULAI',
    subtitle: 'Dapatkan Nilai Terbaikmu!',
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
    width: 450,
    height: 300,
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
