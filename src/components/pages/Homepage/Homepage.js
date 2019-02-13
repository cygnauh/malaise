import React, { Component } from 'react';
import "./style.scss";
import $ from 'jquery';
import SoundAlert from "../../elements/SoundAlert/SoundAlert";
import AnimLogo from "../../elements/AnimLogo/AnimLogo";
import Lottie from 'react-lottie';
import animationHome from '../../../assets/animation/03';
import { SoundContext } from "../../../store/SoundProvider";
import Introduction from "../../elements/Introduction/Introduction";
import Logo from "../../SVG/Logo/Logo";
import EmojiSmile from "../../SVG/EmojiSmile/EmojiSmile";

class Homepage extends Component {

    constructor(props) {
        super(props);
        $('.Header').css('display', 'none');
        this.state = {
            instructions: false,
            currentPage : '1'
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationHome,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        }
    }

    handleClickStart = () => {
        this.setState ({
            instructions:true
        });
    };

    handleClickNext = () => {
        this.toggleInstruction();
    };

    handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.toggleInstruction();
        }
        if(e.keyCode === 40) {
            this.toggleInstruction();
        }
    };

    toggleInstruction = () => {
        let $currentInstruction = $('.instructions__content').find('.instructions__text--current');
        let $nextInstruction = $currentInstruction.next();

        let nextPage = $nextInstruction.data('step');

        $currentInstruction.toggleClass('instructions__text--current');
        $nextInstruction.toggleClass('instructions__text--current');

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
                <div className="Home__onMobile">
                    <div className="Home__onMobile__container">
                        <div className="Home__onMobile__logo">
                            <Logo />
                        </div>
                        <p className="Home__onMobile__description"></p>
                        <div className="Home__onMobile__box">
                            <p className="box__description">Le podcast interactif qui revient sur les mots qui dérangent.<br /><br />Pour vivre l'expérience, rendez-vous sur ton ordinateur.</p>
                            <div className="box__icon">
                                <EmojiSmile />
                            </div>
                        </div>
                    </div>
                    {/*<div className="Home__alert">
                        <p className="Home__alert-text" data-text="Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! "> Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur ! Malaise se lance sur ordinateur !</p>
                    </div>*/}
                </div>
                <div className={this.state.instructions ? "Home__background-animation Home__hide" : "Home__background-animation"} >
                    <Lottie options={this.defaultOptions} />
                </div>
                <div className="Home__container">
                    <div className="Home__center">
                        <div className={this.state.instructions ? "Home__content Home__hide" : "Home__content"}>
                            <div className="Home__logo">
                                <Logo />
                            </div>
                            <p className="Home__description">Le podcast qui revient sur les mots qui dérangent</p>
                            <div className="Home__sound">
                                <SoundAlert />
                            </div>
                            <button className="Home__start" onClick={this.handleClickStart}>démarrer l'expérience</button>
                        </div>
                        <div className={this.state.instructions ? "Home__instructions" : "Home__instructions  Home__hide"}>
                            <Introduction onClickStartEpisode={this.props.onButtonPressed} startedJingle = {this.state.instructions}/>
                        </div>
                    </div>
                    {/*<div className="Home__alert">
                        <p className="Home__alert-text" data-text="nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! "> nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode !</p>
                    </div>*/}
                </div>
            </div>
        );
    }
}
Homepage.contextType = SoundContext;
export default Homepage;