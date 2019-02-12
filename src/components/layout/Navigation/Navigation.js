import './style.scss';
import React, { Component } from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Logo from "../../SVG/Logo/Logo";
import WordBox from "../../SVG/WordBox/WordBox";
import SocialShare from "../../SVG/SocialShare/SocialShare";

class Navigation extends Component {
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

    handleClickLink = () => {
        this.setState ({
            nav:false
        }, () => {
            $('body').removeClass('episode').removeClass('interface-reverse').addClass('interface');
            $('.Navigation').css('transform', 'translateX(calc(48px - 100%))');
        });
    }

    handleActionHover = () => {
        if(!$('body').hasClass('interface')) {
            $('.Navigation').css('transform', 'translateX(calc(48px - 100%))');
        }
    }

    handleActionHoverLeaver = () => {
        if(!$('body').hasClass('interface')) {
            console.log('xp');
            $('.Navigation').css('transform', 'translateX(calc(18px - 100%))');
        }
    }

    render() {
        return (
            <nav className={this.state.nav ? "Navigation Navigation--open" : "Navigation"}>
                <div className="Navigation__container">
                    <div className="Navigation__main">
                        <div className="Navigation__header">
                            <Link onClick={this.handleClickLink} to="/" className="Navigation__header-logo">
                                <Logo />
                            </Link>
                            <Link onClick={this.handleClickLink} to="/dictionnary" className="Navigation__header-box">
                                <WordBox />
                            </Link>
                        </div>
                        <ul className="Navigation__items">
                            <li className="Navigation__item">
                                <Link onClick={this.handleClickLink} to='/' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>01</span>
                                            accueil
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link onClick={this.handleClickLink} to='/catalogue' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>02</span>
                                            épisodes
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link onClick={this.handleClickLink} to='/anecdotes' className="item__link">
                                    <div className="item__content">
                                        <div className="item__name">
                                            <span>03</span>
                                            anecdotes
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <li className="Navigation__item">
                                <Link onClick={this.handleClickLink} to='/about' className="item__link">
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
                    <div className={this.state.nav ? this.closeNav : this.openNav}
                         onClick={this.handleClick}
                         onMouseEnter={this.handleActionHover}
                         onMouseLeave={this.handleActionHoverLeaver} >
                        <div className="Navigation__action-cta">+</div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Navigation;