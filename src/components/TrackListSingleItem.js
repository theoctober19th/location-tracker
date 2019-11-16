import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

const TrackListSingleItem = ({title, onPress}) => {
  return(
      <View style={styles.global_container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress = {onPress}
        >
          <Text style={styles.titleText}> {title} </Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
    margin: 10,
    height: 30,
  },
  touchable:{
    flex:1
  },
  titleText:{
    fontSize: 18,
    margin: 5
  }

});

export default TrackListSingleItem;
