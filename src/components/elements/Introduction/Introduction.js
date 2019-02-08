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
            instructions: false
        }
    }

    handleClickSkipIntro = () => {
        $('.Introduction__step--current').removeClass('Introduction__step--current');
        $('.Introduction__episode').addClass('Introduction__step--current');
    }

    nextIntroductionStep = () => {
        var $currentIntroStep = $('.Introduction__step--current');
        var $nextIntroStep = $currentIntroStep.next();

        if($nextIntroStep.hasClass('Introduction__instruction')){
            console.log('has instruction');
            this.setState({
                instructions: true
            }, () => {
                this.setState({
                    instructions: true
                })
            })
        }

        $currentIntroStep.toggleClass('Introduction__step--current');
        $nextIntroStep.toggleClass('Introduction__step--current');

    }

    render() {
        return(
            <div className="Introduction">
                <div className="Introduction__container">
                    <div className="Introduction__step Introduction__jingle Introduction__step--current">
                        <div className="Introduction__step__container">
                            <Jingle />
                            <button className="Introduction__jingle__cta"
                                    onClick={this.handleClickSkipIntro}>
                                Passer l'intro
                            </button>
                        </div>
                        <button onClick={this.nextIntroductionStep}>next</button>
                    </div>
                    <div className="Introduction__step Introduction__instruction">
                        <div className="Introduction__step__container">
                            <Instructions onEnd={this.nextIntroductionStep} startInstruction={this.state.instructions ? this.state.instructions : null}/>
                        </div>
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