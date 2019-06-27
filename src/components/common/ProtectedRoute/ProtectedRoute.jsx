import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, sb, ...props }) => (
  <Route
    {...props}
    render={props =>
      sb !== "" ? <Component sb={sb} {...props} /> : <Redirect to="/login" />
    }
  />
);

export default ProtectedRoute;
