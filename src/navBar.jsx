import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'

const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Birds Watching Application</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">

                <div className="navbar-nav">
                    <NavLink className="nav-item nav-link" to="/observations"> Observations </NavLink>
                    <NavLink className="nav-item nav-link" to="/form"> Add New Observation </NavLink>
                </div>

            </div>
        </nav>
    );
}

export default NavBar;