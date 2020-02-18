import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'exoflex';

export default function Loading() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
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
