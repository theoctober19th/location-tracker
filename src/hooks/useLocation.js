// import {useEffect} from 'react'
//
// import {Alert} from 'react-native';
//
// export default async ({callback}) => {
//
//   const onLocationSuccess = (position) => {
//     callback(position);
//   }
//
//   const onLocationError = (error) => {
//     switch(error.code){
//       case 2:
//         Alert.alert('Error', 'You have location services disabled in your settings.');
//         break;
//       default:
//       Alert.alert('Error', 'TODO: Find reason for this error');
//         break;
//     }
//   }
//
//   const onPermissionFailure = (message) => {
//     Alert.alert('Oops !', message);
//   }
//
//   const _getCurrentLocation = async () => {
//     try{
//       Geolocation.getCurrentPosition(
//         onLocationSuccess,
//         onLocationError
//       );
//     }catch(error){
//       Alert.alert('Error', 'You may not have location turned on.')
//     }
//   }
//
//   const _requestCurrentLocation = async(onFailureCallback, dispatch) => {
//     if(Platform.OS === 'android'){
//       try {
//           const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//               'title': 'Location Permission',
//               'message': 'Treasure Nepal needs access to your location'
//             }
//           )
//
//          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//            _getCurrentLocation();
//          } else {
//            onFailureCallback('You can\'t access your current location unless you give the permission')
//          }
//       } catch (err) {
//          console.warn(err)
//       }
//     }else{ //IOS device
//       _getCurrentLocation();
//     }
//   }
//
//   useEffect(() => _requestCurrentLocation(), []);
// }
