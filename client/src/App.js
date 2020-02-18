import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="main-header">
        <nav className="main-nav">
          <a href="#">Expense Tracker</a>
        </nav>
        <nav className="user-controls">
          <a href="#">Register</a>
        </nav>
      </header>
      <div className="container">
        <div className="landing-page">
          <div className="app-info">
            <h3>Welcome to Expense Tracker</h3>
            <p className="support-text">Conveniently add daily expenses and help you keep track of your finances.</p>
            <q className="quote">Beware of little expenses. A small leak will sink a great ship.</q> -Ben Franklin
            <p className="support-text">Join the community and signup!</p>
          </div>
          <div className="app-login">
            <h3>Login</h3>
            <form action="#" className="login-form">
              <input type="email" name="email" id="email" placeholder="Email" />
              <input type="password" name="password" id="password" placeholder="Password" />
              <button type="submit">Login</button>
            </form>
            <h3><a href="#">Register Now!</a></h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
