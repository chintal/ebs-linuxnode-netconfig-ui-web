
import React, { Component} from "react";
import StickyFooter from "../Components/Common/StickyFooter";
import "./base.css";


class BaseLayout extends Component {
    render() {
      return (
        <div className="base-page"> 
          <div className="base-content">
            {this.props.children}
          </div>
          <StickyFooter />
        </div>
      );
    }
}

export default BaseLayout;
