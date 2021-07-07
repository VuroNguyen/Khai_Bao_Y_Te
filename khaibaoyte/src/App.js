import React from 'react'
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Report from './pages/Report';
import RegisterForm from './pages/Register/RegisterForm';
import LoginForm from './pages/Login/LoginForm';
import Footer from './components/Footer';
import Navbars from './components/Navbars';
import routeConfig from './config/Route';

function App() {
  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Navbars />
        <div className='container'>
          <div className='padding'>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path={routeConfig.login["list-url"]} component={Login} />
              <Route path={routeConfig.register["list-url"]} component={Register} />
              <Route path={routeConfig.loginForm["list-url"]} component={LoginForm} />
              <Route path={routeConfig.registerForm["list-url"]} component={RegisterForm} />
              <Route path={routeConfig.report["list-url"]} component={Report} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
