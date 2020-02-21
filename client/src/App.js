import React, { useState } from 'react';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import MainNav from './components/MainNav';
import Index from './components/Index';
import Register from './components/Register';

const App = () => {

  const [userLoggedIn, setLoggedInUser] = useState();

  return (
    <div className="App">
      <Router>
        <header className="main-header">
          <MainNav />
        </header>
        <div className="container">
          <Switch>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/">
              <Index setUser={setLoggedInUser} />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
