import './Navigation.css';
import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
                <div className="Navigation">
                    <ul>
                        <li><Link to='/'>Accueil</Link></li>
                        <li><Link to='/catalogue'>Catalogue des épisodes</Link></li>
                        <li><Link to='/dictionnary'>Dictionnaire</Link></li>
                    </ul>
                </div>
        )
    }
}

export default Navigation;