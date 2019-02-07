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

    handleClickSkipIntro = () => {
        $('.Introduction__step--current').removeClass('Introduction__step--current');
        $('.Introduction__episode').addClass('Introduction__step--current');
    }

    nextIntroductionStep = () => {
        var $currentIntroStep = $('.Introduction__step--current');
        var $nextIntroStep = $currentIntroStep.next();

        $currentIntroStep.toggleClass('Introduction__step--current');
        $nextIntroStep.toggleClass('Introduction__step--current');

        if($currentIntroStep.hasClass('Introduction__instruction')){

        }

    }

    render() {
        return(
            <div className="Introduction">
                <div className="Introduction__container">
                    <div className="Introduction__step Introduction__jingle Introduction__step--current">
                        <Jingle />
                        <button className="Introduction__jingle__cta"
                                onClick={this.handleClickSkipIntro}>
                            Passer l'intro
                        </button>
                        <button onClick={this.nextIntroductionStep}>next</button>
                    </div>
                    <div className="Introduction__step Introduction__instruction">
                        <Instructions />
                    </div>
                    <div className="Introduction__step Introduction__episode">
                        <EpisodeSelection onButtonPressed={this.props.onClickStartEpisode} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Introduction;