import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
    
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/auth/signin" component={LoginPage} />
          <Route exact path="/auth/signup" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
