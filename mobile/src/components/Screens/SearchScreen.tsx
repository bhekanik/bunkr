import { Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, TextInput, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Ionicons';

const listItems = ['Development', 'Business', 'IT & Software', 'Office Productivity', 'Personal Development', 'Design', 'Marketing', 'Lifestyle', 'Photography', 'Health & Fitness', 'Teacher Training', 'Music']

const SearchScreen = () => {
  const [state, setState] = useState({
    searchBarFocused: false
  })

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)
  }, [])

  const keyboardDidShow = () => {
    setState({searchBarFocused: true})
  }

  const keyboardDidHide = () => {
    setState({searchBarFocused: false})
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 80, backgroundColor: "#c45653", justifyContent: 'center', paddingHorizontal: 10 }}>
        <Animatable.View animation="slideInRight" duration={500} style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Animatable.View animation={state.searchBarFocused ? "fadeInLeft" : "fadeInRight"} duration={400}>
            <Icon name={state.searchBarFocused ? "md-arrow-back" : "ios-search"} style={{ fontSize: 24 }} />
          </Animatable.View>
          <TextInput placeholder="Search" style={{ fontSize: 16, marginLeft: 15, flex: 1 }} />
        </Animatable.View>
      </View>
      <FlatList
        style={{ backgroundColor: state.searchBarFocused ? 'rgba(0,0,0,.3)' : 'white' }}
        data={listItems}
        renderItem={({item}) => <Text style={{ padding: 20, fontSize: 20 }}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
        />

    </View>
  )
}

export default SearchScreen
