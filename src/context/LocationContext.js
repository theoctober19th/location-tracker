import createDataContext from '@context/createDataContext';
import {PermissionsAndroid, Platform} from 'react-native';

import {
  Alert
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

const locationReducer = (state, action) => {
  switch(action.type){
    case 'refresh_current_location':
      return {...state, currentLocation: action.payload};
    default:
      break;
  }
}

const refreshCurrentLocation = dispatch => async () => {
  _requestCurrentLocation(onPermissionFailure, dispatch);
}

const onLocationSuccess = (position, dispatch) => {
  //Alert.alert('Location', position.coords.latitude + ', ' + position.coords.longitude);
  dispatch({type:'refresh_current_location', payload: position });
}

const onLocationError = (error) => {
  switch(error.code){
    case 2:
      Alert.alert('Error', 'You have location services disabled in your settings.');
      break;
    default:
    Alert.alert('Error', 'TODO: Find reason for this error');
      break;
  }
}

const onPermissionFailure = (message) => {
  Alert.alert('Oops !', message);
}

const _getCurrentLocation = async (dispatch) => {
  try{
    Geolocation.getCurrentPosition(
      (position) => onLocationSuccess(position, dispatch),
      onLocationError
    );
  }catch(error){
    Alert.alert('Error', 'You may not have location turned on.')
  }
}

const _requestCurrentLocation = async(onFailureCallback, dispatch) => {
  if(Platform.OS === 'android'){
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            'title': 'Location Permission',
            'message': 'Treasure Nepal needs access to your location'
          }
        )

       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
         _getCurrentLocation(dispatch);
       } else {
         onFailureCallback('You can\'t access your current location unless you give the permission')
       }
    } catch (err) {
       console.warn(err)
    }
  }else{ //IOS device
    _getCurrentLocation(dispatch);
  }
}

export const {Context, Provider} = createDataContext(
  locationReducer,
  {refreshCurrentLocation},
  {currentLocation: {coords: {latitude: 27.668803, longitude:85.323863}}}
)
