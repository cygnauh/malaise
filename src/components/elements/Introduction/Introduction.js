import React, { Component } from 'react';
import "./style.scss";
import Jingle from "../Jingle/Jingle";
import EpisodeSelection from "../EpisodeSelection/EpisodeSelection";
import Instructions from "../Instructions/Instructions";

class Introduction extends Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div className="Introduction">
                <div className="Introduction__container">
                    <div className="Introduction__jingle">
                        <Jingle />
                        <button className="Introduction__jingle__cta">Passer le jingle</button>
                    </div>
                    <div className="Introduction__episode">
                        <EpisodeSelection />
                    </div>
                    <div className="Introduction__instruction">
                        <Instructions />
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;