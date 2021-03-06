import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SearchBar from "./SearchBarComponent";
import SignedInLinks from './SignedInLinksComponent';
import SignedOutLinks from './SignedOutLinksComponent';

class navBarComponent extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-md nav-myClass">
                <Link to="/">
                    <i className="fa fa-newspaper-o news-icon my-auto" aria-hidden="true"></i>
                    <span className="navbar-brand nav-brand-link"> TopTidings</span>
                </Link>

                <SearchBar />

                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span><i className="fa fa-bars my-auto toggle-icon" aria-hidden="true"></i></span>
                </button>
                <div
                    className="collapse navbar-collapse navbar-custom-buttons"
                    id="navbarSupportedContent"
                >
                    {this.props.isAuthenticated ? (
                        //if user is not signed in
                        <SignedOutLinks />
                    ) : (
                        //if user is signed in
                        <SignedInLinks />
                    )}
                </div> 
            </nav>
        );
    }
}

//take data from store to components prop
const mapStateToProps = (state) => {
    console.log(state);
	return {
        isAuthenticated: state.firebase.auth.isEmpty,
	};
};

export default connect(mapStateToProps)(withRouter(navBarComponent));
