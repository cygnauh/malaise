import React, { Component } from 'react';
import './style.scss';

class Header extends Component {
    render() {
        return (
            <header className="Header">
                <div className="Header__logo">
                    <img className="Header__icon" src={require('../../../assets/icons/logo__white.png')} />
                </div>
            </header>
        )
    }
}

export default Header;