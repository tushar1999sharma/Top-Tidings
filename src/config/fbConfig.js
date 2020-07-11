import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCcNAHWtzyYIW_g2zsPAuv0eok2wasnLq8",
    authDomain: "top-tidings.firebaseapp.com",
    databaseURL: "https://top-tidings.firebaseio.com",
    projectId: "top-tidings",
    storageBucket: "top-tidings.appspot.com",
    messagingSenderId: "12142416643",
    appId: "1:12142416643:web:b9fceaa090ecd3c737cf36",
    measurementId: "G-EJQLN6BZC2"
};
firebase.initializeApp(config);

export default firebase;