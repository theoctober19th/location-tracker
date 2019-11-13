import createDataContext from '@context/createDataContext'

import { LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  TouchableOpacity,
} from 'react-native';

import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import backend from '@api/tnbackend'
import User from '@models/User'

const authReducer = (state, action) => {
  switch (action.type) {
    case 'google_login':
    case 'facebook_login':
    case 'email_login':
      return action.payload;
    default:
      return state;
  }
};

const googleLogin = (dispatch) => {
  return async (onSuccess, onFailure) => {

    GoogleSignin.configure();
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if(userInfo.user !== null){

        //TODO Authenticate with Backend Logic

        var user = new User(userInfo.user.id, userInfo.user.name, userInfo.user.photo);
        dispatch({type: 'google_login', payload: user});

        onSuccess();
      }
    } catch (error) {
      onFailure(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }finally{
    }

  }
}

const emailLogin = (dispatch) => {
  return async (email, password, onSuccess, onFailure) => {

    try{
      const response = await backend.post('/login/', {
          username: email,
          password: password
      });
      if(response.data.key){
        onSuccess();
      }else{
        onFailure('Credentials do not match');
      }
    }catch(error){
      onFailure(error.toString());
    }finally{
      console.log('yo ta chalyo chalyo')
    }
  }
}

const _fbResponseCallback = (error, result, onSuccess, onFailure, dispatch) => {
  if (error) {
    onFailure(error)
  } else {
    console.log(result);

    var user = new User(result.id, result.name, result.picture.data.url);
    dispatch({type: 'facebook_login', payload:user});

    onSuccess();
    //this.setState({name: result.name, pic: result.picture.data.url});
  }
}

const facebookLogin = (dispatch) => {
  return async (onSuccess, onFailure) => {

    try{
      // Attempt a login using the Facebook login dialog asking for default permissions.
      LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            onFailure('Login Cancelled');
          } else {
            AccessToken.getCurrentAccessToken().then(
              (data) => {
                const infoRequest = new GraphRequest(
                  '/me?fields=name,picture.width(200)',
                  null,
                  (error, result) => _fbResponseCallback(error, result, onSuccess, onFailure, dispatch)
                );
                new GraphRequestManager().addRequest(infoRequest).start();
              }
            )
          }
        },
        function(error) {
          onFailure(error);
        }
      );
    } catch(error) {
      onFailure(error);
    } finally{
    }
  }
}



export const {Context, Provider} = createDataContext(
  authReducer,
  {googleLogin, facebookLogin, emailLogin},
  null
);
