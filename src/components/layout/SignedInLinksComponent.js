import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logOutAction } from '../../store/actions/authActions';

const SignedInLinksComponent = (props) => {
    console.log(props);
    return (
        <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
                <Link
                    to="/user/:user_id/bookmarks"
                    className="nav-link active"
                >
                    <i
                        className="fa fa-bookmark"
                        aria-hidden="true"
                    ></i>
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to=""
                    className="nav-link"
                >
                    {props.currentUserEmail}
                </Link>
            </li>
            <li className="nav-item"
                onClick={props.logOutSubmit(props.history)}
            >
                <Link
                    to=""
                    className="nav-link active"
                >
                    Log Out
                </Link>
            </li>
        </ul>
    );
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
        currentUserEmail: state.firebase.auth.email,
	};
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutSubmit: (history) => dispatch(logOutAction(history))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedInLinksComponent));
