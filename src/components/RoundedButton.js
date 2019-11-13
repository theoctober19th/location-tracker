import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import colors from '@assets/color';
import Icon from 'react-native-vector-icons/FontAwesome';

const RoundedButton = ({navigation, text, textColor, backgroundColor, icon, onPress }) => {

    return(
        <View style={styles.container}>
          <TouchableHighlight
            style={[{backgroundColor}, styles.buttonContainer]}
            onPress={onPress}
          >
            <View style={styles.buttonTextWrapper}>
              <Icon name={icon} size = {30} color={textColor} style={styles.icon}/>
              <Text style={[{color: textColor}, styles.buttonText]}>{text}</Text>
            </View>
          </TouchableHighlight>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer:{
    display: 'flex',
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    marginHorizontal: 20
  },
  buttonText:{
    fontSize: 20,
    width: '100%',
    textAlign: 'center'
  },
  buttonTextWrapper:{
    flexDirection: 'row'
  },
  icon:{
    alignSelf: 'flex-start',
    left: 20,
    position: 'absolute',
  }
});

export default RoundedButton;
