import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { useNavigation } from 'naviflex';
import Onboarding from 'react-native-onboarding-swiper';

import { COLORS } from '../constants/colors';

export default function TutorialExam() {
  const { navigate, getParam } = useNavigation();

  let paket = getParam('paket');
  let category = getParam('category');

  let nextScene = () => navigate('Exam', { paket, category });

  const page1 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/indonesia.png')}
        style={styles.image2}
      />
    ),
    title: 'PANDUAN UJIAN NASIONAL BAHASA INDONESIA',
    subtitle: `Ujian Nasional Tingkat Sekolah Dasar Bahasa Indonesia ${paket}`,
  };

  const page2 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/exam.png')}
        style={styles.image2}
      />
    ),
    title: 'Terdapat 40 soal pilihan ganda dalam Waktu 120 menit',
    subtitle: 'Pilihlah jawaban yang paling tepat',
  };

  const page3 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/pindahNomor.png')}
        style={styles.image2}
        resizeMode="contain"
      />
    ),
    title: 'Anda dapat menekan tombol ini untuk berpindah nomor',
    subtitle: 'Jika anda belum yakin, jawaban dapat dikosongkan',
  };

  const page4 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/kumpulUN.png')}
        style={styles.image1}
        resizeMode="contain"
      />
    ),
    title: 'Tekan kumpul untuk mengumpulkan jawaban',
    subtitle:
      'Optimalkan waktu yang anda miliki untuk mendapatkan nilai terbaikmu',
  };

  const page5 = {
    backgroundColor: COLORS.white,
    image: (
      <Image
        source={require('../../assets/images/quiz.png')}
        style={styles.image2}
      />
    ),
    title: 'AYO MULAI!',
    subtitle: '',
  };
  return (
    <Onboarding
      pages={[page1, page2, page3, page4, page5]}
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
    width: 370,
    height: 300,
  },
  image2: {
    width: 300,
    height: 300,
  },
});
