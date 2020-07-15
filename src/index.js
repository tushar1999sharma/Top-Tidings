import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux"; //help to interact redux store with react app

//import firebase 
import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore'

//import redux
import { ReactReduxFirebaseProvider } from 'react-redux-firebase' //syncing data in firestore to our storehe f
import { createFirestoreInstance } from 'redux-firestore' //connecting the whole application to the firestore database
import { useSelector } from "react-redux";
import { isLoaded } from "react-redux-firebase";
import store from './store/store';

//firebase config
import { fbConfig, rrfConfig } from './config/fbConfig';

// Initialize firebase instance
firebase.initializeApp(fbConfig);
//Initialize firestore
firebase.firestore();

//react redux firebae properties
const rrfProps = {
    firebase: firebase,
    config: rrfConfig,
    dispatch: store.dispatch,
    createFirestoreInstance: createFirestoreInstance
}

/* function AuthIsLoaded({ children }) {
    const auth = useSelector(state => state.firebase.auth);
    if (!isLoaded(auth))
      return (
        <div className="text-center">
          <div
            className="spinner-grow text-primary"
            style={{ width: "7rem", height: "7rem" }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    return children;
}
 */
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
