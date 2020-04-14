import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { Developers } from './Developers';
import { Pricing } from './Pricing';
import { Login } from './Login';
import { NoMatch } from './NoMatch';
import { Privacy } from './Privacy';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Register } from './Register';
import { Dashboard } from './Dashboard';



class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavigationBar />
        <Layout>
          <Router>
            <Switch>
              <Route exact path = "/" component={Home} />
              <Route path="/developers" component = {Developers} />
              <Route path="/pricing" component = {Pricing} />
              <Route path="/login" component = {Login} />
              <Route path="/privacy" component = {Privacy} />
              <Route path="/register" component = {Register} />
              <Route path="/dashboard" component = {Dashboard} />
              <Route component={NoMatch} /> 
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}
     

export default App;
