import { useEffect, useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../services/authService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const authService = new AuthService();
    const [authData, setAuthData] = useState(null);

    //The loading part will be explained in the persist step session
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadStorageData();
    }, [])


    async function loadStorageData() {
        try {
            //Try get the data from Async Storage
            console.log('askdjkasjdjsakjdj')
            const authDataSerialized = await AsyncStorage.getItem('@AuthData');
            if (authDataSerialized) {
                //If there are data, it's converted to an Object and the state is updated.
                const _authData = JSON.parse(authDataSerialized);
                setAuthData(_authData);
            }
        } catch (error) {
        } finally {
            //loading finished
            setLoading(false);
        }
    }

    function signIn({ email, password }) {
        //call the service passing credential (email and password).
        return new Promise((resolve, reject) => {
            authService.signIn({email: email, password: password}).then((data) => {
                setAuthData(data);
                resolve(true);
            }).catch((error) => {
                reject(error);
            })
        })
    }

    function signOut() {
        return new Promise((resolve) => {
            authService.signOut().then(() => {
                setAuthData(null);
                AsyncStorage.removeItem('@AuthData');
                resolve(true);
            })
        })
    }

    return (
        <AuthContext.Provider value={{authData, setAuthData, loading, setLoading, signIn, signOut}} >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;


