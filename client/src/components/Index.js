import React from 'react';
import { Link } from "react-router-dom";

function Index() {
   
    const setUsername = (e) => {
        //AuthContext.username = e.target.value;
        console.log(e.target.value);
    }

    const setPassword = (e) => {
        //AuthContext.password = e.target.value;
        console.log(e.target.value);
    }

    const onSubmit = () => {
        alert('submit button clicked');
    }                                                                                                                             

    return (
        <div className="index-content">
            <section className="app-info">
                <h2>Welcome</h2>
                <h1>Expense Tracker</h1>
                <p className="support-text">Conveniently add daily expenses and help you keep track of your finances.</p>
                <q className="quote">Beware of little expenses. A small leak will sink a great ship.</q> -Ben Franklin
                <p className="support-text">Join the community and signup!</p>
            </section>
            <section className="app-login">
                <h2>Login</h2>
                <form onSubmit={onSubmit}>                    
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        placeholder="Username" 
                        onChange={setUsername}    
                    />
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder="Password" 
                        onChange={setPassword}    
                    />
                    <button type="submit">Login</button>
                </form>
                <p className="signup-info">New to Expense Tracker <Link to="/signup">Sign up Today!</Link></p>
            </section>
        </div>
    )
}

export default Index
