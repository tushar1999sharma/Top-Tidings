import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux"; //help to interact redux store with react app

import firebase from 'firebase/app';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase' //syncing data in firestore to our storehe f
import { createFirestoreInstance } from 'redux-firestore' //connecting the whole application to the firestore database

import store from './store/store';
import { config } from './config/fbConfig';
const rrfConfig = { userProfile: 'users' } // react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(config);

const rrfProps = {
    firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
            <ReactReduxFirebaseProvider {...rrfProps}>
                {/* use store in app.js */}
                <App />
            </ReactReduxFirebaseProvider>
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
