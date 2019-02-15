import React, { Component } from 'react';
import './style.scss';
import EmojiSad from "../../SVG/EmojiSad/EmojiSad";

class Error404 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notice : ''
        }
    }

    render() {
        return (
            <div className="Error404">
                <div className="Error404__container">
                    <h1 className="Error404__title">4<span><EmojiSad /></span>4</h1>
                    <p className="Error404__description">La page que tu cherches n'exciste pas.</p>
                    <button className="Error404__action">Retour à l'accueil</button>
                </div>
            </div>
        )
    }
}

export default Error404;