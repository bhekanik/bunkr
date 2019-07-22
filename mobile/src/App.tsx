/**
 * @format
 */

import React from 'react';
import { StyleSheet } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import DashboardScreen from './components/Screens/DashboardScreen';
import InfoCard from './components/Screens/InfoCard';
import LoadingScreen from './components/Screens/LoadingScreen';
import LoginScreen from './components/Screens/LoginScreen';
import SearchScreen from './components/Screens/SearchScreen';
import Firebase from './Firebase';

Firebase.init();

const App = () => {
  return (
    <AppNavigator />
  );
}

const AppSwitchNavigator = createSwitchNavigator({
  InfoCard: InfoCard,
  SearchScreen: SearchScreen,
  LoginScreen: LoginScreen,
  LoadingScreen: LoadingScreen,
  DashboardScreen: DashboardScreen,
})

const AppNavigator = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

export default App;