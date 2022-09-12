import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import PageGame from './pages/PageGame';
import Ranking from './pages/Ranking';
import Settings from './pages/Settings';
import Feedback from './pages/Feedback';

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/game" component={ PageGame } />
          <Route path="/settings" component={ Settings } />
          <Route path="/ranking" component={ Ranking } />
          <Route path="/feedback" component={ Feedback } />
        </Switch>
      </div>
    );
  }
}

export default App;
