import { Button, Container, Form, Input, Item, Label } from 'native-base';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import Firebase, { User } from '../Firebase';

const LoginScreen = (props: any) => {
  const [err, setErr] = useState({
    emailErr: '',
    passwordErr: ''
  })
  const [user, setUser] = useState({
    email: '',
    password: ''
  });
  const [authStateReported, setAuthStateReported] = useState(false);

  const {navigate} = props.navigation;


  useEffect(() => {
    Firebase.init();

    Firebase.auth.onAuthStateChanged((user: firebase.User) => {
      setAuthStateReported(true);
      console.log(user)
    })
  }, [])

  const signup = async (user: User): Promise<void> => {
    try {
      if (user.password.length < 6) {
        setErr({ ...err,  passwordErr: "Password should be atleast 6 characters long"});
        return;
      }
      const result = await Firebase.signUp(user);
      console.log(result)
    } catch (error) {
      setErr({ ...err,  passwordErr: error});
    }
  };

  const login = async (user: User): Promise<void> => {
    try {
      if (user.password.length < 6) {
        setErr({ ...err,  passwordErr: "Password should be atleast 6 characters long"});
        return;
      }
      const result = await Firebase.signIn(user);
      console.log(result)
    } catch (error) {
      setErr({ ...err,  passwordErr: error});
    }
  };

  return (
    <Container style={styles.container} >
      <Form>
        {err.emailErr != '' && <Text style={styles.errors}>{err.emailErr}</Text>}
        {err.passwordErr != '' && <Text style={styles.errors}>{err.passwordErr}</Text>}
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email) => setUser({...user, email})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password) => setUser({...user, password})}
          />
        </Item>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          success
          onPress={() => login(user)}
        >
          <Text style={{ color: 'white' }}>Login</Text>
        </Button>
        <Button
          style={{ marginTop: 10 }}
          full
          rounded
          primary
          onPress={() => signup(user)}
        >
          <Text style={{ color: 'white' }}>Signup</Text>
        </Button>
      </Form>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10
  },
  errors: {
    color: 'red',
    backgroundColor: 'rgba(255, 0, 0, 0.1)',
    borderColor: 'red',
    borderWidth: 1,
    borderStyle: 'solid',
    padding: 10,
    textAlign: 'center'
  }
})

export default LoginScreen
