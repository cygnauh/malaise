import './Header.css';
import React from 'react';
import Navigation from "./Navigation";

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <h1 className="Header__logo">malaise.</h1>
                <Navigation />
            </header>
        )
    }
}

export default Header;