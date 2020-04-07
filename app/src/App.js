import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Developers } from './Developers';
import { Pricing } from './Pricing';
import { Login } from './Login';
import { NoMatch } from './NoMatch';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path = "/" component={Home} />
            <Route path="/developers" component = {Developers} />
            <Route path="/pricing" component = {Pricing} />
            <Route path="/login" component = {Login} />
            <Route component={NoMatch} /> 
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}
     

export default App;
