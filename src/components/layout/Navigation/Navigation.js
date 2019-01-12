import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom'

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav:false
        };
        this.openNav = 'Navigation__action action-to__open';
        this.closeNav = 'Navigation__action action-to__close';
    }

    handleClick = (e) => {
        if(e.target.classList.contains('action-to__open')) {
            this.setState ({
                nav:true
            });
        } else {
            this.setState ({
                nav:false
            });
        }
    }

    render() {
        return (
            <div className={this.state.nav ? "Navigation Navigation--open" : "Navigation"}>
                <div className="Navigation__container">
                    <ul className="Navigation__items">
                        <li className="Navigation__item"><Link to='/'>Accueil</Link></li>
                        <li className="Navigation__item"><Link to='/catalogue'>Catalogue des épisodes</Link></li>
                        <li className="Navigation__item"><Link to='/dictionnary'>Dictionnaire</Link></li>
                        <li className="Navigation__item"><Link to='/hours'>Hours</Link></li>
                        <li className="Navigation__item"><Link to='/presentation'>Soirée</Link></li>
                    </ul>
                    <div className={this.state.nav ? this.closeNav : this.openNav} onClick={this.handleClick}>
                        <div className="Navigation__action-cta">+</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navigation;