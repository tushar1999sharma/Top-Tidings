import React, { Component } from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import PrivateRoute from './components/routes/PrivateRoutes';
import RestrictedRoute from './components/routes/RestrictedRoutes';

import { startSpinnerAction } from './store/actions/spinnerAction';

import Navbar from "./components/layout/NavbarComponent";
import Sources from "./components/layout/SourcesComponent";
import Categories from "./components/layout/CategoriesComponent";
import Home from "./components/dashboard/HomeComponent";
import Register from "./components/auth/RegisterComponent";
import LogIn from "./components/auth/LogInComponent";
import SourceNews from "./components/dashboard/SourceNewsComponent";
import CategoryNews from "./components/dashboard/CategoryNewsComponent";
import SearchNews from "./components/dashboard/SearchNewsComponent";
import DropDown from './components/layout/CatSourceDropdownComponent';
import FlashMsg from './components/layout/FlashMsg';
import Bookmark from './components/dashboard/ShowBookmarkComponent'

class App extends Component {
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

		return (
			<BrowserRouter>
				<div className="App">
                    <Navbar />
                    <FlashMsg />

					{/* Switch tag check route one by one and if matches 
                        then show that component and will not check other route */}
					<Switch>
						{/* By using Route, the component has access to this.props.history 
                        so it can redirect the user with this.props.history.push. */}
						<RestrictedRoute restricted = {true} exact path="/signup" component={Register} />
						<RestrictedRoute restricted = {true} exact path="/signin" component={LogIn} />
						<PrivateRoute exact path="/bookmarks" component={Bookmark} />
                        <Route component={defaultContainer} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isLoading: () => dispatch(startSpinnerAction()),
	};
};

export default connect(null, mapDispatchToProps)(App);
