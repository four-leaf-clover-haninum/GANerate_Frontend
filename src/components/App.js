import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../../src/App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import HomePage from './views/HomePage/HomePage';
import MyPage from './views/MyPage/MyPage';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation */}
    
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/v1/users/sign-in" component={LoginPage} />
          <Route exact path="/v1/users/sign-up" component={RegisterPage} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/MyPage" component={MyPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
