import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import './App.css';
import MainNav from './components/MainNav';
import Index from './components/Index';

import AuthState from '../src/context/auth/authState';

function App() {
  return (
    <AuthState>
      <Router>
        <div className="main-container">
          <header className="main-header">
            <div className="logo"><Link to="/">Expense Tracker</Link></div>
            <MainNav />
          </header>
          <div className="main-content">
            <Switch>
              <Route path="/">
                <Index />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </AuthState>
  );
}

export default App;
