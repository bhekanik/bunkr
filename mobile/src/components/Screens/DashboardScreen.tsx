import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Dashboad Screen</Text>
    </View>
  )
}
export default DashboardScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})