import './style.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from "../../SVG/Logo/Logo";
import WordBox from "../../SVG/WordBox/WordBox";
import SocialShare from "../../SVG/SocialShare/SocialShare";

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
                                <Logo />
                            </Link>
                            <Link to="/dictionnary" className="Navigation__header-box">
                                <WordBox />
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
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link to='/dictionnary' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>03</span>
                                            anecdotes
                                        </div>
                                    </div>
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
                                </Link>
                            </li>
                        </ul>
                        <div className="Navigation__footer">
                            <SocialShare />
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