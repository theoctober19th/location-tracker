import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const TrackCreateScreen = () => {
  return(
      <View style={styles.global_container}>
        <Text> TrackCreateScreen </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackCreateScreen;
