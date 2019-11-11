import React, {Component, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import colors from '@assets/color';

const AuthLoadingScreen = ({navigation}) => {

  _bootStrapAsync = async () => {
    try{
      const signedIn = await AsyncStorage.getItem('signedIn');
      navigation.navigate(signedIn? 'mainNavigator' : 'authNavigator')
    }catch(error){
      console.log(error);
    }
  }

  useEffect( () => {
    _bootStrapAsync()
  }, [])

  return(
      <View style={styles.global_container}>
        <ActivityIndicator color='white' size='large'/>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
    backgroundColor: colors.green01,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default AuthLoadingScreen;
