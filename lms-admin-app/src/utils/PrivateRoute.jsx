import React,{useState} from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Switch, Redirect, Route } from "react-router-dom";

export const PrivateRoute = ({ component: Component, rolesRestriction:rolesRestriction ,...rest }) => {

    const validRoles =  rolesRestriction;

    const isLoggedIn = useSelector(state => state.authReducer.isLoggedIn && state.authReducer.jwt !== null);

    const roles = useSelector(state=>state.authReducer.roles);

    let isAuthorized=true;

    if(validRoles != undefined){
        console.log(validRoles)

        roles.map((role)=>{
            isAuthorized = validRoles.some(validRole=>validRole==role)
            console.log(isAuthorized);
        })
    }


    console.log(isAuthorized)
   

    return (
        <Route {...rest} render={(props) => (
            (isLoggedIn === true && isAuthorized === true)
              ? <Component {...props} />
              : <Redirect to='/login' />
          )} />
    );
}

