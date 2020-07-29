import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

//create firebase configuration
const fbConfig = {
    apiKey: process.env.REACT_APP_FB_API,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
    measurementId: process.env.REACT_APP_FB_MEASUREMENT_ID
};

// Initialize firebase instance with provided configuration
firebase.initializeApp(fbConfig);

const firestore = firebase.firestore(); //create firestore instance
const auth = firebase.auth(); //create auth instance
const googleProvider = new firebase.auth.GoogleAuthProvider(); //create google provider
const githubProvider = new firebase.auth.GithubAuthProvider(); //create github provider 

export { firebase, firestore, auth, googleProvider, githubProvider }