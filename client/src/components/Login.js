import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login() {
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

        /*axios.post('/api/login', {
          email: email,
          password: password
        })
        .then(function (response) {
          console.log('Response: ', response.data['user']);
          window.localStorage.setItem('session_id', response.data['session_id']);
          window.localStorage.setItem('uid', response.data['id']);
          setUser(response.data['user']);*/
          //setAuth(true);
        /*})
        .catch(function (error) {
          console.log(error);
        });*/
    }

    const fakeAuth = {
        isAuthenticated: false,
        authenticate(cb) {
          this.isAuthenticated = true
          setTimeout(cb, 100) // fake async
        },
        signout(cb) {
          this.isAuthenticated = false
          setTimeout(cb, 100) // fake async
        }
      }

    return (
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
        <h3><Link to="/register">Register Now!</Link></h3>
      </div>
    )
}

export default Login
