import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import Logo from "../../SVG/Logo/Logo";

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="Header__logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
            </header>
        )
    }
}

export default Header;