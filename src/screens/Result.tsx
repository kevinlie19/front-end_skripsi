import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text, Button, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { useMutation, useQuery } from '@apollo/react-hooks';
import {
  UpdateProfile,
  UpdateProfileVariables,
} from '../generated/UpdateProfile';
import { UPDATE_PROFILE } from '../graphql/mutations/updateProfileMutation';
import {
  UpdateUserProgress,
  UpdateUserProgressVariables,
} from '../generated/UpdateUserProgress';
import { UPDATE_USER_PROGRESS } from '../graphql/mutations/updateUserProgressMutation';
import { MyProfile } from '../generated/MyProfile';
import { MY_PROFILE } from '../graphql/queries/myProfileQuery';
import { Loading } from '../core-ui';

type Choice = {
  id: string;
  answer: string;
  correct: boolean;
};

export default function Result() {
  let { getParam, navigate } = useNavigation();
  let paket = getParam('paket');
  let category = getParam('category');
  let answers: Array<Choice> = getParam('answers');

  for (let i = 0; i < 40; i += 1) {
    if (answers[i] === undefined) {
      answers[i] = { id: '', answer: '', correct: false };
    }
  }

  let correctCounts = answers.filter((item) => item.correct).length;
  let score = correctCounts * 2.5;
  let koin = score * 2;

  let { loading: loadingProfile, data: dataProfile } = useQuery<MyProfile>(
    MY_PROFILE,
    {
      fetchPolicy: 'cache-and-network',
    },
  );

  const [updateProfile, { loading: loadingUpdateProfile }] = useMutation<
    UpdateProfile,
    UpdateProfileVariables
  >(UPDATE_PROFILE);

  const [updateProgress, { loading: loadingUpdateProgress }] = useMutation<
    UpdateUserProgress,
    UpdateUserProgressVariables
  >(UPDATE_USER_PROGRESS);

  let onPressHome = async () => {
    if (dataProfile) {
      await updateProfile({
        variables: {
          highestScore:
            dataProfile.myProfile.highestScore / 10 < score
              ? score * 10
              : dataProfile.myProfile.highestScore,
          point: dataProfile.myProfile.point + koin,
        },
      });

      await updateProgress({
        variables: {
          Paket1:
            category === 'Paket1'
              ? dataProfile?.myProfile.progress.Paket1 > score
                ? score * 10
                : dataProfile?.myProfile.progress.Paket1
              : dataProfile?.myProfile.progress.Paket1,
          Paket2:
            category === 'Paket2'
              ? dataProfile?.myProfile.progress.Paket2 > score
                ? score * 10
                : dataProfile?.myProfile.progress.Paket2
              : dataProfile?.myProfile.progress.Paket2,
          Paket3:
            category === 'Paket3'
              ? dataProfile?.myProfile.progress.Paket3 > score
                ? score * 10
                : dataProfile?.myProfile.progress.Paket3
              : dataProfile?.myProfile.progress.Paket3,
        },
      });
    }
    navigate('Home');
  };

  if (loadingProfile || loadingUpdateProfile || loadingUpdateProgress) {
    <Loading />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <Text weight="medium" style={styles.title}>
          Hasil Ujian
        </Text>
      </View>
      <View style={styles.body}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={answers}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                style={[
                  styles.row,
                  { paddingHorizontal: 0, paddingLeft: 25, paddingRight: 16 },
                ]}
                onPress={() => {
                  navigate('Review', {
                    answer: answers[index],
                    category,
                    index,
                    paket,
                  });
                }}
                key={index}
              >
                <Text style={styles.pertanyaan}>Pertanyaan {index + 1}</Text>
                <IconButton
                  icon={item.correct ? 'check' : 'close'}
                  color={item.correct ? COLORS.green : COLORS.primaryColor}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={() => Math.random().toString()}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <Text>Jawaban Benar</Text>
          <Text weight="medium">{correctCounts} / 40</Text>
        </View>
        <View style={[styles.row, styles.paddingVertical]}>
          <Text>Nilai Anda</Text>
          <Text weight="medium">{score}</Text>
        </View>
        <View style={styles.row}>
          <Text>Total Koin</Text>
          <Text weight="medium">{koin}</Text>
        </View>
        <Button
          style={styles.buttonStyle}
          onPress={onPressHome}
          loading={loadingUpdateProfile || loadingUpdateProgress}
        >
          <Text weight="medium" style={styles.buttontext}>
            Kembali ke Beranda
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  paddingVertical: {
    paddingVertical: 16,
  },
  navbar: {
    marginTop: 35,
    paddingLeft: 8,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  title: {
    flex: 1,
    paddingBottom: 15,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  body: {
    flex: 5,
  },
  pertanyaan: {
    paddingBottom: 2,
  },
  bottomContainer: {
    marginTop: 24,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.grey,
  },
  buttonStyle: {
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 36,
    backgroundColor: COLORS.primaryColor,
  },
  buttontext: {
    color: COLORS.white,
    fontSize: FONT_SIZE.medium,
  },
});
