import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import history from '../utilities/history';
import Homepage from './Homepage';

function App() {
  return (
    <Router history ={history}>
      <Switch>
        <Route path='/' component={Homepage} />
      </Switch>
    </Router>
  );
}

export default App;
