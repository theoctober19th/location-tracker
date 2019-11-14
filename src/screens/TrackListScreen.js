import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert
} from 'react-native';

const TrackListScreen = ({navigation}) => {
  return(
      <View style={styles.global_container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('TrackDetail')}>
            <Text> TrackListScreen </Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackListScreen;
