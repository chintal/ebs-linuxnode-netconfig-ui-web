import React from "react";
import { Redirect, Route } from "react-router";
import { getToken } from "./Auth";


const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route 
         {...rest}
         render={props => {
            return getToken() ? <Component {...props} />
                : <Redirect to={{ pathname: "/login", 
                                  state: { from: props.location}}} />
         }}
        />
    )
}

export default PrivateRoute;