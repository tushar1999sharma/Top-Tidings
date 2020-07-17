import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { logOutAction } from '../../store/actions/authActions';

class SignedInLinksComponent extends Component {
    logOutClick = (event) => {
        event.preventDefault();
        this.props.logOutSubmit(this.props.history);
    }
    render() {
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
                        {this.props.name}
                    </Link>
                </li>
                <li className="nav-item"
                    onClick={this.logOutClick}
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
}

const mapStateToProps = (state) => {
	console.log(state);
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
