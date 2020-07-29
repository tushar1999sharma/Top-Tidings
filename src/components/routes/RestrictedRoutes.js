import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { isLoaded, isEmpty } from 'react-redux-firebase';

const RestrictedRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector((state) => state.firebase.auth);
    return (
        // Show the component only when the user is not logged in
        // Otherwise, redirect the user to home page
        // ...rest destructure the props of route
        <Route {...rest}
            render={({ location }) =>
                isLoaded(auth) && isEmpty(auth) ? (
                    <Component />
                ) : (
                    <Redirect
                        to={{
                        pathname: "/",
                        state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default RestrictedRoute;