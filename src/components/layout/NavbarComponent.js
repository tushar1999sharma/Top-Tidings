import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import SearchBar from "./SearchBarComponent";
import SignIn from './SignInComponent';
import SignOut from './SignOutComponent';
import { connect } from "react-redux";
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
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link to="/">
                    <span className="navbar-brand m-1">TopTidings</span>
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
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse bg-dark navbar-custom-buttons"
                    id="navbarSupportedContent"
                >
                    {this.props.isAuthenticated ? (
                        <SignIn />
                    ) : (
                        <SignOut />
                    )}
                </div>
            </nav>
        );
    }
}

//take data from redux store to components prop
const mapStateToProps = (state) => {
	console.log(state);
	return {
        isAuthenticated: state.auth.isAuthenticated,
		currentUser: state.auth.currentUser
	};
};

//take data to redux store
const mapDispatchToProps = (dispatch) => {
    return {
        isLoading: () => dispatch(startSpinnerAction()),
        LogOutPost: (history) => dispatch(postLogOut(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(navBarComponent));
