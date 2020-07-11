import React from 'react';
import { Link } from "react-router-dom";

const SignInComponent = () => {
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
                    {this.props.currentUser.name}
                </Link>
            </li>
            <li className="nav-item"
                onClick={this.logOutSubmit}
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

export default SignInComponent;
