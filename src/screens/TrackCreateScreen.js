import React, {Component, useContext, useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert
} from 'react-native';


import { useFocusEffect } from 'react-navigation-hooks';

//import MapComponent from '@components/MapComponent';
import RoundButton from '@components/RoundButton';
import AddTrackForm from '@components/AddTrackForm';

import {Context as LocationContext} from '@context/LocationContext';
import colors from '@assets/color';

import AsyncStorage from '@react-native-community/async-storage';

import useLocation from '@hooks/useLocation';

import MapView, {PROVIDER_GOOGLE, Polyline, Circle, Marker} from 'react-native-maps';

const TrackCreateScreen = ({navigation}) => {

  const {state, refreshCurrentLocation, startTrackingLocation, stopTrackingLocation} = useContext(LocationContext);
  const [title, setTitle] = useState('');
  //useLocation(updateCurrentLocation);
  useFocusEffect(
    useCallback(() => {
      refreshCurrentLocation();
      console.log('I WAS CALLED from CREATE')
    }, [])
  );

  return(
      <View style={styles.global_container}>

        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          showsUserLocation
          followsUserLocation
          initialRegion={
            {
              latitude: 27.668510,
              longitude: 85.324069,
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
            coordinates={state.this_locations}
          />
        </MapView>

        <View style={styles.formComponent}>
          <AddTrackForm
            editable={!state.recording}
            onChangeText={setTitle}
          />
        </View>
        <RoundButton
          customstyle={styles.button}
          onPress = {state.recording ? () => {stopTrackingLocation(title, state.this_locations); Alert.alert(title, 'Tracking succesfully saved!'); } : () => startTrackingLocation(title)}
          iconName = {state.recording ? 'stop' : 'play'}
          backgroundColor={state.recording? colors.red : colors.green01}
          iconColor={colors.white}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
  map:{
    flex:4
  },
  formComponent:{
    flex:2
  },
  button:{
    position: 'absolute',
    bottom: 0,
    right: 0
  }

});

export default TrackCreateScreen;
