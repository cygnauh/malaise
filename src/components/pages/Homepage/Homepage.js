import React, { Component } from 'react';
import "./style.scss";
import $ from 'jquery';
import SoundAlert from "../../elements/SoundAlert/SoundAlert";
import AnimLogo from "../../elements/AnimLogo/AnimLogo";
import Lottie from 'react-lottie';
import animationHome from '../../../assets/animation/03';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: false
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationHome,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
        this.state = {
            currentPage : '1'
        }
    }

    handleClickStart = (e) => {
        this.setState ({
            instructions:true
        });
    }

    handleClickNext = () => {
        this.toggleInstruction();
    }

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.toggleInstruction();
        }
        if(e.keyCode === 40) {
            this.toggleInstruction();
        }
    }

    toggleInstruction = () => {
        var $currentInstruction = $('.instructions__content').find('.instructions__text--current');
        var $nextInstruction = $currentInstruction.next();

        $currentInstruction.toggleClass('instructions__text--current');
        $nextInstruction.toggleClass('instructions__text--current');

        var nextPage = $nextInstruction.data('step');

        setTimeout(() => {
            this.setState({
                currentPage : nextPage
            });
        }, 1000)


        if($currentInstruction.is(':last-child')) {
            $('.instructions__process').toggleClass('instructions__hide');
            $('.instructions__end').toggleClass('instructions__hide');
        }
    }

    render() {
        return (
            <div className="Home" onKeyDown={this.handleKeyDown}>
                <div className={this.state.instructions ? "Home__background-animation Home__hide" : "Home__background-animation"} >
                    <Lottie options={this.defaultOptions} />
                </div>
                <div className="Home__container">
                    {/*<div className="Home__alert">
                        <p className="Home__alert-text" data-text="nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! "> nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode !</p>
                    </div>*/}
                    <div className="Home__center">
                        <div className={this.state.instructions ? "Home__content Home__hide" : "Home__content"}>
                            <div className="Home__logo">
                                <AnimLogo />
                            </div>
                            <p className="Home__description">Une websérie immersive sonore qui vous plonge au coeur d'histoires et d'anecdotes du quotidien.</p>
                            <div className="Home__sound">
                                <SoundAlert />
                            </div>
                            <button className="Home__start" onClick={this.handleClickStart}>démarrer l'expérience</button>
                        </div>
                        <div className={this.state.instructions ? "Home__instructions" : "Home__instructions  Home__hide"}>
                            <div className="instructions">
                                <div className="instructions__container">
                                    <div className="instructions__process">
                                        <div className="instructions__pagination">
                                            <div className="pagination">
                                                <div className="pagination__currentPage">{this.state.currentPage }</div>
                                                <div className="pagination__pagesLength">3</div>
                                            </div>
                                        </div>
                                        <div className="instructions__content" ref={this.instructions}>
                                            <div className="instructions__text instructions__text--current" data-step="1">Malaise t'invite à vivre une expérience immersive à travers différents épisodes interactifs.</div>
                                            <div className="instructions__text" data-step="2">Laisse toi guider et suis les indications en bas de l'écran.</div>
                                            <div className="instructions__text" data-step="3">Au fil de l'expérience, tu rencontreras des termes spécifiques à l'épisoqes qui se glisseront dans la boîte à mots.</div>
                                        </div>
                                        <button className="instructions__arrow" onClick={this.handleClickNext}><img alt="Instruction suivante" src={require('../../../assets/icons/arrows/arrow_down.svg')}/></button>
                                    </div>
                                    <div className="instructions__end instructions__hide">
                                        <SoundAlert />
                                        <button className="instructions__next" onClick={this.props.onButtonPressed}>continuer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;