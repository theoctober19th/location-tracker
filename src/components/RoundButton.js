import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

import colors from '@assets/color';

import Icon from 'react-native-vector-icons/FontAwesome';

const RoundButton = ({onPress, iconName, backgroundColor, iconColor, customstyle}) => {

    return(
        <View style={[styles.container, customstyle]}>
          <TouchableHighlight
            style={[styles.button, {backgroundColor}]}
            onPress={onPress}
          >
            <Icon
              name= {iconName}
              color= {iconColor}
              size={32}
              style={styles.icon}
            />
          </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button:{
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 60,
    height: 60,
  },
  icon: {
    marginRight: -2,
    marginTop: -2,
  }
});

export default RoundButton;
