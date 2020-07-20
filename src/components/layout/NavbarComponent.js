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
                    <i class="fa fa-newspaper-o news-icon" aria-hidden="true"></i>
                    <span className="navbar-brand nav-brand-link"> TopTidings</span>
                </Link>

                <SearchBar />

                <button
                    className="navbar-toggler mx-auto"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse navbar-custom-buttons ml-auto"
                    id="navbarSupportedContent"
                >
                    {this.props.isAuthenticated ? (
                        <SignedOutLinks />
                    ) : (
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
