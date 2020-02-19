import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, IconButton } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { GetQuestions, GetQuestionsVariables } from '../generated/GetQuestions';
import { GET_QUESTIONS } from '../graphql/queries/questionsQuery';
import { Loading } from '../core-ui';

type Choice = {
  id: string;
  answer: string;
  correct: boolean;
};

export default function Exam() {
  let { goBack, getParam } = useNavigation();

  const paket = getParam('paket');
  const answer: Choice = getParam('answer');
  const category = getParam('category');
  const questionIndex = getParam('index');

  const { loading: loadingQuestions, data: dataQuestions } = useQuery<
    GetQuestions,
    GetQuestionsVariables
  >(GET_QUESTIONS, {
    variables: { category },
  });

  const correctAnswer = dataQuestions?.questions[
    questionIndex
  ]?.choices?.filter((item) => item.correct === true);

  if (loadingQuestions) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <IconButton
            icon="arrow-left"
            color={COLORS.primaryColor}
            onPress={() => goBack()}
          />
        </View>
        <Text weight="medium" style={styles.title}>
          {paket}
        </Text>
        <View style={(styles.flex, { justifyContent: 'flex-end' })}>
          <View style={styles.nomorContainer}>
            <Text weight="bold" style={styles.nomorText}>
              {questionIndex + 1} / 40
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.soalContainer}>
          <Text weight="medium" style={styles.soal}>
            {questionIndex + 1}.{' '}
            {dataQuestions?.questions[questionIndex].description}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          {dataQuestions?.questions[questionIndex].choices?.map(
            (element, index) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.row,
                    answer.id === element.id
                      ? answer.correct
                        ? styles.correctAnswer
                        : styles.wrongAnswer
                      : null,
                  ]}
                  onPress={() => {}}
                  key={index}
                >
                  <Text
                    weight="medium"
                    style={[
                      answer.id === element.id
                        ? answer.correct
                          ? styles.answerText
                          : styles.answerText
                        : null,
                    ]}
                  >
                    {String.fromCharCode(index + 65)}.{' '}
                  </Text>
                  <Text
                    style={[
                      answer.id === element.id
                        ? answer.correct
                          ? styles.answerText
                          : styles.answerText
                        : null,
                    ]}
                  >
                    {element.answer}
                  </Text>
                </TouchableOpacity>
              );
            },
          )}
        </View>

        <View style={{ padding: 24 }}>
          {answer.correct ? (
            <Text
              weight="medium"
              style={[styles.soal, { color: COLORS.primaryColor }]}
            >
              Jawabanmu benar!
            </Text>
          ) : answer.answer !== '' ? (
            <>
              <Text
                weight="medium"
                style={[styles.soal, { color: COLORS.primaryColor }]}
              >
                Jawabanmu salah!
              </Text>
              <View style={styles.review}>
                <Text>Kunci jawabannya adalah </Text>
                <Text weight="medium">{`"${correctAnswer &&
                  correctAnswer[0].answer}"`}</Text>
              </View>
            </>
          ) : (
            <>
              <Text
                weight="medium"
                style={[styles.soal, { color: COLORS.primaryColor }]}
              >
                Kamu tidak menjawab soal ini!
              </Text>
              <View style={styles.review}>
                <Text>Kunci jawabannya : </Text>
                <Text weight="medium">{`"${correctAnswer &&
                  correctAnswer[0].answer}"`}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  answerText: {
    color: COLORS.white,
  },
  correctAnswer: {
    backgroundColor: COLORS.green,
  },
  wrongAnswer: {
    backgroundColor: COLORS.primaryColor,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
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
  body: {
    flex: 5,
  },
  nomorText: {
    color: COLORS.white,
    textAlign: 'right',
  },
  soalContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  soal: {
    fontSize: FONT_SIZE.large,
  },
  review: {
    paddingTop: 10,
    maxWidth: 380,
  },
  optionsContainer: {},
});
