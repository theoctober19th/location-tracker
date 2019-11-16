import React, {Component, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native';


import colors from '@assets/color'

import AsyncStorage from '@react-native-community/async-storage';
import {Context as AuthContext} from '@context/AuthContext';

import RoundedButton from '@components/RoundedButton';

const AccountScreen = ({navigation}) => {

  const {state} = useContext(AuthContext);

  var profilePic = '';
  var name = '';

  if(state !== null){
    profilePic = state.profilePicture;
  }
  if(state !== null){
    name = state.displayName;
  }

  const _signOut = async () => {
    await AsyncStorage.removeItem('signedIn');
    navigation.navigate('authNavigator');
  }

  return(
      <View style={styles.global_container}>
        <View style={{flex:3, justifyContent: 'flex-end'}} >
          <Image
            source={profilePic === '' ? require('@assets/img/placeholder.jpg') : {uri: profilePic}}
            style={styles.image}
          />
        </View>

        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.nameText}>{name === '' ? 'Hello, Bikalpa!' : name}</Text>
        </View>

        <View style={{flex:2}} >
          <RoundedButton
            textColor='black'
            icon='sign-out'
            text='Sign Out'
            backgroundColor='white'
            onPress={_signOut}
          />
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
  image:{
    height: 200,
    width: 200,
    borderRadius: 100,
    alignSelf: 'center'
  },
  nameText:{
    fontSize: 30,
    fontWeight: 'bold',
  }
});

export default AccountScreen;
