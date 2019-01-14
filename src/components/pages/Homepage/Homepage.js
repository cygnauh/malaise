import React, { Component } from 'react';
import "./style.scss";
import Navigation from "../../layout/Navigation/Navigation";
import SoundAlert from "../../elements/SoundAlert/SoundAlert";

class Homepage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            instructions: false
        };
    }

    componentDidMount = () => {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount = () => {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleClickStart = (e) => {
        console.log('start');
        this.setState ({
            instructions:true
        });
    }

    handleScroll = (e) => {
        console.log(e);
    }

    render() {
        return (
            <div className="Home">
                <div className="Home__container">
                    {/*<div className="Home__alert">
                        <p className="Home__alert-text" data-text="nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! "> nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode ! nouvel épisode !</p>
                    </div>*/}
                    <div className="Home__center">
                        <div className={this.state.instructions ? "Home__content Home__hide" : "Home__content"}>
                            <img className="Home__logo" src={require('../../../assets/icons/logo__white.png')} />
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
                                        <div className="pagination__pageLength">4</div>
                                    </div>
                                </div>
                                <div className="instructions__content">
                                    <div className="instructions__text" data-step="1">Malaise vous invite à vivre une expérience immersive à travers différents épisodes interactifs.</div>
                                    <div className="instructions__text" data-step="2">Au fil de l'expérience, vous rencontrerez des termes spécifiques à l'épisode qui se glisseront dans une boîte à mots.</div>
                                    <div className="instructions__text" data-step="3">Laissez vous guider et suivez les indications en bas de l'écran, tout au long de l'expérience.</div>
                                    <div className="instructions__text" data-step="4"><SoundAlert /></div>
                                </div>
                                <div className="instructions__icon">arrow</div>
                                <button className="instructions__next" onClick={this.props.onButtonPressed}>next</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Homepage;