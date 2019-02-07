import React, { Component } from 'react';
import "./style.scss";
import Jingle from "../Jingle/Jingle";
import EpisodeSelection from "../EpisodeSelection/EpisodeSelection";
import Instructions from "../Instructions/Instructions";
import $ from 'jquery';

class Introduction extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentPage : '1'
        };
    }

    handleClickSkipJingle = (e) => {
        this.nextIntroductionStep();
    }

    nextIntroductionStep = () => {
        console.log('next step');

        var $currentIntroStep = $('.Introduction__step--current');
        var $nextIntroStep = $currentIntroStep.next();

        $currentIntroStep.toggleClass('Introduction__step--current');
        $nextIntroStep.toggleClass('Introduction__step--current');

    }

    handleClickNextIntroStep = () => {
        this.nextIntroductionStep();
    }

    render() {
        return(
            <div className="Introduction">
                <div className="Introduction__container">
                    <div className="Introduction__step Introduction__jingle Introduction__step--current">
                        <Jingle />
                        <button className="Introduction__jingle__cta"
                                onClick={this.handleClickSkipJingle}>
                            Passer le jingle
                        </button>
                    </div>
                    <div className="Introduction__step Introduction__episode">
                        <EpisodeSelection onButtonPressed={this.handleClickNextIntroStep} />
                    </div>
                    <div className="Introduction__step Introduction__instruction">
                        <Instructions />
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;