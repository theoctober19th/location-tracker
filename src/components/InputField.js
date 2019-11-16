import React, {Component, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import colors from '@assets/color'

const InputField = ({
  labelText,
  labelTextSize,
  labelTextColor,
  textColor,
  borderBottomColor,
  inputType,
  customStyle,
  placeholder,
  textChangeHandler,
  editable
} ) => {

  const [isSecureInput, setSecureInput] = useState(inputType === 'password');

    const color = labelTextColor || '#000000';
    const fontSize = labelTextSize || 14;
    const inputColor = textColor || colors.white;
    const borderBottom = borderBottomColor || 'transparent'

    const toggleShowPassword = () => {
      setSecureInput(!isSecureInput);
    }

    return(
        <View style={[customStyle, styles.container]}>
          <Text style={[styles.labelText, {color:labelTextColor, fontSize}]}>{labelText}</Text>

          {inputType == 'password' ? (
            <TouchableOpacity
              style={styles.showButton}
              onPress={() => toggleShowPassword()}
            >
              <Text style={styles.showHideText}>
                {isSecureInput ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          ) : null}

          <TextInput
            style={[
              {color: inputColor, borderBottomColor: borderBottom, fontSize},
              styles.inputFieldTextInput
            ]}
            secureTextEntry = {isSecureInput}
            keyboardType = {inputType === 'email-address' ? 'email-address' : 'default'}
            placeholder = {placeholder}
            onChangeText = {textChangeHandler}
            autoCapitalize = 'none'
            autoCorrect = {false}
            editable={editable}
          />
        </View>
    );


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  labelText:{
    fontWeight: '600',
    marginBottom: 10,
    color: colors.white
  },
  inputFieldTextInput:{
    borderBottomWidth: 1,
    paddingTop: 5,
    paddingBottom: 5,
  },
  showButton:{
    position: 'absolute',
    right: 0
  },
  showHideText:{
    fontWeight: '700'
  }
});

export default InputField;
