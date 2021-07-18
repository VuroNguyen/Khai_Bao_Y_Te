import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import AuthContextProvider from './components/contexts/AuthContext';
import PrivateRoutes from './components/utils/privateroutes';
import routeConfig from './config/Route';
import AdminDashboard from './pages/Dashboard';
import EnterpriseInfo from './pages/Info';
import Login from './pages/Login';
import LoginForm from './pages/Login/LoginForm';
import UserHistory from './pages/Login/UserHistory';
import Register from './pages/Register';
import RegisterForm from './pages/Register/RegisterForm';
import Report from './pages/Report';
import Auth from './views/Auth';

function App() {
  return (
    <AuthContextProvider>
      <Switch>
        <Route path="/" exact component={Login}></Route>
        <Route
          path={routeConfig.login["list-url"]}
          exact
          render={props => <Auth {...props} authRoute='login' />} />

        {/* add privateRoutes for user w tokens */}
        {/* Chỉnh thành route thường vì gửi email đính kèm token */}
        {/* => Méo cần private */}
        {/* Bỏ exact để xét trường hợp user vào bằng link 3000/form/ sẽ bị sút ra */}
        <Route
          path={routeConfig.loginForm["list-url"]}
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
          path={routeConfig.adminDashboard["list-url"]}
          exact
          component={AdminDashboard} />
        <PrivateRoutes
          path={routeConfig.enterpriseinfo["list-url"]}
          exact
          component={EnterpriseInfo} />
        <Route
          path={routeConfig.report["list-url"]}
          exact
          component={Report} />
      </Switch>
    </AuthContextProvider>
  );
}

export default App;