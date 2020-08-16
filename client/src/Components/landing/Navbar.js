import React, { Component } from "react";
import { Link } from "react-router-dom";
import Drone from '../../static/images/drone_image.png'
//Navbar component
class Navbar extends Component {
  render() {
    return (
      <div className="navbar" >
        <nav className="z-depth-0">
          
            <Link to="/" style={{fontFamily: "monospace"}}  className="brand-logo center black-text">
              <img src={Drone} width='100px' height='100px' alt='drone '/>
              Drone Operation App 
            </Link>
         
        </nav>
      </div>
    );
  }
}


export default Navbar;