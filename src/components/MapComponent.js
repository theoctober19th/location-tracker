import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapView from 'react-native-maps';

const MapComponent = ({}) => {
  return(
      <View style={styles.global_container}>
        <MapView
          style={styles.map}
          initialRegion={
            {
              latitude: 27.668546,
              longitude: 85.324044,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          }
        />
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
  map:{
    flex:1
  }

});

export default MapComponent;
