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

import {Provider as AuthProvider} from '@context/AuthContext';
import {Provider as LocationProvider} from '@context/LocationContext';

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
    Treasures: {
      screen: TracksNavigator,
    },
    Rewards: TrackCreateScreen,
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

const App =  createAppContainer(rootNavigator);

export default () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <App />
      </LocationProvider>
    </AuthProvider>
  );
}
