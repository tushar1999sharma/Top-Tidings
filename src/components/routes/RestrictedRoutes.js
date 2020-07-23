import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const RestrictedRoute = ({component: Component, restricted, ...rest}) => {
    return (
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            !props.isLoggedin && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.firebase.auth.isEmpty
    }
} 

export default connect(mapStateToProps, null)(RestrictedRoute);