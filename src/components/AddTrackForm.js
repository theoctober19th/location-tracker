import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import InputField from '@components/InputField';

import colors from '@assets/color';
const AddTrackForm = ({editable, onChangeText}) => {
  return(
      <View style={styles.global_container}>
        <InputField
        textColor={'#000000'}
        borderBottomColor={colors.white}
        inputType = 'text'
        customStyle = {{margin:30}}
        borderBottomColor = 'black'
        labelTextSize={20}
        placeholder='Enter a title'
        editable={editable}
        textChangeHandler={onChangeText}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex:1,
  },
});

export default AddTrackForm;
