import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Text, IconButton, ActivityIndicator } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { GET_LOCAL_STATE } from '../localGraphQL/userDataQuery';
import { GetLocalState } from '../generated/local/GetLocalState';

export default function Home() {
  let { navigate } = useNavigation();
  let src = require('../../assets/images/home.png');

  let { data: userData } = useQuery<GetLocalState>(GET_LOCAL_STATE);

  if (userData) {
    let {
      user: { name },
    } = userData;

    if (!name) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.flex}>
          <View style={styles.navbar}>
            <IconButton
              icon="trending-up"
              color={COLORS.primaryColor}
              size={30}
              onPress={() => navigate('Leaderboard')}
            />
            <IconButton
              icon="account-circle"
              color={COLORS.primaryColor}
              size={30}
              onPress={() => navigate('MyProfile')}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.center}>
              <Image source={src} style={styles.image} />
            </View>
            <Text weight="medium" style={styles.title}>
              Selamat Datang
            </Text>
            <View style={styles.center}>
              <Text>Selamat datang {name}, harap tekan tombol</Text>
              <Text>dibawah untuk mulai mengerjakan ujian.</Text>
              <Text>Semoga berhasil!</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.playButton}
                onPress={() => navigate('Home')} // TODO: Change to Quiz Route
              >
                <IconButton
                  icon="play"
                  color={COLORS.white}
                  size={35}
                  style={styles.playIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  } else {
    return <View />;
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    alignItems: 'center',
  },
  navbar: {
    flex: 1,
    marginTop: 35,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  body: {
    flex: 12,
  },
  image: {
    width: 300,
    height: 300,
  },
  title: {
    marginBottom: 16,
    fontSize: FONT_SIZE.large,
    color: COLORS.primaryColor,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  playButton: {
    width: 72,
    height: 72,
    borderRadius: 72 / 2,
    backgroundColor: COLORS.primaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playIcon: {
    marginTop: 9,
  },
});
