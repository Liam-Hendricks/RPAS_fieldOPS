import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import Navbar from "./Navbar";

//component for landing
class Landing extends Component {
  render() {
    return (
      <div className="background">
        <Container style={containerStyle}>
          <Row className="justify-content-center" style={padding}>
            <Col>
              <Navbar />
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col md={"auto"}>
              <Link to="/register">
                <button
                  style={buttonStyle}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3 white-text"
                >
                  Register
                </button>
              </Link>
            </Col>
            <Col md={"auto"}>
              <Link to="/login">
                <button
                  style={buttonStyle}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable white accent-3 black-text"
                >
                  Login
                </button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
const padding = {
  paddingBottom: "100px",
};

const containerStyle = {
  marginTop: "100px",
  verticalHeight: "75vh",
  marginLeft: "auto",
  marginRight: "auto",
};
const buttonStyle = {
  width: "150px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
};

export default Landing;
