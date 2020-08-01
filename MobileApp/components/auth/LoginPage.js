import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Logo from './Logo';
import Config from 'react-native-config';
import {api_url} from '../config/Config';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (email === '') {
      ToastAndroid.show('Email is required !', ToastAndroid.SHORT);
      return;
    }
    if (password === '') {
      ToastAndroid.show('Password is required !', ToastAndroid.SHORT);
      return;
    }
    setLoading(true);
    Axios.post(`${api_url}/login`, {
      email: email,
      password: password,
    })
      .then(response => {
        AsyncStorage.setItem('access_token', response.data)
          .then(() => {
            Actions.replace('home');
            setLoading(false);
          })
          .catch(error => alert(error));
      })
      .catch(error => {
        ToastAndroid.show(
          'Email or password is incorrect !',
          ToastAndroid.SHORT,
        );
        setLoading(false);
      });
  };
  return (
    <View style={styles.container}>
      <Logo />

      <View style={styles.inputContainer}>
        <Icon style={styles.placeholderIcon} name="mail" size={25} />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={value => setEmail(value)}
          style={styles.input}
          placeholderTextColor="#aaaaaa"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon style={styles.placeholderIcon} name="lock" size={25} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={value => setPassword(value)}
          style={styles.input}
          placeholderTextColor="#aaaaaa"
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity
        onPress={login}
        style={styles.loginButton}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerContainer}
        onPress={() => Actions.push('register')}>
        <Text style={styles.registerText}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#353535',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderIcon: {
    color: 'rgb(0, 190, 90)',
    marginRight: 10,
  },
  input: {
    color: 'white',
    fontSize: 18,
    marginVertical: 5,
    borderBottomColor: 'rgb(0, 190, 90)',
    borderTopColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderWidth: 1,
    width: '60%',
  },
  loginButton: {
    marginTop: 40,
    backgroundColor: 'rgb(0, 190, 90)',
    width: '70%',
    paddingVertical: 10,
    borderRadius: 25,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  registerContainer: {marginTop: 30, borderRadius: 20},
  registerText: {
    color: 'white',
    fontSize: 15,
    padding: 6,
  },
});

export default LoginPage;
