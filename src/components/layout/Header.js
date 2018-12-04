import './Header.css';
import React from 'react';
import FirstEpisode from "../../graphql/queries/FirstEpisode";

class Header extends React.Component {
    render() {
        return (
            <header className="Header">
                <h1 className="Header__logo">Malaise <FirstEpisode /></h1>
            </header>
        )
    }
}

export default Header;