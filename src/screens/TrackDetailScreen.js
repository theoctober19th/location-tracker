import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const TrackDetailScreen = () => {
  return(
      <View style={styles.global_container}>
        <Text> TrackDetailScreen </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackDetailScreen;
