import React, { useState, useEffect } from 'react';
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

type Answers = Array<{
  nomorSoal: number;
  optionActive: string;
  answer: string | undefined | null;
  correct: boolean | undefined | null;
}>;

export default function Exam() {
  let { navigate, getParam } = useNavigation();
  let from: string = getParam('from');
  let nomorReview: number = getParam('nomorReview');
  let optionActiveReview: string = getParam('optionActiveReview');
  let optionCorrectReview = getParam('optionCorrectReview');

  const category = getParam('category');

  let { loading: loadingQuestions, data: dataQuestions } = useQuery<
    GetQuestions,
    GetQuestionsVariables
  >(GET_QUESTIONS, {
    variables: { category },
  });

  let [isVisible, setVisible] = useState(false);
  let [nomor, setNomor] = useState(0);
  let [isButtonShow, setIsButtonShow] = useState(false);
  let [isActiveA, setIsActiveA] = useState(false);
  let [isActiveB, setIsActiveB] = useState(false);
  let [isActiveC, setIsActiveC] = useState(false);
  let [isActiveD, setIsActiveD] = useState(false);
  let [isCorrectA, setIsCorrectA] = useState('');
  let [isCorrectB, setIsCorrectB] = useState('');
  let [isCorrectC, setIsCorrectC] = useState('');
  let [isCorrectD, setIsCorrectD] = useState('');
  let [optionActive, setOptionActive] = useState('');
  let [answers, setAnswers] = useState<Answers>([
    // {
    //   nomorSoal: 1,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 2,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 3,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 4,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 5,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 6,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 7,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 8,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 9,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 10,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 11,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 12,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 13,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 14,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 15,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 16,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 17,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 18,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 19,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 20,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 21,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 22,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 23,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 24,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 25,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 26,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 27,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 28,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 29,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 30,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 31,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 32,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 33,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 34,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 35,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 36,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 37,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 38,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 39,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
    // {
    //   nomorSoal: 40,
    //   optionActive: '',
    //   answer: '',
    //   correct: false,
    // },
  ]);

  useEffect(() => {
    if (typeof nomorReview === 'number' || nomorReview >= 0) {
      setNomor(nomorReview);
    }

    if (from === 'Result') {
      setIsButtonShow(false);
      setIsActiveA(false);
      setIsActiveB(false);
      setIsActiveC(false);
      setIsActiveD(false);
    }

    if (optionActiveReview) {
      if (optionActiveReview === 'A') {
        setIsActiveA(true);
        setIsActiveB(false);
        setIsActiveC(false);
        setIsActiveD(false);

        if (optionCorrectReview) {
          setIsCorrectA('true');
          setIsCorrectB('');
          setIsCorrectC('');
          setIsCorrectD('');
        } else {
          setIsCorrectA('false');
          setIsCorrectB('');
          setIsCorrectC('');
          setIsCorrectD('');
        }
      } else if (optionActiveReview === 'B') {
        setIsActiveA(false);
        setIsActiveB(true);
        setIsActiveC(false);
        setIsActiveD(false);

        if (optionCorrectReview) {
          setIsCorrectA('');
          setIsCorrectB('true');
          setIsCorrectC('');
          setIsCorrectD('');
        } else {
          setIsCorrectA('');
          setIsCorrectB('false');
          setIsCorrectC('');
          setIsCorrectD('');
        }
      } else if (optionActiveReview === 'C') {
        setIsActiveA(false);
        setIsActiveB(false);
        setIsActiveC(true);
        setIsActiveD(false);

        if (optionCorrectReview) {
          setIsCorrectA('');
          setIsCorrectB('');
          setIsCorrectC('true');
          setIsCorrectD('');
        } else {
          setIsCorrectA('');
          setIsCorrectB('');
          setIsCorrectC('false');
          setIsCorrectD('');
        }
      } else if (optionActiveReview === 'D') {
        setIsActiveA(false);
        setIsActiveB(false);
        setIsActiveC(false);
        setIsActiveD(true);

        if (optionCorrectReview) {
          setIsCorrectA('');
          setIsCorrectB('');
          setIsCorrectC('');
          setIsCorrectD('true');
        } else {
          setIsCorrectA('');
          setIsCorrectB('');
          setIsCorrectC('');
          setIsCorrectD('false');
        }
      }
    }
  });

  let onPressIndex = () => {
    if (from !== 'Result') {
      setVisible(true);
    }
  };

  let onPressNomor = (index: number) => {
    setIsButtonShow(false);
    setIsActiveA(false);
    setIsActiveB(false);
    setIsActiveC(false);
    setIsActiveD(false);
    setVisible(false);
    setNomor(index);
  };

  let onPressKumpul = () => {
    Alert.alert(
      'Mengumpulkan...',
      'Apakah Anda Yakin?',
      [
        {
          text: 'Nanti Dulu',
        },
        {
          text: 'Kumpul',
          onPress: () => {
            setVisible(false);
            navigate('Result', { answers: answers, category: category });
          },
        },
      ],
      { cancelable: false },
    );
  };

  let storeAnswers = () => {
    if (isActiveA) {
      let temp = answers.filter((item) => item.nomorSoal !== nomor + 1);
      let tempAnswers: Answers = [
        ...temp,
        {
          nomorSoal: nomor + 1,
          optionActive: optionActive,
          answer: dataQuestions?.questions[nomor].choices[0].answer,
          correct: dataQuestions?.questions[nomor].choices[0].correct,
        },
      ];
      setAnswers(tempAnswers);
    } else if (isActiveB) {
      let temp = answers.filter((item) => item.nomorSoal !== nomor + 1);
      let tempAnswers: Answers = [
        ...temp,
        {
          nomorSoal: nomor + 1,
          optionActive: optionActive,
          answer: dataQuestions?.questions[nomor].choices[1].answer,
          correct: dataQuestions?.questions[nomor].choices[1].correct,
        },
      ];
      setAnswers(tempAnswers);
    } else if (isActiveC) {
      let temp = answers.filter((item) => item.nomorSoal !== nomor + 1);
      let tempAnswers: Answers = [
        ...temp,
        {
          nomorSoal: nomor + 1,
          optionActive: optionActive,
          answer: dataQuestions?.questions[nomor].choices[2].answer,
          correct: dataQuestions?.questions[nomor].choices[2].correct,
        },
      ];
      setAnswers(tempAnswers);
    } else if (isActiveD) {
      let temp = answers.filter((item) => item.nomorSoal !== nomor + 1);
      let tempAnswers: Answers = [
        ...temp,
        {
          nomorSoal: nomor + 1,
          optionActive: optionActive,
          answer: dataQuestions?.questions[nomor].choices[3].answer,
          correct: dataQuestions?.questions[nomor].choices[3].correct,
        },
      ];
      setAnswers(tempAnswers);
    }
  };

  let onPressA = () => {
    setOptionActive('A');
    setIsButtonShow(true);
    setIsActiveA(!isActiveA);
    setIsActiveB(false);
    setIsActiveC(false);
    setIsActiveD(false);
  };
  let onPressB = () => {
    setOptionActive('B');
    setIsButtonShow(true);
    setIsActiveA(false);
    setIsActiveB(!isActiveB);
    setIsActiveC(false);
    setIsActiveD(false);
  };
  let onPressC = () => {
    setOptionActive('C');
    setIsButtonShow(true);
    setIsActiveA(false);
    setIsActiveB(false);
    setIsActiveC(!isActiveC);
    setIsActiveD(false);
  };
  let onPressD = () => {
    setOptionActive('D');
    setIsButtonShow(true);
    setIsActiveA(false);
    setIsActiveB(false);
    setIsActiveC(false);
    setIsActiveD(!isActiveD);
  };

  let onPressNext = () => {
    storeAnswers();
    if (nomor === 39) {
      setIsActiveA(false);
      setIsActiveB(false);
      setIsActiveC(false);
      setIsActiveD(false);
      setIsButtonShow(false);
    } else {
      setNomor(nomor + 1);
      setIsActiveA(false);
      setIsActiveB(false);
      setIsActiveC(false);
      setIsActiveD(false);
      setIsButtonShow(false);
    }
  };

  if (loadingQuestions) {
    return <Loading />;
  }

  let optionAContainerStyle = [
    isActiveA && styles.activeAnswer,
    isCorrectA === 'true'
      ? styles.correctAnswer
      : isCorrectA === 'false'
      ? styles.falseAnswer
      : null,
    styles.borderBottom,
  ];
  let optionBContainerStyle = [
    isActiveB && styles.activeAnswer,
    isCorrectB === 'true'
      ? styles.correctAnswer
      : isCorrectB === 'false'
      ? styles.falseAnswer
      : null,
    styles.borderBottom,
  ];
  let optionCContainerStyle = [
    isActiveC && styles.activeAnswer,
    isCorrectC === 'true'
      ? styles.correctAnswer
      : isCorrectC === 'false'
      ? styles.falseAnswer
      : null,
    styles.borderBottom,
  ];
  let optionDContainerStyle = [
    isActiveD && styles.activeAnswer,
    isCorrectD === 'true'
      ? styles.correctAnswer
      : isCorrectD === 'false'
      ? styles.falseAnswer
      : null,
    styles.borderBottom,
  ];

  let optionsTextA = [
    isCorrectA === 'true' && styles.activeOptions,
    isCorrectA === 'false' && styles.activeOptions,
    isActiveA && styles.activeOptions,
    styles.options,
  ];

  let optionsTextB = [
    isCorrectB === 'true' && styles.activeOptions,
    isCorrectB === 'false' && styles.activeOptions,
    isActiveB && styles.activeOptions,
    styles.options,
  ];

  let optionsTextC = [
    isCorrectC === 'true' && styles.activeOptions,
    isCorrectC === 'false' && styles.activeOptions,
    isActiveC && styles.activeOptions,
    styles.options,
  ];

  let optionsTextD = [
    isCorrectD === 'true' && styles.activeOptions,
    isCorrectD === 'false' && styles.activeOptions,
    isActiveD && styles.activeOptions,
    styles.options,
  ];

  return (
    <View style={styles.flex}>
      <Portal>
        <Modal
          onDismiss={() => setVisible(false)}
          visible={isVisible}
          contentContainerStyle={styles.modal}
        >
          <View style={[styles.modalTitleContainer, styles.borderBottom]}>
            <Text weight="medium" style={styles.modalTitle}>
              Pertanyaan
            </Text>
            {from !== 'Result' && (
              <TouchableOpacity onPress={onPressKumpul}>
                <Text weight="bold" style={styles.kumpul}>
                  Kumpul
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <FlatList
            style={styles.flex}
            data={dataQuestions?.questions ?? []}
            renderItem={({ index }) => {
              return (
                <View style={styles.modalNomorTextContainer}>
                  <Text
                    style={
                      nomor === index
                        ? styles.activeNomor
                        : styles.paddingHorizontal
                    }
                    onPress={() => {
                      onPressNomor(index);
                    }}
                  >
                    Nomor {index + 1}
                  </Text>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </Modal>
      </Portal>
      <View style={styles.navbar}>
        <View style={styles.backIconContainer}>
          <CountdownTimer from={from} />
        </View>
        <Text weight="medium" style={styles.title}>
          {getParam('paket')}
        </Text>
        <View style={(styles.flex, { justifyContent: 'flex-end' })}>
          <View style={styles.nomorContainer}>
            <Text weight="bold" style={styles.nomorText} onPress={onPressIndex}>
              {nomor + 1} / 40
            </Text>
          </View>
        </View>
      </View>
      <ScrollView style={styles.body}>
        <View style={styles.soalContainer}>
          <Text weight="medium" style={styles.soal}>
            {nomor + 1}. {'    '} {dataQuestions?.questions[nomor].description}
          </Text>
        </View>
        <View style={styles.optionsContainer}>
          <View style={optionAContainerStyle}>
            <TouchableOpacity style={styles.row} onPress={onPressA}>
              <Text weight="medium" style={optionsTextA}>
                A.
              </Text>
              <Text style={optionsTextA}>
                {dataQuestions?.questions[nomor].choices[0].answer}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={optionBContainerStyle}>
            <TouchableOpacity style={styles.row} onPress={onPressB}>
              <Text weight="medium" style={optionsTextB}>
                B.
              </Text>
              <Text style={optionsTextB}>
                {dataQuestions?.questions[nomor].choices[1].answer}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={optionCContainerStyle}>
            <TouchableOpacity style={styles.row} onPress={onPressC}>
              <Text weight="medium" style={optionsTextC}>
                C.
              </Text>
              <Text style={optionsTextC}>
                {dataQuestions?.questions[nomor].choices[2].answer}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={optionDContainerStyle}>
            <TouchableOpacity style={styles.row} onPress={onPressD}>
              <Text weight="medium" style={optionsTextD}>
                D.
              </Text>
              <Text style={optionsTextD}>
                {dataQuestions?.questions[nomor].choices[3].answer}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {isButtonShow ? (
        nomor < 39 ? (
          <View style={styles.buttonContainer}>
            <Button style={styles.buttonStyle} onPress={onPressNext}>
              <Text style={styles.buttonText}>Soal Selanjutnya</Text>
            </Button>
          </View>
        ) : (
          <View style={styles.buttonContainer}>
            <Button style={styles.buttonStyle} onPress={onPressNext}>
              <Text style={styles.buttonText}>Selesai</Text>
            </Button>
          </View>
        )
      ) : null}
      {from === 'Result' && (
        <View style={styles.buttonContainer}>
          <Button
            style={styles.buttonStyle}
            onPress={() => {
              navigate('Result', { answers: answers, category: category });
            }}
          >
            <Text weight="medium" style={styles.buttonText}>
              Kembali ke Halaman Review
            </Text>
          </Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  paddingHorizontal: {
    paddingHorizontal: 16,
  },
  activeAnswer: {
    backgroundColor: COLORS.blue,
  },
  correctAnswer: {
    backgroundColor: COLORS.green,
  },
  falseAnswer: {
    backgroundColor: COLORS.primaryColor,
  },
  activeNomor: {
    paddingHorizontal: 16,
    color: COLORS.primaryColor,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  row: {
    flexDirection: 'row',
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
  soalContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.grey,
  },
  soal: {
    fontSize: FONT_SIZE.large,
  },
  optionsContainer: {},
  activeOptions: {
    paddingLeft: 24,
    maxWidth: 350,
    color: COLORS.white,
  },
  options: {
    paddingLeft: 24,
    maxWidth: 350,
  },
  buttonContainer: {
    marginBottom: 36,
    marginHorizontal: 24,
  },
  buttonStyle: {
    backgroundColor: COLORS.primaryColor,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: FONT_SIZE.medium,
  },
});
