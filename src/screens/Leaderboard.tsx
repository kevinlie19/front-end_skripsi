import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Leaderboard() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the Leaderboard Scene</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
