import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MapComponent from '@components/MapComponent';
import RoundButton from '@components/RoundButton';

import {Context as LocationContext} from '@context/LocationContext';

import MapView, {PROVIDER_GOOGLE, Polyline, Circle, Marker} from 'react-native-maps';

import useLocation from '@hooks/useLocation';

const TrackDetailScreen = ({navigation}) => {

  const polyLatLngs = navigation.getParam('polyLatLngs', [{latitude:27.668510, longitude:85.324069}]);
  const currentLatLng = navigation.getParam('currentLatLng', {latitude:27.668510, longitude:85.324069});

  const {state, refreshCurrentLocation} = useContext(LocationContext);
  //useLocation(updateCurrentLocation);

  return(
      <View style={styles.global_container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={
            {
              latitude: polyLatLngs[polyLatLngs.length-1].latitude,
              longitude: polyLatLngs[polyLatLngs.length-1].longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          }
        >
          <Polyline
            coordinates={polyLatLngs}
          />
        </MapView>
      </View>
  );
};

TrackDetailScreen.navigationOptions = ({navigation}) => {
  return {
    title: "hello"
  }
}

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
  map:{
    flex:1
  }

});

export default TrackDetailScreen;
