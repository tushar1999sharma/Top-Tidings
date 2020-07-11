import React from 'react';
import { Link } from "react-router-dom";

const SignOutComponent = () => {
    return (
        <ul className="nav navbar-nav ml-auto">
            <li className="nav-item">
                <Link
                    to="/signin"
                    className="nav-link active"
                >
                    Log In
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    to="/signup"
                    className="nav-link active"
                >
                    Register
                </Link>
            </li>
        </ul>
    );
}

export default SignOutComponent;
