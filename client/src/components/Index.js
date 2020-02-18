import React, { useState } from 'react';

const Index= () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const inputEmail = (e) => {
        setEmail(e.target.value)
    }
    
    const inputPassword = (e) => {
        setPassword (e.target.value)     
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log('The email entered is: ', email);
        console.log('The password entered is: ', password);
    }

    return (
        <div className="landing-page">
            <div className="app-info">
              <h3>Welcome to Expense Tracker</h3>
              <p className="support-text">Conveniently add daily expenses and help you keep track of your finances.</p>
              <q className="quote">Beware of little expenses. A small leak will sink a great ship.</q> -Ben Franklin
              <p className="support-text">Join the community and signup!</p>
            </div>
            <div className="app-login">
              <h3>Login</h3>
              <form onSubmit={onSubmit} className="login-form">
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    placeholder="Email" 
                    onChange={inputEmail}
                />
                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder="Password"
                    onChange={inputPassword}
                />
                <button type="submit">Login</button>
              </form>
              <h3><a href="#">Register Now!</a></h3>
            </div>
          </div>
    )
}

export default Index;
