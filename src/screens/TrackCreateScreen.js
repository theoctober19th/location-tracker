import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapComponent from '@components/MapComponent';

const TrackCreateScreen = () => {
  return(
      <View style={styles.global_container}>
        <MapComponent />
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackCreateScreen;
