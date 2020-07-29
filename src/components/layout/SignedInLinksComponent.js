import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logOutAction } from '../../store/actions/authActions';

class SignedInLinksComponent extends Component {
    logOutClick = (event) => {
        //prevent default action i.e. refresh
        event.preventDefault();
        //action to log out user
        this.props.logOutSubmit(this.props.history);
    }

    render() {
        return (
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <Link
                        to="/bookmarks"
                        className="nav-link active nav-auth-link"
                    >
                        <i
                            className="fa fa-bookmark"
                            aria-hidden="true"
                        ></i>
                    </Link>
                </li>
                <li className="nav-item disabled">
                    <Link
                        to=""
                        className="nav-link nav-authName-link"
                    >
                        {this.props.name}
                    </Link>
                </li>
                <li className="nav-item"
                    onClick={this.logOutClick}
                >
                    <Link
                        to=""
                        className="nav-link active nav-auth-link"
                    >
                        Log Out
                    </Link>
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
	return {
        name: state.firebase.profile.name,
	};
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOutSubmit: (history) => { 
            dispatch(logOutAction(history))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignedInLinksComponent));
