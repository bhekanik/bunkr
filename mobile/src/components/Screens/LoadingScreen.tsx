import firebase from 'firebase';
import React, { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const LoadingScreen = (props: { navigation: { navigate: any; }; }) => {
  const navigate = props.navigation.navigate;

  useEffect(() => {
    checkIfLoggedIn();
  }, [])

  const checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        navigate('DashboardScreen')
      } else {
        navigate('LoginScreen')
      }
    })
  }

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  )
}
export default LoadingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})