import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

function MainNav() {
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

export default MainNav;
