import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import jwtDecode from "jwt-decode";
import store from './store';
import setAuthToken from "./utils/setAuthToken";
import { authenticateUser, postLogOut } from "./actions/authActions";

import Navbar from "./components/navbarComponent";
import Sources from "./components/sourcesComponent";
import Categories from "./components/categoriesComponent";
import Home from "./components/homeComponent";
import Register from "./components/registerComponent";
import LogIn from "./components/logInComponent";
import SourceNews from "./components/sourceNewsComponent";
import CategoryNews from "./components/categoryNewsComponent";
import SearchNews from "./components/searchNewsComponent";
import DropDown from './components/catSourceDropdownComponent';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
    console.log("check for token", localStorage.getItem("token"))
    // Set auth token header auth
    const token = localStorage.getItem("token");
    setAuthToken(token);
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

class App extends Component {
    /* componentDidMount() {
		this.props.dispatch(isLoading());
		const token = localStorage.getItem('token');
		if (token) {
			const user = jwtDecode(token);
			this.props.dispatch(isAuthenticated(user));
		}
	} */
	render() {
        const defaultContainer = () => (
            <div>            
                <DropDown />

				<Sources />

				<Categories />
                
                <Route exact path="/" component={Home} />
                {/* exact path is used, otherwise it will also show those pages where sub route matches with their route. 
                    Eg:- for route /about here both / & /about matches and react open both pages */}
                <Route path="/search/:query" component={SearchNews} />

                <Route path="/source/:src_id" component={SourceNews} />

                <Route path="/category/:ctg_name" component={CategoryNews} />
            </div>
        )

        const authContainer = () => (
            <div>
                <Route path="/signup" component={Register} />

                <Route path="/signin" component={LogIn} />
            </div>
        )

		return (
			<BrowserRouter>
				<div className="App">
                    <Navbar />

					{/* Switch tag check route one by one and if matches 
                        then show that component and will not check other route */}
					<Switch>
						{/* By using Route, the component has access to this.props.history 
                        so it can redirect the user with this.props.history.push. */}
						<Route exact path="/signup" component={authContainer} />
						<Route exact path="/signin" component={authContainer} />
                        <Route component={defaultContainer} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

/* const mapDispatchToProps = (dispatch) => {
	return {
		isLoading: () => dispatch(isLoadingAction()),
        isAuthenticated: (user) => dispatch(authenticateUser(user)),
        logOutPost: () => dispatch(postLogOut())
	};
}; */

export default /* connect(null, mapDispatchToProps) */(App);
