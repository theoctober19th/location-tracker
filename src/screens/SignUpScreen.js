import React, {Component, useState} from 'react';
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

import NextArrowButton from '@components/NextArrowButton'
import InputField from '@components/InputField'

import colors from '@assets/color';

export default SignUpScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [spinnerActive, setSpinnerActive] = useState(false);

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
          navigation.navigate('Login');
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

            </ScrollView>
            <View style={styles.nextArrowWrapper}>
              <NextArrowButton
                style={styles.nextArrowButton}
                handleNextButton={_onNextButtonPressed}
              />
            </View>
            < Spinner visible={spinnerActive}/>
          </View>
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
  }
});
