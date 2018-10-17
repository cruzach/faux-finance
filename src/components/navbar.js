import React from 'react';

const Navbar = ({ onRouteChange , isSignedIn}) => {
    if(isSignedIn === false){
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light flex">
            <p className="navbar-brand" >Faux Finance</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <p className="nav-link pointer" onClick={() => onRouteChange('home')}>Getting Started</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link pointer" onClick={() => onRouteChange('signin')}>Sign in</p>
                </li>
                <li className="nav-item">
                    <p className="nav-link pointer" onClick={() => onRouteChange('register')}>Register</p>
                </li>
                </ul>
                <p className="navbar-text">
                    A free tool for learning about finance.
                </p>
            </div>
            </nav>
        );
    } else {
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light flex">
            <p className="navbar-brand" >Faux Finance</p>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <p className="nav-link pointer" onClick={() => onRouteChange('portfolio')}>My Portfolio</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link pointer" onClick={() => onRouteChange('lookup')}>Stock Lookup</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link pointer" onClick={() => onRouteChange('trade')}>Trade</p>
                    </li>
                    <li className="nav-item">
                        <p className="nav-link pointer" onClick={() => onRouteChange('home','signout')}>Sign Out</p>
                    </li>
                </ul>
                <p className="navbar-text">
                    A free tool for learning about finance.
                </p>
            </div>
            </nav>
        );
    }

}

export default Navbar;
