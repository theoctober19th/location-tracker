import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const TrackListScreen = ({navigation}) => {

  logout = async () => {
    try{
      await AsyncStorage.removeItem('signedIn');
      navigation.navigate('authNavigator');
    }catch(error){
      console.log(error);
    }
  }


  return(
      <View style={styles.global_container}>
        <TouchableOpacity onPress={() => logout()}><Text> TrackListScreen </Text></TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default TrackListScreen;
