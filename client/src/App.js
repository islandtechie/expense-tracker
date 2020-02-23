import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import MainNav from './components/MainNav';
import Index from './components/Index';
import Register from './components/Register';
import Home from './components/Home';
import Account from './components/Account';
import axios from 'axios';

const App = () => {

  const [loggedInUser, setLoggedInUser] = useState();
  const [isAuthenticated, setAuthenticated] = useState(true);

  const logout = (user_id) => {
    if (isAuthenticated) setAuthenticated(false);
    return <Redirect to='/' />;
  }
  

  return  (
    <div className="App">
      <Router>
        <header className="main-header">
          <MainNav isAuthenticated={isAuthenticated} />
        </header>
        <div className="container">
          <Switch>
            <Route path="/logout">
              {logout(3)}
            </Route>
          <Route path="/account">
            {isAuthenticated ? <Account user={loggedInUser} /> : <Redirect to="/" />}
            </Route>
            <Route path="/home">
              {isAuthenticated ? <Home user={loggedInUser} />  : <Redirect to="/" />}
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              {isAuthenticated ? <Redirect to="/home" /> : <Index  setUser={setLoggedInUser} setAuth={setAuthenticated} />}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}



export default App;
