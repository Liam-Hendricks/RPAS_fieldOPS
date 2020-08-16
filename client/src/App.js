import React, { Component } from "react";
import Main from './Components/main/main';
import Landing from "./Components/landing/Landing";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import PrivateRoute from './Components/Auth/PrivateRoute';
import {BrowserRouter ,Route,Switch} from 'react-router-dom';
import './App.css';
import { ToastContainer } from "react-toastify";
//App component containing the routes for each page
class App extends Component {
    
  
  render(){
    
    return (
      <BrowserRouter>
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
          integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
          crossOrigin="anonymous"
        />
            
            
          <ToastContainer />
          <Switch>
              <Route  path="/" exact component={Landing} />
              <Route  path="/register" exact component={Register} />
              <Route  path="/login" exact component={Login}/>
              <PrivateRoute exact={true} path="/main" component={Main} />
          </Switch>


      
      </div>
      </BrowserRouter>
    );
  }
 
}

export default App;
