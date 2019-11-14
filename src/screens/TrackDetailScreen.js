import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import MapComponent from '@components/MapComponent';
import RoundButton from '@components/RoundButton';

import {Context as LocationContext} from '@context/LocationContext';

import useLocation from '@hooks/useLocation';

const TrackDetailScreen = () => {

  const {state, refreshCurrentLocation} = useContext(LocationContext);
  //useLocation(updateCurrentLocation);

  return(
      <View style={styles.global_container}>
        <MapComponent
          style={styles.map}
          latitude={27.668510}
          longitude={85.324069}
        />
        <RoundButton
          onPress = {refreshCurrentLocation}
          iconName = 'location-arrow'
          backgroundColor='magenta'
          iconColor='yellow'
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
  },

});

export default TrackDetailScreen;
