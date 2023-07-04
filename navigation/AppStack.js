import { useContext } from 'react';
import { Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/dashboard/dashboard';
import OrderDetailsScreen from '../screens/orders/order-details';
import CreateOrderScreen from '../screens/orders/create-order';
import { AuthContext } from '../context/auth-context';
import TrackingDetailsScreen from '../screens/orders/tracking-details';

const Stack = createStackNavigator();

const AppStack = () => {

    const authContext = useContext(AuthContext);

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
                headerRight: ({ route, navigation }) => (
                    <Button
                        onPress={() => {
                            authContext.signOut(null).then(() => {
                                navigation?.navigate('login');
                            })
                        }}
                        title="Logout"
                        color="#f65610"
                    />
                ),
            }}
        >
            <Stack.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{ title: 'Dashboard', headerLeft: null }}
            />
            <Stack.Screen
                name="Create-Orders"
                component={CreateOrderScreen}
                options={{ title: 'Create Orders' }}
            />
            <Stack.Screen
                name="Orders"
                component={OrderDetailsScreen}
                options={{
                    title: 'Orders'
                }}
            />
            <Stack.Screen
                name="Tracking-Order"
                component={TrackingDetailsScreen}
                options={{
                    title: 'Order History'
                }}
            />
        </Stack.Navigator>
    )
}

export default AppStack;