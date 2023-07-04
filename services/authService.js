import AsyncStorage from '@react-native-async-storage/async-storage';

import firebase from "../database/firebasedb";

export default class AuthService {

    getUserDetails = (uuid) => {
        return new Promise(async (resolve, reject) => {
            const ref = firebase.firestore().collection('User-Details');
            await ref.where('userId', '==', uuid)
                .get()
                .then((querySnapshot) => {
                    const userData = querySnapshot.docs
                        .map((doc) => (doc.data()));
                    resolve(userData[0]);
                }).catch((error) => reject(error.message))
        })
    }

    signIn = ({ email, password }) => {
        return new Promise((resolve, reject) => {
          firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(async (res) => {                     
                    const userDetail = await this.getUserDetails(res.user.uid);
                    const userData = {
                        token: res.user?.stsTokenManager?.accessToken,
                        uuid: res.user?.uid,
                        displayName: res.user?.displayName,
                        email: res.user?.email,
                        role: userDetail.role
                    }
                    console.log(userData, "===========userData")
                    AsyncStorage.setItem('@AuthData', JSON.stringify(userData));
                    resolve(userData);
                })
                .catch(error => {
                    reject(error)
                })
        })
    }

    signOut = () => {
        //Remove the data from Async Storage
        return new Promise(async (resolve)=>{
            await AsyncStorage.removeItem('@AuthData');
            resolve(true);
        })
    };
}