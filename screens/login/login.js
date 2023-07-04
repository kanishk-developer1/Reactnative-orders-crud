import { React, useContext, useState } from 'react';
import { View, TextInput, StyleSheet, Button, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from '../../database/firebasedb';
import { AuthContext } from '../../context/auth-context';
import AuthService from '../../services/authService';

const LoginScreen = ({ navigation }) => {
    const authService = new AuthService();
    const authContext = useContext(AuthContext);

    const loginInitialState = {
        email: '',
        password: '',
        isLoading: false
    }
    const [loginState, setLoginState] = useState(loginInitialState);

    const updateStateVal = (val, prop) => {
        setLoginState({ ...loginState, [prop]: val });
    }

    const onSubmitLogin = () => {
        if (!loginState.email || !loginState.password) {
            Alert.alert(`Fields Shouldn't be Empty!`);
        } else {
            authContext.setLoading(true);
            //setLoginState({ ...loginState, isLoading: true });
            firebase
                .auth()
                .signInWithEmailAndPassword(loginState.email, loginState.password)
                .then(async (res) => {
                    console.log('User logged-in successfully!')
                    const userDetail = await authService.getUserDetails(res.user.uid);
                    const userData = {
                        uuid: res.user?.uid,
                        displayName: res.user?.displayName,
                        email: res.user?.email,
                        role: userDetail.role
                    }
                    console.log(userData, "===========userData")
                    AsyncStorage.setItem('@AuthData', JSON.stringify(userData));
                    authContext.setAuthData(userData);
                    navigation.navigate('Dashboard')
                })
                .catch(error => Alert.alert(error.message))
                .finally(() => authContext.setLoading(false))



        //     authContext.signIn({email: loginState.email, password: loginState.password})
        //     .then(() => { 
        //         console.log('reahed here')
        //         /*navigation.navigate('Dashboard')*/
        // })
        //     .error((error) => {
        //         console.log(error,"======errr")
        //         Alert.alert(error)
        //     }) 
        //     .finally(() => authContext.setLoading(false))
        }
    }

    return (
        authContext.loading ?
            <View style={styles.preloader}>
                <ActivityIndicator size="large" color="#9E9E9E" />
            </View>
            :
            <View
                style={styles.container}
            >
                <TextInput
                    placeholder='Email'
                    style={styles.inputStyle}
                    value={loginState.email}
                    onChangeText={(val) => updateStateVal(val, 'email')}
                ></TextInput>
                <TextInput
                    placeholder='Password'
                    style={styles.inputStyle}
                    value={loginState.password}
                    onChangeText={(val) => updateStateVal(val, 'password')}
                    secureTextEntry>
                </TextInput>
                <Button
                    color="#f65610"
                    title="Signin"
                    onPress={onSubmitLogin}
                />
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
})

export default LoginScreen;