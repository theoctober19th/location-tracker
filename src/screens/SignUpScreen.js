import React, {Component, useState} from 'react';
import { GoogleSignin, GoogleSigninButton, statusCodes, } from '@react-native-community/google-signin';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';

import AsyncStorage from '@react-native-community/async-storage';
import backend from '@api/tnbackend';

import RoundButton from '@components/RoundButton'
import InputField from '@components/InputField'

import colors from '@assets/color';

export default SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [googleUserInfo, setGoogleUserInfo] = useState(null);

  _onNextButtonPressed = async () => {
    if(username==="" || email==="" || password==="" || password2===""){
      Alert.alert('Error', 'The fields cannot be blank.');
    }else if(password !== password2){
      Alert.alert('Error', 'The two passwords do not match.');
    }else{
      setSpinnerActive(true);
      try{
        const response = await backend.post('/registration/', {
            email: email,
            username: username,
            password1: password,
            password2: password2,
        });
        if(response.data.key){
          setSpinnerActive(false);
          await AsyncStorage.setItem('signedIn', 'true')
          navigation.goBack();
        }else{
          Alert.alert('Error', 'Credentials do not match', [{text: 'Okay', onPress: ()=> setSpinnerActive(false)}]);
        }
      }catch(error){
        const data = error.response.data;
        var message = 'Invalid Credentials';
        if(data.username){
          message = data.username[0];
        }else if(data.email){
          message = data.email[0];
        }
          Alert.alert('Error', message, [{text: 'Okay', onPress: ()=> setSpinnerActive(false)}]);
      }
    }
  }

  _signInFacebook = async () => {
    console.log('Facebook Tapped');
  }

  _signInGoogle = async () => {
    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setGoogleUserInfo(userInfo);
      console.log(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  }



    return(
        <KeyboardAvoidingView
          style={[styles.container, styles.avoidView]}
          keyboardVerticalOffset={-500}
          behavior='padding'
        >
          <View style={styles.scrollViewWrapper}>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.loginText}>Register</Text>
              <InputField
                labelText='EMAIL'
                labelTextSize={14}
                labelTextColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType='email-address'
                customStyle = {{marginBottom:30}}
                textChangeHandler = {email => setEmail(email)}
              />
              <InputField
                labelText='USERNAME'
                labelTextSize={14}
                labelTextColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType='text'
                customStyle = {{marginBottom:30}}
                textChangeHandler = {username => setUsername(username)}
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
              <InputField
                labelText='CONFIRM PASSWORD'
                labelTextSize={14}
                labelTextColor={colors.white}
                textColor={colors.white}
                borderBottomColor={colors.white}
                inputType='password'
                customStyle = {{marginBottom:30}}
                textChangeHandler = {password2 => setPassword2(password2)}
              />

              <TouchableOpacity
                onPress = {() => navigation.navigate('Login')}
              >
                <Text style={styles.labelText}>Already have an account? Click here to Login!</Text>
              </TouchableOpacity>

              <View style={styles.socialMediaButtonWrappers}>
                <RoundButton
                  onPress={_signInGoogle}
                  iconName='google'
                />

                <RoundButton
                  onPress={_signInFacebook}
                  iconName='facebook'
                />
              </View>

            </ScrollView>
            <View style={styles.nextArrowWrapper}>
              <RoundButton
                style={styles.nextArrowButton}
                onPress={_onNextButtonPressed}
                iconName='angle-right'
              />
            </View>
            < Spinner visible={spinnerActive}/>
          </View>
        </KeyboardAvoidingView>
    );



};

SignUpScreen.navigationOptions = {
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: colors.green01
  },
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green01
  },
  scrollViewWrapper:{
    marginTop: 10,
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
    fontWeight: '400',
    marginBottom: 40
  },
  scrollView:{
    flex: 1,
  },
  nextArrowButton:{
    flex: 1
  },
  nextArrowWrapper:{
    marginBottom: 20,
    alignSelf: 'flex-end'
  },
  labelText:{
    color: colors.white,
    fontSize: 14
  },
  socialMediaButtonWrappers:{
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
