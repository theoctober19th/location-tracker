import React, {Component, useState} from 'react';

import backend from '@api/tnbackend'
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';

import NextArrowButton from '@components/NextArrowButton'

import colors from '@assets/color';
import InputField from '@components/InputField'

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [spinnerActive, setSpinnerActive] = useState(false);

  _onNextButtonPressed = async () => {
    setSpinnerActive(true);
    try{
      const response = await backend.post('/login/', {
          username: email,
          password: password
      });
      if(response.data.key){
        setSpinnerActive(false);
        await AsyncStorage.setItem('signedIn', 'true')
        navigation.navigate('mainNavigator');
      }else{
        Alert.alert('Error', 'Credentials do not match', [{text: 'Okay', onPress: ()=> setSpinnerActive(false)}]);
      }
    }catch(error){
      try{if(error.response.data.non_field_errors[0]){
        Alert.alert('Error', error.response.data.non_field_errors[0], [{text: 'Okay', onPress: ()=> setSpinnerActive(false)}]);
      }}catch(err){
        console.log(err);
      }
    }finally{
    }
  }

  const NextButtonPressed = () => {
    _onNextButtonPressed();
  }



    return(
        <KeyboardAvoidingView style={[styles.container, styles.avoidView]} keyboardVerticalOffset={-500} behavior='padding'>
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.loginText}>Login</Text>
              <InputField
                labelText='USERNAME'
                labelTextSize={14}
                labelTextColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType='email-address'
                customStyle = {{marginBottom:30}}
                textChangeHandler = {email => setEmail(email)}
              />
              <InputField
                labelText='PASSWORD'
                labelTextSize={14}
                labelTextColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType='password'
                customStyle = {{marginBottom:30}}
                textChangeHandler = {password => setPassword(password)}
              />

              <TouchableOpacity
                onPress = {() => navigation.navigate('SignUp')}
              >
                <Text style={styles.labelText}>New User? Click here to register!</Text>
              </TouchableOpacity>

            </ScrollView>
            <View style={styles.nextArrowWrapper}>
              <NextArrowButton
                style={styles.nextArrowButton}
                handleNextButton={_onNextButtonPressed}
              />
            </View>
          </View>
          <Spinner
            visible={spinnerActive}

          />
        </KeyboardAvoidingView>
    );



};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green01
  },
  scrollViewWrapper:{
    marginTop: 70,
    flex: 1,
  },
  avoidView:{
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 20,
    flex: 1,
  },
  loginText:{
    fontSize: 28,
    color: colors.white,
    fontWeight: '300',
    marginBottom: 40
  },
  scrollView:{
    flex:1,
  },
  nextArrowButton:{
    flex: 1
  },
  nextArrowWrapper:{
    marginBottom: 50
  },
  labelText:{
    color: colors.white,
    fontSize: 14
  },
  spinner:{
    position: 'absolute',
    alignSelf: 'center',
    top: 300
  }
});

export default LoginScreen;
