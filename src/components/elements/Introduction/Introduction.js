import React, { Component } from 'react';
import "./style.scss";
import Jingle from "../Jingle/Jingle";
import EpisodeSelection from "../EpisodeSelection/EpisodeSelection";
import Instructions from "../Instructions/Instructions";
import $ from 'jquery';
import { SoundContext } from "../../../store/SoundProvider";

class Introduction extends Component {

    constructor(props){
        super(props);
        this.state = {
            instructions: false,
            jingle: true,
            episode: false,
            jingleSound: ''
        }
    }

    componentDidMount(){
        this.setState({
            jingleSound: this.context.playJingle()
        })
    }

    componentWillReceiveProps() {
        setTimeout(() => {
            this.setState({
                start:true
            });
            if(this.state.start && this.props.startedJingle){
                this.state.jingleSound.play(); // TODO uncomment
            }
        }, 1500);
    }

    handleClickSkipIntro = () => {
        $('.Introduction__step--current').removeClass('Introduction__step--current');
        $('.Introduction__episode').addClass('Introduction__step--current');
        this.state.jingleSound.stop();
    }

    nextIntroductionStep = () => {
        var $currentIntroStep = $('.Introduction__step--current');
        var $nextIntroStep = $currentIntroStep.next();

        if($nextIntroStep.hasClass('Introduction__instruction')){
            this.setState({
                instructions: true,
                jingle: false
            }, () => {
                this.setState({
                    instructions: true,
                    jingle: false
                })
            })
        }

        if(!$currentIntroStep.is(':last-child')) {
            $currentIntroStep.toggleClass('Introduction__step--current');
            $nextIntroStep.toggleClass('Introduction__step--current');
        }

    }

    render() {
        return(
            <div className="Introduction">
                <div className="Introduction__container">
                    <div className="Introduction__step Introduction__jingle Introduction__step--current">
                        <div className="Introduction__step__container">
                            {this.state.jingle && this.props.startedJingle ?
                                <Jingle
                                launchLottie={this.props.startedJingle}
                                onEnd={this.nextIntroductionStep}
                                />
                                : null
                            }
                            <button className="Introduction__jingle__cta"
                                    onClick={this.handleClickSkipIntro}>
                                Passer l'intro
                            </button>
                        </div>
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

Introduction.contextType = SoundContext;
export default Introduction;