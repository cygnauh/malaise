import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    render() {
        return (
                <div className="Navigation">
                    <ul className="Navigation__items">
                        <li className="Navigation__item"><Link to='/'>Accueil</Link></li>
                        <li className="Navigation__item"><Link to='/catalogue'>Catalogue des épisodes</Link></li>
                        <li className="Navigation__item"><Link to='/dictionnary'>Dictionnaire</Link></li>
                        <li className="Navigation__item"><Link to='/hours'>Hours</Link></li>
                        <li className="Navigation__item"><Link to='/presentation'>Soirée</Link></li>
                    </ul>
                </div>
        )
    }
}

export default Navigation;