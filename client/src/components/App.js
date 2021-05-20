/* eslint-disable import/no-anonymous-default-export */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserProvider } from '../contexts/UserContext';
import useApp from '../hooks/useApp';

import Signup from './auth/Signup';
import Homepage from './Homepage';

const App = () => {
  useApp();
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Homepage} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </Router>
  );
};

export default () => (
  <UserProvider>
    <App />
  </UserProvider>
);
