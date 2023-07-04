// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3dGkS3UtL4yfpYnpCacP3jaxqii4Chx0",
  authDomain: "reactnativefbase-1f6ee.firebaseapp.com",
  databaseURL: "https://reactnativefbase-1f6ee.firebaseio.com",
  projectId: "reactnativefbase-1f6ee",
  storageBucket: "reactnativefbase-1f6ee.appspot.com",
  messagingSenderId: "947953035634",
  appId: "1:947953035634:web:7c2710caaee71b114cd5eb",
  measurementId: "G-QMVBV8GLXG"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const db = getFirestore(app);
firebase.firestore();

export default firebase;