import firebase from 'firebase';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCdr4WLruchiK5_OgT3U0CGkPy4NTMPnw4",
    authDomain: "shopindeed-5d97d.firebaseapp.com",
    projectId: "shopindeed-5d97d",
    storageBucket: "shopindeed-5d97d.appspot.com",
    messagingSenderId: "636062165229",
    appId: "1:636062165229:web:1243028eb4b2e8964304e4",
    measurementId: "G-T5FM8J757W"
  };
//intiialize app with firebaseConfig
const firebaseApp = firebase.initializeApp (firebaseConfig);

//initilaize db 
const db = firebaseApp.firestore();
//gives signing in etc
const auth = firebase.auth();

export {db,auth};
