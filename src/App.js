import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PageGame from './pages/PageGame';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ PageGame } />
        </Switch>
      </div>
    );
  }
}

export default App;
