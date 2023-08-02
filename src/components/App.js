import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "../../src/App.css";
import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import HomePage from './views/HomePage/HomePage';
import MyPage from './views/MyPage/MyPage';
import Auth from '../hoc/auth'

function App() {
  return (
    <Router>
      <div>
      <Switch>
          {/* <Route exact path="/">
            <LandingPage />
          </Route> */}

        {/*   // null -> 아무나 출입이 가능한 페이지
    // true -> 로그인한 유저만 출입이 가능한 페이지
    // false -> 로그인한 유저는 출입이 불가능한 페이지 */}
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/v1/users/sign-up" component={RegisterPage} />
          <Route exact path="/v1/users/sign-in" component={LoginPage} />
          <Route exact path="/HomePage" component={HomePage} />
          <Route exact path="/MyPage" component={MyPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
