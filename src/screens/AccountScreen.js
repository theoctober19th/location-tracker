import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

const AccountScreen = () => {
  return(
      <View style={styles.global_container}>
        <Text> AccountScreen </Text>
      </View>
  );
};

const styles = StyleSheet.create({
  global_container: {
    flex: 1,
  },
});

export default AccountScreen;
