import React, {Component, useCallback, useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import TrackListSingleItem from '@components/TrackListSingleItem';
import EmptyView from '@components/EmptyView';

import {useFocusEffect} from 'react-navigation-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import {Context as LocationContext} from '@context/LocationContext';

const TrackListScreen = ({navigation}) => {

  const [locationData, setLocationData] = useState([]);
  const {state, _loadLocationsFromDevice} = useContext(LocationContext);

  useFocusEffect(
    useCallback(() => {
      _loadLocationsFromDevice();
      console.log('I WAS CALLED from LIST')
    }, [])
  );

  if(state.locationStore.length === 0){
    return <EmptyView />
  }else{
    return(
        <View style={styles.global_container}>
              <FlatList
                data={state.locationStore.reverse()}
                keyExtractor={item => (item.title || 'Untitled')}
                renderItem={({item}) => (
                  <TrackListSingleItem
                    title = {item.title || 'Untitled'}
                    onPress={() => navigation.navigate('TrackDetail', {currentLatLng: state.currentLocation, polyLatLngs: item.latLngs, title: item.title==='' ? 'Untitled' : item.title})}
                  />
                )}
              />
        </View>
    );
  }
};



const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackListScreen;
