import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../../module/Helper';

//Private Route for redirecting user if they are not authenticated
const PrivateRoute = ({component: Component, ...rest}) => {

   return (
        
    <Route {...rest} render={props => 
       
        isAuth() ?   <Component {...props} /> : <Redirect to="/login" />
    } />
);
  
};

export default PrivateRoute;