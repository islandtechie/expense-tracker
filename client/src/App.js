import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import MainNav from './components/MainNav';
import Index from './components/Index';
import Home from './components/Home';


function App() {
  return (
      <Router>
        <div className="main-container">
          <header className="main-header">
            <div className="logo"><Link to="/">Expense Tracker</Link></div>
            <MainNav />
          </header>
          <div className="main-content">
            <Switch>
              <Route path="/home">
                  <Home />
              </Route>
              <Route path="/">
                <Index />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
  );
}

export default App;