import React, { Component } from 'react';
import './style.scss';
import Logo from "../../SVG/Logo/Logo";

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="Header__logo">
                    <Logo />
                </div>
            </header>
        )
    }
}

export default Header;