import { React } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/login/login';

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#f65610',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: 'Login',
          }}
        />
      </Stack.Navigator>
    )
  }

export default AuthStack;