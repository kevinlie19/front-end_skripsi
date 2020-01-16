import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AvatarCollection() {
  return (
    <View style={styles.container}>
      <Text>Welcome to the AvatarCollection Scene</Text>
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
