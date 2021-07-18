import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoutes({component: Component, ...rest}) {
    const userToken = localStorage.getItem('khaibaoyte');
    const userInfo = userToken;
    return (
        <Route
        {...rest}
        render={(props) =>
          userInfo ? (
            <Component {...props}></Component>
          ) : (
            <Redirect to="/" />
          )
        }
      ></Route>
    )
}
