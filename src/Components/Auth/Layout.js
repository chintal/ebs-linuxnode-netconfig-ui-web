
import React, { Component} from "react";
import {
  FormGroup,
  Typography
} from "@material-ui/core"

import "./auth.css";
import logo from "../../Resources/logo.png";


class AuthLayout extends Component {
    render() {
      return (
        <div className="auth-main">
          <div className="auth-content">
            <div className="auth-card">
              <img src={logo} alt="Logo" className="auth-logo" />
              <Typography variant="h5" component="h2" color="black" textAlign="center">
                {this.props.header}
              </Typography>
              <FormGroup size="large" className="auth-form">
                {this.props.children}
              </FormGroup>
            </div>
          </div>
        </div>
      );
    }
}

export default AuthLayout;
