
import { initializeApp, getApp, getApps } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



// UPDATE THIS WITH YOUR PROJETC SPECIFIC
var firebaseConfig = {
    apiKey: "AIzaSyBquUhiOVNui6i4rYF6Vxrw6SZ6YrEIJR8",
    authDomain: "swiftdelivery-8eaf0.firebaseapp.com",
    databaseURL: "https://swiftdelivery-8eaf0-default-rtdb.firebaseio.com",
    projectId: "swiftdelivery-8eaf0",
    storageBucket: "swiftdelivery-8eaf0.appspot.com",
    messagingSenderId: "1002850770413",
    appId: "1:1002850770413:web:799591780ba0e2dfcedbe4",
    measurementId: "G-BTDW8QEW7X"
};

var app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig); // If no app exists.
}
else {
  const APPS = getApps();
  app = APPS[0]; // Choose the first app from the array.
}

export const db = getDatabase(app);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});;
export const firestore = getFirestore(app);
