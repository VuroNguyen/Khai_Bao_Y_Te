import React from 'react';
import jwt_decode from "jwt-decode";
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoutes({ component: Component, ...rest }) {
  const userToken = localStorage.getItem('khaibaoyte');
  const isExp = (token) => {
    let today = new Date();
    if (!token) {
      alert('No token found - Send from private routes')
      return true;
    }
    else if (jwt_decode(token).exp * 1000 < today.getTime()) {
      alert('token expired - Send from private routes')
      localStorage.clear();
      return true;
    }
    else return false;
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isExp(userToken) ? (
          <Redirect to="/" />
        ) : (
          <Component {...props}></Component>
        )
      }
    ></Route>
  )
}
