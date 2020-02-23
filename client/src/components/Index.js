import React from 'react';
import Login from './Login';

const Index = ({setUser, setAuth}) => {
    

    return (
        <div className="landing-page">
            <div className="app-info">
              <h3>Welcome to Expense Tracker</h3>
              <p className="support-text">Conveniently add daily expenses and help you keep track of your finances.</p>
              <q className="quote">Beware of little expenses. A small leak will sink a great ship.</q> -Ben Franklin
              <p className="support-text">Join the community and signup!</p>
            </div>
            <Login />
          </div>
    )
}

export default Index;
