import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SearchBar from "./SearchBarComponent";
import SignedInLinks from './SignedInLinksComponent';
import SignedOutLinks from './SignedOutLinksComponent';
import { startSpinnerAction } from '../../store/actions/spinnerAction';
import { postLogOut } from "../../store/actions/authActions";

class navBarComponent extends Component {
    logOutSubmit = (event) => {
        event.preventDefault();
        //this.props.isLoading();
        this.props.LogOutPost(this.props.history);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <Link to="/">
                    <span className="navbar-brand">TopTidings</span>
                </Link>

                <button
                    className="navbar-toggler"
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
                    className="collapse navbar-collapse bg-dark navbar-custom-buttons"
                    id="navbarSupportedContent"
                >
                    <SearchBar />

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

//take data to store
const mapDispatchToProps = (dispatch) => {
    return {
        isLoading: () => dispatch(startSpinnerAction()),
        LogOutPost: (history) => dispatch(postLogOut(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(navBarComponent));
