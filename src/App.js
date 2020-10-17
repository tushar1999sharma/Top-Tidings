import React, { Component } from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
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
import Bookmark from './components/dashboard/ShowBookmarkComponent';
import Page404 from './components/dashboard/Page404';

class App extends Component {
	render() {
        const defaultContainer = () => (
            <div>            
                <DropDown />

				<Sources />

				<Categories />
				
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* exact path is used, otherwise it will also show those pages where sub route matches with their route. 
                        Eg:- for route /about here both / & /about matches and react open both pages */}
                    <Route exact path="/search/:query" component={SearchNews} />

                    <Route exact path="/source/:src_id" component={SourceNews} />

                    <Route exact path="/category/:ctg_name" component={CategoryNews} />
				</Switch>
            </div>
        )

		return (
            <HashRouter basename = "/">
                <div className="App">
                    <Navbar />
                    <FlashMsg />
                    {/* Switch tag check route one by one and if matches 
                        then show that component and will not check other route */}
                    <Switch>
                        {/* By using Route, the component has access to this.props.history 
                        so it can redirect the user with this.props.history.push. */}
                        <RestrictedRoute exact path="/signup" component={Register} />
                        {/* restrict route if useer is logged in */}
                        <RestrictedRoute exact path="/signin" component={LogIn} />
                        {/* protect route if user is not logged in */}
                        <PrivateRoute exact path="/bookmarks" component={Bookmark} />
                        
                        <Route exact path="/" component={defaultContainer} />
                        
                        <Route exact path="/search/:query" component={defaultContainer} />
                        
                        <Route exact path="/source/:src_id" component={defaultContainer} />
                        
                        <Route exact path="/category/:ctg_name" component={defaultContainer} />
                                        
                        <Route component={Page404} />
                    </Switch>
                </div>
            </HashRouter>
		);
	}
}

/* dispatch action to change store data */
const mapDispatchToProps = (dispatch) => {
	return {
		isLoading: () => dispatch(startSpinnerAction()),
	};
};

/* 'connect' connect react component with redux store */
export default connect(null, mapDispatchToProps)(App);
