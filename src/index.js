import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux"; //help to interact redux store with react app
import jwtDecode from "jwt-decode";
import store from './store';
import { authenticateUser, postLogOut } from "./store/actions/authActions";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    console.log("check for token", localStorage.token)
    // Set auth token header auth
    const token = localStorage.token;
    // Decode token and get user info and exp
    const decoded = jwtDecode(token);
    // Set user and isAuthenticated
    store.dispatch(authenticateUser(decoded));// Check for expired token
    const currentTime = Date.now() / 1000; // to get in milliseconds
    if (decoded.exp < currentTime) {
      // Logout user
      store.dispatch(postLogOut());    // Redirect to login
      window.location.href = "./login";
    }
}

ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			{" "}
			{/* use store in app.js */}
			<App />
		</Provider>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
