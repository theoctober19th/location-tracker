import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const EmptyView = () => {
  return(
      <View style={styles.global_container}>
        <Icon style={styles.icon} size = {50} name='folder-open'/>
        <Text style={styles.text}>There's nothing here!</Text>
        <Text style={styles.text}>Create Tracks to see them here.</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
    justifyContent: 'center'
  },
  icon:{
    alignSelf: 'center'
  },
  text:{
    margin: 20,
    fontSize: 18,
    color: '#455a64',
    alignSelf: 'center'
  }
});

export default EmptyView;
