import React, { Component } from "react";
import {Link } from "react-router-dom";
import { Container ,Row,Col} from "react-bootstrap";
import classnames from "classnames";
import axios from 'axios';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import Navbar from "../landing/Navbar";
//component for registration
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
      registered:false
    };
    this.onSubmit =this.onSubmit.bind(this);
  }
  //handle input change
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  //handle submit
  onSubmit = (e) => {
    //get state
    const {email,password,name,password2}=this.state;
    //create post method
    axios.post('/api/signup',{
            
      name:name,
      email: email,
      password: password,
      password2: password2,
      })
    .then((result)=>{
      //display success
      toast.success(`Account Created`);
      toast.success(`Click on login to access account`);
      this.setState({name: "",
      email: "",
      password: "",
      password2: ""});
      
    })
    .catch((error) => this.setState({ errors:error.response.data}));
    
    e.preventDefault();
    
  };

  render() {
    //get state
    const { errors,name,email,password,password2 } = this.state;
    return (
      <div className="background">
      
      
      <Container style={containerStyle}>
        
        
        <Row className="justify-content-center" style={padding}>
            <Col>
              <Navbar />
            </Col>
          </Row>
        
        <Row className="justify-content-center">
          <Col md={'auto'}>
            <Col md={'auto'}>
            <Link to="/" className="btn-flat waves-effect">
                <i className="material-icons left">keyboard_backspace</i> Back to
                home
              </Link>
            </Col>
           
            <div className="col " style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Register</b> below
              </h4>
              <p > Already have an account? <Link to="/login" style={{color:"black"}}>Log in</Link> </p>
            </div>
            
            <form noValidate onSubmit={this.onSubmit} >
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={name}
                  error={errors.name}
                  id="name"
                  type="text"
                  autoComplete="username"
                  className={classnames("", {
                    invalid: errors.name
                  })}
                />
                <label htmlFor="name" className="white-text">Name</label>
                <span className="red-text">{errors.name}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={email}
                  error={errors.email}
                  id="email"
                  type="email"
                  autoComplete="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                <label htmlFor="email" className="white-text">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={password}
                  error={errors.password}
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password" className="white-text">Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col">
                <input
                  onChange={this.onChange}
                  value={password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  autoComplete="new-password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2" className="white-text">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={buttonStyle}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </button>
              </div>
            </form>
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
  marginTop:'50px',
  marginLeft: "auto",
  marginRight: "auto",
  
};
const buttonStyle={
  width: "150px",
  borderRadius: "3px",
  letterSpacing: "1.5px",
  marginTop: "1rem",
}
export default Register;
