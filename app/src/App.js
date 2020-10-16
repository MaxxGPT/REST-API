import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import Developers from "./Developers";
import { Pricing } from "./Pricing";
import { Login } from "./Login";
import { Forgot } from "./Forgot";
import { NoMatch } from "./NoMatch";
import { Privacy } from "./Privacy";
import { Terms } from "./Terms";
import { NavigationBar } from "./components/NavigationBar";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { ChangePassword } from "./ChangePassword";
import { ProfileUser } from "./ProfileUser";
import { NewSource } from "./sources/NewSource";
import { UpdateSource } from "./sources/UpdateSource";
import { SourceList } from "./sources/SourceList";
import { RegisterComplete } from "./pages/RegisterComplete"
import { Subscription } from "./pages/Subscription"
import "./Styles/custom.scss";
class App extends Component {
  render() {
    return (
      <div className="page-container">
        <div className="content-wrap">
          <NavigationBar />
          <Router>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/developers" component={Developers} />
              <Route path="/pricing" component={Pricing} />
              <Route path="/login" component={Login} />
              <Route path="/forgot" component={Forgot} />
              <Route path="/privacy" component={Privacy} />
              <Route path="/terms" component={Terms} />
              <Route path="/register" component={Register} />
              <Route path="/register-complete" component={RegisterComplete} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/profile/subscription" component={Subscription} />
              <Route path="/profile/password" component={ChangePassword} />
              <Route path="/profile/user" component={ProfileUser} />
              <Route exact path="/sources" component={SourceList} />
              <Route path="/sources/new" component={NewSource} />
              <Route path="/sources/update/:id" component={UpdateSource} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </div>
      </div>
    );
  }
}

export default App;
