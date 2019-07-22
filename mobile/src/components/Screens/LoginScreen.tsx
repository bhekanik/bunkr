import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Firebase from '../../Firebase';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Button
        title="Sign In With Google"
        onPress={() => Firebase.signInWithGoogle()}
      />
    </View>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})