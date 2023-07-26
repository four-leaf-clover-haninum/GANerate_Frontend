import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../../src/App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import HomePage from './views/HomePage/HomePage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
    
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/auth/signin" component={LoginPage} />
          <Route exact path="/auth/signup" component={RegisterPage} />
          <Route exact path="/HomePage" component={HomePage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
