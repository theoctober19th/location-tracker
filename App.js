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

const AuthNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
    },
    SignUp: SignUpScreen
  },
  {
    initialRouteName: 'Login'
  }
);

const TracksNavigator = createStackNavigator(
    {
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen
    }
);

const MainNavigator = createBottomTabNavigator(
  {
    tracksNavigator: TracksNavigator,
    TrackCreate: TrackCreateScreen,
    Account: AccountScreen,
  }
);

const rootNavigator = createSwitchNavigator(
  {
    Loading: AuthLoadingScreen,
    authNavigator: AuthNavigator,
    mainNavigator: MainNavigator,
  },
  {
    initialRouteName: 'Loading'
  }
);

export default createAppContainer(rootNavigator);
