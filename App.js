import React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
//import {} from 'react-navigation-switch';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import LoginScreen from '@screens/LoginScreen';
import SignUpScreen from '@screens/SignUpScreen';
import TrackListScreen from '@screens/TrackListScreen';
import TrackDetailScreen from '@screens/TrackDetailScreen';
import TrackCreateScreen from '@screens/TrackCreateScreen';
import AccountScreen from '@screens/AccountScreen';
import AuthLoadingScreen from '@screens/AuthLoadingScreen';

const rootNavigator = createSwitchNavigator(
  {
    Loading: AuthLoadingScreen,
    authNavigator: createStackNavigator(
      {
        Login: LoginScreen,
        SignUp: SignUpScreen
      },
      {
        headerMode: 'none',
        initialRouteName: 'Login'
        // navigationOptions:{
        //   headerShown: false
        // }
      }
    ),
    mainNavigator: createBottomTabNavigator(
      {
        tracksNavigator: createStackNavigator(
            {
              TrackList: TrackListScreen,
              TrackDetail: TrackDetailScreen
            }
        ),
        TrackCreate: TrackCreateScreen,
        Account: AccountScreen,
      }
    )
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(rootNavigator);
