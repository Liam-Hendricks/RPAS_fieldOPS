import React, { Component } from "react";
import Facebook from "./Facebook";
import { Redirect, Link } from "react-router-dom";
import classnames from "classnames";
import { authenticate, isAuth, setLocalStorage } from "../../module/Helper";
import { toast } from "react-toastify";
import { Row, Col, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.min.css";
import jwt_decode from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../landing/Navbar";

import axios from "axios";
function Data(FieldOps, Events) {
  this.FieldOps = FieldOps;
  this.Events = Events;
}
//Login Component
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      password: "",
      errors: {},
      success: false,
      token: "",
      isLoading: false,
    };
    
  }
  //Event handler for changing input value
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };
  //mounting component 
  componentDidMount() {
    this._ismounted = true;
  }
    //unmounting component
  componentWillUnmount() {
    this._ismounted = false;
  }

  responseFacebook = async (response) => {
    this.setState({ isLoading: true });
    if (response.accessToken !== undefined && this._ismounted) {
      const url = `https://graph.facebook.com/v2.11/${response.userID}/?fields=id,name,email&access_token=${response.accessToken}`;

      try {
        const response = await axios.get(url);

        try {
          const result = await axios({
            method: "POST",
            url: `/api/facebook-loggin`,
            data: {
              email: response.data.email,
              password: response.data.id,
              name: response.data.name,
            },
          });

          this.setState({ isLoading: false });
          authenticate(result.data.token, () => {
            const name = jwt_decode(result.data.token).name;
            toast.success(`Hey,${name} Welcome back!`);
            isAuth();
          });
          const data = new Data(result.data.FieldOPs, result.data.Events);
          setLocalStorage("profile", JSON.stringify(data));
          this.setState({
            success: result.data.success,
            token: result.data.token,
          });
        } catch (e) {
          console.log("FACEBOOK SIGNING ERROR", e.response);
        }
      } catch (e) {
        console.log("FACEBOOK ERROR", e);
      }
    }
  };

  //handle submit
  onSubmit = async (e) => {
    e.preventDefault();
    //get state
    const { email, password } = this.state;
    //create post request
    try {
      const result = await axios.post("/api/signin", {
        email: email,
        password: password,
      });

      //authenticate user and add token
      authenticate(result.data.token, () => {
        const name = jwt_decode(result.data.token).name;
        toast.success(`Hey,${name} Welcome back!`);
        isAuth();
      });
      const data = new Data(result.data.FieldOPs, result.data.Events);
      setLocalStorage("profile", JSON.stringify(data));
      //update state
      this.setState({ success: result.data.success, token: result.data.token });
    } catch (e) {
      if (e.response !== undefined) {
        this.setState({ errors: e.response.data });
      }
    }
  };

  render() {
    //get state
    const { errors, password, email, isLoading } = this.state;
    return (
      <div className="background">
        
        <Container style={containerStyle}>
          <Row className="justify-content-center" style={padding}>
            <Col>
              <Navbar />
            </Col>
          </Row>
          
          { isAuth() ? <Redirect to="/main" /> : <Redirect to="/login" />}
          {isLoading ? (
            <div
              className="loader"
              style={{ marginLeft: "auto", marginRight: "auto" }}
            ></div>
          ) : this._ismounted ? (
            <div>
              <Row className="justify-content-center ">
                <Col md={"auto"}>
                  <div className="col">
                    <Link to="/" className="btn-flat waves-effect">
                      <i className="material-icons left">keyboard_backspace</i>{" "}
                      Back to home{" "}
                    </Link>
                  </div>

                  <div
                    className="col navText"
                    style={{ paddingLeft: "11.250px" }}
                  >
                    <h4>
                      <b>Login</b> below
                    </h4>
                    <p style={{ color: "white" }}>
                      {" "}
                      Don't have an account?{" "}
                      <Link to="/register" style={{ color: "black" }}>
                        Register
                      </Link>
                    </p>
                  </div>
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="input-field col ">
                      <input
                        onChange={this.onChange}
                        value={email}
                        autoComplete="email"
                        error={errors.email}
                        id="email"
                        type="email"
                        className={classnames("", {
                          invalid: errors.email || errors.emailnotfound,
                        })}
                      />
                      <label htmlFor="email" className="white-text">
                        Email
                      </label>
                      <span className="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                      </span>
                    </div>
                    <div className="input-field col ">
                      <input
                        onChange={this.onChange}
                        value={password}
                        autoComplete="current-password"
                        error={errors.password}
                        id="password"
                        type="password"
                        className={classnames("", {
                          invalid: errors.password || errors.passwordincorrect,
                        })}
                      />
                      <label htmlFor="password" className="white-text">
                        Password
                      </label>
                      <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
                    </div>
                    <div className="col " style={{ paddingLeft: "11.250px" }}>
                      <button
                        style={buttonStyle}
                        type="submit"
                        className="btn btn-large waves-effect waves-light hoverable blue accent-3 white-text"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </Col>
              </Row>
              <Row className="justify-content-begin">
                <Col>
                  <p>Sign in with facebook below</p>
                  <Facebook responseFacebook={this.responseFacebook} />
                </Col>
              </Row>
            </div>
          ) : null}
        </Container>
      </div>
    );
  }
}
const padding = {
  paddingBottom: "100px",
};
const buttonStyle = {
  width: "150px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
};
const containerStyle = {
  marginTop: "50px",
  marginLeft: "auto",
  marginRight: "auto",
};
export default Login;
