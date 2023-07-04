import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/auth-context';

export default function NavigationRouter() {
  const authContext = useContext(AuthContext);

    return (
      <NavigationContainer>
       {authContext.authData ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    );
  }