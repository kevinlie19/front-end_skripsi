import React from 'react';
import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';

export default function About() {
  let { navigate } = useNavigation();

  const src = require('../../assets/images/about.png');
  const imageSrc = require('../../assets/images/welcome.png');

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
      <ScrollView style={styles.body}>
        <View>
          <View style={styles.imageContainer}>
            <Image source={imageSrc} style={styles.imageSukun} />
          </View>

          <Text weight="medium" style={styles.text}>
            Sukses Ujian Nasional (Bahasa Indonesia)
          </Text>
        </View>
        <View style={styles.imageContainerSelf}>
          <Image source={src} style={styles.image} />
        </View>
        <Text weight="medium" style={styles.text}>
          Made By Kevin Lie - 00000012876
        </Text>
      </ScrollView>
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
  },
  imageContainer: {
    alignItems: 'center',
  },
  imageContainerSelf: {
    marginTop: 50,
    marginLeft: 35,
    alignItems: 'center',
  },
  imageSukun: {
    width: 250,
    height: 250,
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    fontSize: FONT_SIZE.large,
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
});
