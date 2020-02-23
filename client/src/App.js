import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import MainNav from './components/MainNav';
import Index from './components/Index';
import Register from './components/Register';
import Home from './components/Home';
import Account from './components/Account';
//import axios from 'axios';

import GlobalState from './context/GlobalState';

const App = () => {
  return  (
    <GlobalState>
    <div className="App">
      <Router>
        <header className="main-header">
          <MainNav />
        </header>
        <div className="container">
          <Switch>
            <Route path="/logout">
              {() => {
                return (<p>Logout page</p>)
              }}
            </Route>
          <Route path="/account">
            <Account  /> 
            </Route>
            <Route path="/home">
              <Home /> 
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Index  />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
    </GlobalState>
  );
}



export default App;
