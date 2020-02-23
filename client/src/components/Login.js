import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import globalContext from '../context/globalContext';

function Login() {

    const GlobalContext = useContext(globalContext);
    const Error = GlobalContext.error;
    console.log(GlobalContext.error.isError);
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

        GlobalContext.authenticate({'email': email, 'password': password});
    }

    return (
        <div className="app-login">
        <h3>Login</h3>
        { Error.isError ? <h3> Error.message </h3> : '' }
        <form onSubmit={onSubmit} className="login-form">
          <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email" 
              onChange={inputEmail}
              required
          />
          <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder="Password"
              onChange={inputPassword}
              required
          />
          <button type="submit">Login</button>
        </form>
        <h3><Link to="/register">Register Now!</Link></h3>
      </div>
    )
}

export default Login
