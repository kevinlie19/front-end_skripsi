import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'exoflex';
import { COLORS } from '../constants/colors';

type TimeoutID = number;

type Props = {
  from?: string;
};

const UPDATE_RATE = 1000;

const MS = {
  HOUR: 3600000,
  MINUTE: 60000,
  SECONDS: 1000,
};

function getTimeLeft(millisecondsLeft: number) {
  let hoursLeft = Math.floor(millisecondsLeft / MS.HOUR);
  millisecondsLeft -= hoursLeft * MS.HOUR;
  let minutesLeft = Math.floor(millisecondsLeft / MS.MINUTE);
  millisecondsLeft -= minutesLeft * MS.MINUTE;
  let secondsLeft = Math.floor(millisecondsLeft / MS.SECONDS);
  millisecondsLeft -= secondsLeft * MS.SECONDS;

  return {
    hoursLeft,
    minutesLeft,
    secondsLeft,
  };
}

export default function CountdownTimer(props: Props) {
  let { from } = props;
  let [durationLeft, setDurationLeft] = useState(7200000);

  useEffect(() => {
    let updateDuration = () => {
      if (durationLeft === 0) {
        return () => clearInterval(timeout);
      }

      if (from === 'Result') {
        setDurationLeft(0);
      } else {
        setDurationLeft((durationLeft) => Math.max(durationLeft - 1000, 0));
      }
    };

    let timeout: TimeoutID = setInterval(updateDuration, UPDATE_RATE);

    return () => clearInterval(timeout);
  }, [from]);

  let { hoursLeft, minutesLeft, secondsLeft } = getTimeLeft(durationLeft);

  return (
    <View style={styles.countdownContainer}>
      <Text weight="bold" style={styles.text}>
        0{hoursLeft} :{' '}
      </Text>
      <Text weight="bold" style={styles.text}>
        {minutesLeft < 10 ? '0' + minutesLeft : minutesLeft} :
      </Text>
      <Text weight="bold" style={styles.text}>
        {secondsLeft < 10 ? ' 0' + secondsLeft : ' ' + secondsLeft}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  countdownContainer: {
    flexDirection: 'row',
    marginLeft: 8,
    // padding: 10,
    // paddingHorizontal: 20,
    // borderWidth: 1,
    // borderRadius: 5,
    // borderColor: COLORS.primaryColor,
  },
  text: {
    color: COLORS.primaryColor,
    paddingBottom: 2,
  },
});
