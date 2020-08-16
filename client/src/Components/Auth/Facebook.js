import React, { Component } from "react";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
require("dotenv").config();
//Facebook Login Component
class Facebook extends Component {
  render() {
    return (
      <div>
        <FacebookLogin
          appId={
            process.env.NODE_ENV === "production"
              ? `${process.env.REACT_APP_FACEBOOK_APP_ID_PRODUCATION}`
              : `${process.env.REACT_APP_FACEBOOK_APP_ID}`
          }
          autoLoad={false}
          fields="name,email"
          callback={this.props.responseFacebook}
          render={(renderProps) => (
            <div>
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="btn btn-light btn-outline-primary"
                style={buttonS}
              >
                <FontAwesomeIcon icon={faFacebook} size="3x" />
                Sign in
              </button>
            </div>
          )}
        />
      </div>
    );
  }
}

const buttonS = {
  width: "fit-content",
  height: "fit-content",
  textAlign: "center",
};
export default Facebook;
