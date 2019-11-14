import React, {Component, useState, useContext} from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';

// Keystore location /Users/bikalpa/Documents/Lab/ReactNative/LocationTracker/android/app/debug.keystore

import AsyncStorage from '@react-native-community/async-storage';

import Spinner from 'react-native-loading-spinner-overlay';
import {Context as AuthContext} from '@context/AuthContext';

import RoundButton from '@components/RoundButton'

import colors from '@assets/color';
import InputField from '@components/InputField'

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigninInProgress, setSignInProgress] = useState(false);

  const _onNextButtonPressed = async () => {
    if(email === '' || password === ''){
      onFailure('Fields cannot be blank.')
    }else{
      emailLogin(email, password, onSuccess, onFailure);
    }
  }

  const onSuccess = () => {
    AsyncStorage.setItem('signedIn', 'true');
    navigation.navigate('Account');
  }

  const onFailure = (message) => {
    Alert.alert('Error', message.toString(), [{text: 'Okay', onPress: ()=> setSignInProgress(false)}])
  }

  const {state, googleLogin, facebookLogin, emailLogin} = useContext(AuthContext);

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
                style={styles.loginRedirectText}
              >
                <Text style={styles.labelText}>New User? Click here to register!</Text>
              </TouchableOpacity>

              <View style={styles.socialMediaButtonWrappers}>
                <RoundButton
                  onPress={() => {
                    setSignInProgress(true);
                    googleLogin(onSuccess, onFailure);
                  }}
                  iconName='google'
                />

                <RoundButton
                  onPress={() => {
                    setSignInProgress(true);
                    facebookLogin(onSuccess, onFailure);
                  }}
                  iconName='facebook'
                />
              </View>
            </ScrollView>
            <View style={styles.nextArrowWrapper}>
              <RoundButton
                onPress={() => {
                  setSignInProgress(true);
                  _onNextButtonPressed();
                }}
                iconName='angle-right'
              />
            </View>
          </View>
          <Spinner
            visible={isSigninInProgress}

          />
        </KeyboardAvoidingView>
    );
};

LoginScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green01
  },
  scrollViewWrapper:{
    marginTop: 100,
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
    flex:1,
  },
  nextArrowButton:{
    flex: 1
  },
  nextArrowWrapper:{
    marginBottom: 20,
    alignItems: 'flex-end'
  },
  labelText:{
    color: colors.white,
    fontSize: 14
  },
  spinner:{
    position: 'absolute',
    alignSelf: 'center',
    top: 300
  },
  socialMediaButtonWrappers:{
    marginTop: 60,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginRedirectText:{
  },
});

export default LoginScreen;
