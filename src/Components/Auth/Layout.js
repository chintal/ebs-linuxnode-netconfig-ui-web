

import React, { Component} from "react";
import { Form, Header } from "semantic-ui-react";

import "./auth.css";
import logo from "../../Resources/logo.png";


class AuthLayout extends Component {
    render() {
      return (
        <div className="auth-main">
          <div class="auth-content">
            <div className="auth-card">
              <img src={logo} alt="Logo" className="auth-logo" />
              <Header as="h2" color="black" textAlign="center">
                {this.props.header}
              </Header>
              <Form.Group size="large" className="auth-form">
                {this.props.children}
              </Form.Group>
            </div>
          </div>
        </div>
      );
    }
}

export default AuthLayout;
