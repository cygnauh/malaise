import React, { Component } from 'react';
import "./style.scss";
import Navigation from "../../layout/Navigation/Navigation";
import SoundAlert from "../../elements/SoundAlert/SoundAlert";

class Homepage extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <div className="Home">
                <Navigation/>
                <div className="Home__container">
                    <div className="Home__alert">
                        <p className="Home__alert-text" data-text="nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! "> nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode !</p>
                    </div>
                    <div className="Home__center">
                        <div className="Home__content">
                            <img className="Home__logo" src={require('../../../assets/icons/logo__white.png')} />
                            <p className="Home__description">Une websérie immersive sonore qui vous plonge au coeur d'histoires et d'anecdotes du quotidien.</p>
                            <div className="Home__sound">
                                <SoundAlert />
                            </div>
                            <button className="Home__start">démarrer l'expérience</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;