
import React, { Component} from "react";
import "./base.css";


class BaseLayout extends Component {
    render() {
      return (
        <div className="base-page"> 
          <div className="base-content">
            {this.props.children}
          </div>
        </div>
      );
    }
}

export default BaseLayout;
