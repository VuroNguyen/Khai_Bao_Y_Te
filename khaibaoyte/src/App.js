import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Navbars from './components/Navbars';
import routeConfig from './config/Route';
import AdminDashboard from './pages/Dashboard';
import Login from './pages/Login';
import LoginForm from './pages/Login/LoginForm';
import UserHistory from './pages/Login/UserHistory';
import Register from './pages/Register';
import RegisterForm from './pages/Register/RegisterForm';
import Report from './pages/Report';
import Error from './pages/Error';
import AuthContextProvider from './components/contexts/AuthContext'
import Auth from './views/Auth'
import PrivateRoutes from './components/utils/privateroutes';

moment.locale('vi');

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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
        <div className='container'>
          <div style={{ paddingTop: '1em' }} />
          {capitalizeFirstLetter(moment().format(`dddd, DD/MM/YYYY ㅤHH:mm:ss`))}
          <div className='padding'>
            <AuthContextProvider>
              <Switch>
                <Route path="/" exact component={Login}></Route>
                <Route
                  path={routeConfig.login["list-url"]}
                  exact
                  render={props => <Auth {...props} authRoute='login' />} />

                {/* add privateRoutes for user w tokens */}
                <PrivateRoutes
                  path={routeConfig.loginForm["list-url"]}
                  exact
                  component={LoginForm} />

                <PrivateRoutes
                  path={routeConfig.history["list-url"]}
                  exact
                  component={UserHistory} />
                <Route
                  path={routeConfig.register["list-url"]}
                  exact
                  component={Register} />
                <PrivateRoutes
                  path={routeConfig.registerForm["list-url"]}
                  exact
                  component={RegisterForm} />
                <PrivateRoutes
                  path={routeConfig.report["list-url"]}
                  exact
                  component={Report} />
                <PrivateRoutes
                  path={routeConfig.adminDashboard["list-url"]}
                  exact
                  component={AdminDashboard} />
                <Route
                  path={routeConfig.error["list-url"]}
                  exact
                  component={Error} />
              </Switch>
            </AuthContextProvider>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;