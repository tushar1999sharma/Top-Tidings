import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        // ...rest destructure the props of route
        <Route {...rest} render={props => (
            !props.isLoggedin ?
                <Component {...props} />
            : <Redirect to="/signin" />
        )} />
    );
};

const mapStateToProps = (state) => {
    console.log(!state.firebase.auth.isEmpty);
    return {
        isLoggedin: state.firebase.auth.isEmpty
    }
} 

export default connect(mapStateToProps, null)(PrivateRoute);