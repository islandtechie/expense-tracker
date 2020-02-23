import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function MainNav({isAuthenticated}) {
    if (isAuthenticated)
    {
        return (
            <Fragment>
                <nav className="main-nav">
                    <Link to="/">Expense Tracker</Link>
                </nav>
                <nav className="user-controls">
                    <Link to="/home">Home</Link>
                    <Link to="/account">Account</Link>
                    <Link to="/logout">Logout</Link>
                </nav>
            </Fragment>
        )
    }else{
        return (
            <Fragment>
                <nav className="main-nav">
                    <Link to="/">Expense Tracker</Link>
                </nav>
                <nav className="user-controls">
                    <Link to="/register">Register</Link>
                </nav>
            </Fragment>
        )
    }
}

export default MainNav;
