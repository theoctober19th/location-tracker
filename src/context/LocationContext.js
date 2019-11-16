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
      const latLng = {
        latitude: action.payload.coords.latitude,
        longitude: action.payload.coords.longitude
      }
      console.log(latLng);
      if(state.recording){
        return {...state, currentLocation: latLng, this_locations: [...state.this_locations, latLng]}
      }else{
        return {...state, currentLocation: latLng}
      }
    case 'start_recording':
      return {...state, recording: true, current_title: action.payload};
    case 'stop_recording':
      return {...state, recording: false, this_locations:[]};
    case 'load_from_device':
      return {...state, locationStore: action.payload}
    default:
      break;
  }
}

const _loadLocationsFromDevice = (dispatch) => async () => {
  try{
    const response = await AsyncStorage.getItem('locations');
    const locations_on_device = response === null ? [] : JSON.parse(response);
    console.log(locations_on_device);
    dispatch({type: 'load_from_device', payload: locations_on_device});
  }catch(error) {
    console.log(error);
  }
}

const startTrackingLocation = dispatch => (title) => {
  dispatch({type: 'start_recording', payload: title})
  Alert.alert(title, 'Tracking has started!')
  Geolocation.watchPosition( position =>  dispatch({type:'refresh_current_location', payload: position }) , (error) => console.log(error));
}

const stopTrackingLocation = dispatch => async (title, new_location) => {
  try{
    const response = await AsyncStorage.getItem('locations');
    const locations_on_device = response === null ? [] : JSON.parse(response);
    const newObj = {
      title: title,
      latLngs: new_location
    }
    const new_locations = [...locations_on_device, newObj];
    await AsyncStorage.setItem('locations', JSON.stringify(new_locations));
  }catch(error) {
    console.log(error);
  }finally{
    dispatch({type: 'stop_recording'});
    Geolocation.stopObserving();
  }
}


const refreshCurrentLocation = dispatch => async () => {
  _requestCurrentLocation(onPermissionFailure, dispatch);
}

// const onLocationSuccess = (position, dispatch) => {
//   //Alert.alert('Location', position.coords.latitude + ', ' + position.coords.longitude);
//   dispatch({type:'refresh_current_location', payload: position });
// }

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
      (position) => dispatch({type:'refresh_current_location', payload: position }),
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
  {refreshCurrentLocation, startTrackingLocation, stopTrackingLocation, _loadLocationsFromDevice},
  //{recording: false, currentLocation: {coords: {latitude: 27.668803, longitude:85.323863}}}
  {current_title: '', this_locations:[], recording: false, currentLocation: {latitude: 37.3230, longitude:-122.0322}, locationStore: []}
)
