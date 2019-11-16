console.disableYellowBox = true;

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

import Icon from 'react-native-vector-icons/FontAwesome'

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
      TrackList: {
        screen: TrackListScreen,
        navigationOptions: {
          title: 'Tracks List'
        }
      },
      TrackDetail: {
        screen: TrackDetailScreen,
        navigationOptions: ({navigation}) => ({
          title: navigation.state.params.title
        })
      }
    }
);

const MainNavigator = createBottomTabNavigator(
  {
    Tracks: {
      screen: TracksNavigator,
      navigationOptions:{
        title: 'Tracks',
        tabBarIcon: <Icon name='list' size={20}/>
      }
    },
    Add: {
      screen: TrackCreateScreen,
      navigationOptions:{
        title: 'Create',
        tabBarIcon: <Icon name='plus' size={20}/>
      }
    },
    Account: {
      screen: AccountScreen,
      navigationOptions:{
        title: 'Account',
        tabBarIcon: <Icon name='user-circle' size={20}/>
      }
    }
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
