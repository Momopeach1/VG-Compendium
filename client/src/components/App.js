/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import { HeadingProvider } from '../contexts/HeadingContext';
import useApp from '../hooks/useApp';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Homepage from './Homepage';
import Navbar from './Navbar';
import Header from './Header'

const App = () => {
  useApp();
  return (
    <Router>
      <Header />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/signup' component={Signup} />
        <Route path='/login' component={Login} />
      </Switch>
    </Router>
  );
};

export default () => (
  <HeadingProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HeadingProvider>
);
