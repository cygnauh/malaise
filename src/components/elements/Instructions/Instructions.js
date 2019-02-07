import React, { Component } from 'react';
import "./style.scss";

class Instructions extends Component {

    constructor(props){
        super(props);

    }



    render() {
        return(
            <div className="Instructions">
                <div className="Instructions__container">
                    <div className="Instruction Instruction--current" data-step="1">Bienvenue dans un nouvel épisode de malaise.</div>
                    <div className="Instruction" data-step="2" data-notice="Les indications seront affichées ici !">Laisse toi guider et suis les indications en bas de l'écran.</div>
                    <div className="Instruction" data-step="3">Pour une meilleure expérience, il est préférable de brancher ton casque.</div>
                </div>
            </div>
        )
    }
}

export default Instructions;