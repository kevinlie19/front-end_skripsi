import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Text, Portal, Modal, Button } from 'exoflex';
import { useNavigation } from 'naviflex';
import { useQuery } from '@apollo/react-hooks';

import { FONT_SIZE } from '../constants/fonts';
import { COLORS } from '../constants/colors';
import { GetQuestions, GetQuestionsVariables } from '../generated/GetQuestions';
import { GET_QUESTIONS } from '../graphql/queries/questionsQuery';
import { Loading, CountdownTimer } from '../core-ui';

type Choice = {
  id: string;
  answer: string;
  correct: boolean;
};

export default function Exam() {
  let { navigate, getParam } = useNavigation();

  const category = getParam('category');
  const paket = getParam('paket');

  let [questionIndex, setQuestionIndex] = useState(0);
  let [answers, setAnswers] = useState<Array<Choice>>([]);
  let [modalVisible, setModalVisible] = useState(false);
  let [buttonVisible, setButtonVisible] = useState(false);

  const { loading: loadingQuestions, data: dataQuestions } = useQuery<
    GetQuestions,
    GetQuestionsVariables
  >(GET_QUESTIONS, {
    variables: { category },
  });

  const onPressNext = () => {
    if (questionIndex < 39) {
      setQuestionIndex(questionIndex + 1);
    } else {
      setQuestionIndex(questionIndex);
    }
  };

  const onPressAnswer = (choice: Choice) => {
    setButtonVisible(true);

    let tempArray = [...answers];
    tempArray[questionIndex] = choice;
    setAnswers(tempArray);
  };

  const onNavigateQuestion = (index: number) => {
    if (index !== questionIndex) {
      setQuestionIndex(index);
    }
    setModalVisible(false);
  };

  const onPressKumpul = () => {
    Alert.alert('Mengumpulkan...', 'Apakah Anda Yakin?', [
      { text: 'Nanti Dulu' },
      {
        text: 'Kumpul',
        onPress: () => {
          setModalVisible(false);
          navigate('Result', { answers, category, paket });
        },
      },
    ]);
  };

  if (loadingQuestions) {
    return <Loading />;
  }

  return (
    <View style={styles.flex}>
      <Portal>
        <Modal
          onDismiss={() => {
            setModalVisible(false);
          }}
          visible={modalVisible}
          contentContainerStyle={styles.modal}
        >
          <View style={[styles.modalTitleContainer, styles.borderBottom]}>
            <Text weight="medium" style={styles.modalTitle}>
              Pertanyaan
            </Text>
            <TouchableOpacity onPress={onPressKumpul}>
              <Text weight="bold" style={styles.kumpul}>
                Kumpul
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.questionNumberContainer}>
            <FlatList
              style={styles.flex}
              data={dataQuestions?.questions ?? []}
              contentInsetAdjustmentBehavior={'automatic'}
              renderItem={({ index }) => {
                return (
                  <TouchableOpacity
                    style={styles.modalNomorTextContainer}
                    onPress={() => {
                      onNavigateQuestion(index);
                    }}
                  >
                    <Text
                      style={[
                        styles.modalNomorText,
                        index === questionIndex
                          ? { color: COLORS.primaryColor }
                          : null,
                      ]}
                    >
                      Nomor {index + 1}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </Modal>
      </Portal>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <CountdownTimer />
        </View>
        <Text weight="medium" style={styles.title}>
          {paket}
        </Text>
        <View style={(styles.flex, { justifyContent: 'flex-end' })}>
          <TouchableOpacity
            style={styles.nomorContainer}
            onPress={() => {
              setModalVisible(true);
            }}
          >
            <Text weight="bold" style={styles.nomorText}>
              {questionIndex + 1} / 40
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.soalContainer}>
          <Text weight="medium" style={{ fontSize: FONT_SIZE.large }}>
            {questionIndex + 1}.{'  '}
          </Text>
          <Text weight="medium" style={styles.soal}>
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
                    answers[questionIndex] !== undefined &&
                    answers[questionIndex].id === element.id
                      ? styles.activeAnswer
                      : null,
                  ]}
                  onPress={() => {
                    onPressAnswer(element);
                  }}
                  key={index}
                >
                  <Text
                    weight="medium"
                    style={[
                      answers[questionIndex] !== undefined &&
                      answers[questionIndex].id === element.id
                        ? styles.activeAnswerText
                        : null,
                    ]}
                  >
                    {String.fromCharCode(index + 65)}.{' '}
                  </Text>
                  <Text
                    style={[
                      answers[questionIndex] !== undefined &&
                      answers[questionIndex].id === element.id
                        ? styles.activeAnswerText
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
      </ScrollView>
      {buttonVisible && (
        <Button style={styles.buttonStyle} onPress={onPressNext}>
          <Text weight="medium" style={styles.buttonText}>
            {questionIndex < 39 ? 'Soal Selanjutnya' : 'Selesai'}
          </Text>
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  answer: {},
  activeAnswer: {
    backgroundColor: COLORS.blue,
  },
  activeAnswerText: {
    color: COLORS.white,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  row: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  modal: {
    backgroundColor: COLORS.white,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalTitleContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalTitle: {
    paddingVertical: 16,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
  },
  kumpul: {
    paddingVertical: 16,
    fontSize: FONT_SIZE.large,
    textAlign: 'center',
    color: COLORS.primaryColor,
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
  modalNomorTextContainer: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  modalNomorText: {
    paddingHorizontal: 24,
  },
  questionNumberContainer: {
    height: 250,
  },
  soalContainer: {
    flexDirection: 'row',
    maxWidth: 380,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  soal: {
    fontSize: FONT_SIZE.large,
    textAlign: 'justify',
  },
  optionsContainer: {},
  buttonStyle: {
    marginTop: 24,
    marginHorizontal: 24,
    marginBottom: 36,
    backgroundColor: COLORS.primaryColor,
  },
  buttonText: {
    fontSize: FONT_SIZE.medium,
    color: COLORS.white,
  },
});
