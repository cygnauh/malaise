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
            <nav className={this.state.nav ? "Navigation Navigation--open" : "Navigation"}>
                <div className="Navigation__container">
                    <div className="Navigation__main">
                        <div className="Navigation__header">
                            <Link to="/" className="Navigation__header-logo">
                                <img className="Navigation__header-logo--icon" src={require('../../../assets/icons/logo__white.png')} />
                            </Link>
                            <Link to="/dictionnary" className="Navigation__header-box">
                                <img className="Navigation__header-box--icon" src={require('../../../assets/icons/box.svg')} />
                            </Link>
                        </div>
                        <ul className="Navigation__items">
                            <li className="Navigation__item">
                                <Link to='/' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>01</span>
                                            accueil
                                        </div>
                                    </div>
                                    <img className="item__icon" src={require('../../../assets/icons/smiley.svg')} />
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link to='/catalogue' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>02</span>
                                            épisodes
                                        </div>
                                    </div>
                                    <img className="item__icon" src={require('../../../assets/icons/smiley.svg')} />
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link to='/dictionnary' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>03</span>
                                            témoignages
                                        </div>
                                    </div>
                                    <img className="item__icon" src={require('../../../assets/icons/smiley.svg')} />
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link to='/hours' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>04</span>
                                            à propos
                                        </div>
                                    </div>
                                    <img className="item__icon" src={require('../../../assets/icons/smiley.svg')} />
                                </Link>
                            </li>
                        </ul>
                        <div className="Navigation__footer">
                            <ul className="Navigation__socials">
                                <li className="Navigation__socials-item"><Link to="#"><img src={require('../../../assets/icons/facebook__white.svg')} /></Link></li>
                                <li className="Navigation__socials-item"><Link to="#"><img src={require('../../../assets/icons/instagram__white.svg')} /></Link></li>
                                <li className="Navigation__socials-item"><Link to="#"><img src={require('../../../assets/icons/twitter__white.svg')} /></Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={this.state.nav ? this.closeNav : this.openNav} onClick={this.handleClick}>
                        <div className="Navigation__action-cta">+</div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;