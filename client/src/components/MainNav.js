import React from 'react';
import { Link } from 'react-router-dom'


function MainNav() {
    return (
        <nav className="main-nav">
            <Link to="/home">Home</Link>
            <Link to="/account">Account</Link>
            <Link to="/signup">Logout</Link>
        </nav>
    )
}

export default MainNav
