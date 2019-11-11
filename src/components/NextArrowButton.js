import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import colors from '@assets/color';

import Icon from 'react-native-vector-icons/FontAwesome';

const NextArrowButton = ({handleNextButton}) => {

    return(
        <View style={styles.container}>
          <TouchableHighlight
            style={[styles.button]}
            onPress={handleNextButton}
          >
            <Icon
              name= 'angle-right'
              color= {colors.green01}
              size={32}
              style={styles.icon}
            />
          </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    bottom: 20,
    paddingTop: 0
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
    backgroundColor: colors.white
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  }
});

export default NextArrowButton;
