import React, { Component } from 'react';
import "./style.scss";
import SoundAlert from "../../elements/SoundAlert/SoundAlert";
import AnimLogo from "../../elements/AnimLogo/AnimLogo";
import Lottie from 'react-lottie';
import animationHomeBG3 from '../../../assets/animation/01';
import animationHomeBG4 from '../../../assets/animation/02';

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: false
        };
        this.defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: animationHomeBG3,
            propsrendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };
    }

    handleClickStart = (e) => {
        this.setState ({
            instructions:true
        });
    }

    render() {
        return (
            <div className="Home">
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
                                <div className="instructions__pagination">
                                    <div className="pagination">
                                        <div className="pagination__currentPage">1</div>
                                        <div className="pagination__pagesLength">3</div>
                                    </div>
                                </div>
                                <div className="instructions__content">
                                    <div className="instructions__text" data-step="1">Malaise vous invite à vivre une expérience immersive à travers différents épisodes interactifs.</div>
                                    {/*<div className="instructions__text" data-step="2">Au fil de l'expérience, vous rencontrerez des termes spécifiques à l'épisode qui se glisseront dans une boîte à mots.</div>
                                    <div className="instructions__text" data-step="3">Laissez vous guider et suivez les indications en bas de l'écran, tout au long de l'expérience.</div>
                                    <div className="instructions__text" data-step="4"><SoundAlert /></div>*/}
                                </div>
                                <div className="instructions__icon">arrow</div>
                                <button className="instructions__next" onClick={this.props.onButtonPressed}>continuer</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;