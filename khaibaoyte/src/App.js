import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbars from './components/Navbars';
import routeConfig from './config/Route';
import Login from './pages/Login';
import LoginForm from './pages/Login/LoginForm';
import UserHistory from './pages/Login/UserHistory';
import Register from './pages/Register';
import RegisterForm from './pages/Register/RegisterForm';
import Report from './pages/Report';

moment.locale('vi');

function App() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    let secTimer = setInterval(() => {
      setCurrentTime(new moment().format('HH:mm:ss'))
    }, 1000)

    return () => clearInterval(secTimer);
  }, []);

  return (
    <div className='page-container'>
      <div className='content-wrap'>
        <Navbars />
        <div className='container bg-primary'>
          <div style={{ paddingTop: '1em' }} />
          <span>Thời gian hệ thống: <br />{moment().format('dddd, DD/MM/YYYY')} &nbsp; {currentTime}</span>
          <div className='padding'>
            <Switch>
              <Route path="/" exact component={Login}></Route>
              <Route path={routeConfig.login["list-url"]} component={Login} />
              <Route path={routeConfig.loginForm["list-url"]} component={LoginForm} />
              <Route path={routeConfig.history["list-url"]} component={UserHistory} />
              <Route path={routeConfig.register["list-url"]} component={Register} />
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
