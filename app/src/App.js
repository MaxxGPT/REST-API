import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import Developers from "./Developers"
//import { Developers } from './Developers';
import { Pricing } from './Pricing';
import { Login } from './Login';
import { NoMatch } from './NoMatch';
import { Privacy } from './Privacy';
import { Layout } from './components/Layout';
import { NavigationBar } from './components/NavigationBar';
import { Register } from './Register';
import { Dashboard } from './Dashboard';
import { ChangePassword } from './ChangePassword';
import { ProfileUser } from './ProfileUser';
import { NewSource } from './sources/NewSource';
import { UpdateSource } from './sources/UpdateSource';
import { SourceList } from './sources/SourceList';


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
              <Route path="/profile/password" component = {ChangePassword} />
              <Route path="/profile/user" component = {ProfileUser} />
              <Route exact path="/sources" component = {SourceList} />
              <Route path="/sources/new" component = {NewSource} />
              <Route path="/sources/update/:id" component = {UpdateSource} />
              <Route component={NoMatch} /> 
            </Switch>
          </Router>
        </Layout>
      </React.Fragment>
    );
  }
}
     

export default App;
