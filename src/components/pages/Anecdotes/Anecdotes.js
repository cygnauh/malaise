import React, { Component } from 'react';
import './style.scss';


class Anecdotes extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        };
    }

    handleClickToOpen = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        return (
            <div className="Anecdotes">
                <div className="Anecdotes__container">
                    <div className={this.state.open ? 'Anecdote-toShare Anecdote-toShare--open': 'Anecdote-toShare'}>
                        <div className="Anecdote-toShare__column">
                            <h2 className="Anecdote-toShare__title">Partage <br/>ton anecdote</h2>
                            <p className="Anecdote-toShare__description">
                                In hac habitasse platea dictumst.
                                Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                                Vivamus adipiscing fermentum quam volutpat aliquam.
                            </p>
                            <button className={this.state.open ? 'Anecdote-toShare__cta Anecdote-toShare__cta--hidden': 'Anecdote-toShare__cta'} onClick={this.handleClickToOpen}>Raconte ton anecdote</button>
                        </div>
                        <div className="Anecdote-toShare__column">
                            <form className="Anecdote-toShare__shareForm">
                                <div className="shareForm__field">
                                    <input className="shareForm__input" placeholder="pseudo" />
                                </div>
                                <div className="shareForm__field">
                                    <textarea className="shareForm__textarea"></textarea>
                                    <span>700 caractères maximum</span>
                                </div>
                                <button type="submit" className="shareForm__cta">Envoyer</button>
                            </form>
                        </div>
                    </div>
                    <div className="Anecdote">
                        <div className="Anecdote__top">
                            <div className="Anecdote__author">anonyme</div>
                            <div className="Anecdote__line"></div>
                            <div className="Anecdote__date">27.02.2019</div>
                        </div>
                        <p className="Anecdote__story">
                            In hac habitasse platea dictumst.
                            Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                            Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst. Vivamus adipiscing fermentum quam volutpat aliquam. In hac habitasse platea dictumst.
                            Vivamus adipiscing fermentum quam volutpat aliquam.Hinc ille commotus ut iniusta perferens et indigna praefecti custodiam protectoribus mandaverat fidis. quo conperto Montius tunc quaestor acer quidem se
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Anecdotes;
