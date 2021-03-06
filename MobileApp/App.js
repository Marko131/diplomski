/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {Text, AsyncStorage, Button} from 'react-native';
import HomePage from './components/HomePage';
import LoginPage from './components/auth/LoginPage';
import {Router, Stack, Scene} from 'react-native-router-flux';
import RegisterPage from './components/auth/RegisterPage';
const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <Router>
      <Stack key="root">
        <Scene key="home" component={HomePage} hideNavBar={true} />
        <Scene key="login" component={LoginPage} hideNavBar={true} />
        <Scene key="register" component={RegisterPage} hideNavBar={true} />
      </Stack>
    </Router>
  );
};

export default App;
