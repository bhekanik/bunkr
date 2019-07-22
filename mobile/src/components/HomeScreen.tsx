/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import firebase from 'firebase';
import { Button, Container, Content, Header, Icon, Input, Item, List, ListItem, Text } from 'native-base';
import React, { useEffect, useState } from 'react';
import { ListView, StatusBar, StyleSheet } from 'react-native';
import Firebase from '../Firebase';

export default function HomeScreen(props: any) {
  useEffect(() => {
    Firebase.init();

    firebase.database().ref('/contacts').on('child_added', (data) => {
      const newData = [...state.listViewData];
      newData.push(data);
      setState({...state, listViewData: newData})
    })
  }, [])

  const {navigate} = props.navigation;

  const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  const [state, setState] = useState({
    listViewData: [],
    newContact: ""
  })

  const addRow = (newContact: string) => {
    const key = firebase.database().ref('/contacts').push().key;
    firebase.database().ref('/contacts').child(key).set({name: newContact});
  }

  const deleteRow = async (secId, rowId, rowMap, data): Promise<void> => {
    await firebase.database().ref(`contacts/${data.key}`).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...state.listViewData];
    newData.splice(rowId, 1);
    setState({ ...state, listViewData: newData });
  }

  const showInformation = () => {

  }

  return (
    <Container style={styles.container}>
      <Header style={{ marginTop: StatusBar.currentHeight }}>
        <Content>
          <Item>
            <Input
              onChangeText={newContact => setState({...state, newContact})}
              placeholder="Add name"
            />
            <Button onPress={() => addRow(state.newContact)}>
              <Icon name="add" />
            </Button>
          </Item>
        </Content>
      </Header>
      <Content>
        <List
          enableEmptySections
          dataSource={ds.cloneWithRows(state.listViewData)}
          renderRow={data =>
            <ListItem>
              <Text>{data.val().name}</Text>
            </ListItem>
          }
          renderLeftHiddenRow={data =>
            <Button full onPress={() => showInformation(data)}>
              <Icon name="information-circle" />
            </Button>
          }
          renderRightHiddenRow={(data, secId, rowId, rowMap) =>
            <Button full danger onPress={() => deleteRow(secId, rowId, rowMap, data)}>
              <Icon name="trash" />
            </Button>
          }
          leftOpenValue={-75}
          rightOpenValue={-75}
        >
        </List>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  }
});
