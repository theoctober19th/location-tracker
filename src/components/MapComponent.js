//AIzaSyAlDlqn2Xr3tRUKkf5CFr-a5Vglc1TL1N4
import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Polyline, Circle, Marker} from 'react-native-maps';
import {Context as LocationContext} from '@context/LocationContext';

const points = [
  {latitude:27.670012, longitude:85.323687},
  {latitude:27.669194, longitude:85.323340},
  {latitude:27.668889, longitude:85.324020},
  {latitude:27.670012, longitude:85.323687},
]

const MapComponent = ({latitude, longitude, styleprop}) => {
  const {state} = useContext(LocationContext);

  return(
      <View style={styleprop}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={StyleSheet.absoluteFill}
          showsUserLocation
          followsUserLocation
          initialRegion={
            {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          }
          region={
            {
              latitude: state.currentLocation.latitude,
              longitude: state.currentLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01
            }
          }
        >
          <Polyline
            coordinates={state.locations}
          />
        </MapView>
      </View>
  );
};

const styles = StyleSheet.create({

});

export default MapComponent;
