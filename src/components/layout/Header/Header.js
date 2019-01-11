import React from 'react';
import './style.scss';

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <h1 className="Header__logo">malaise.</h1>
            </header>
        )
    }
}

export default Header;