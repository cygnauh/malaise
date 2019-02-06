import React, { Component } from 'react';
import { UserContext } from "../store/UserProvider";
import { SoundContext } from "../store/SoundProvider";
import $ from 'jquery';
import './episodeForm.scss';

// this component help to display the form to the user
// 1) waiting for props Data ( getEpisodes : allEpisodes )
// 2) if no props : loader
// 3) if props : display question
// 4) on question entered, filter the props data object to display next question
// 5) handle questions in a JSON maybe.
// 6) add to the store the episode option chosen
// 7) display the selected

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            episodes:this.props.episodes.allEpisodes,
            sounds:this.props.episodes.allSounds,
            entourage:[],
            places:[],
            placeSelected:null,
            entourageSelected:null,
            placesSounds:[],
            episodeId:null,
            currentPage: '1',
            userName: ''
        };
    }
    componentDidMount(){
        this.formatPlaces()
    }

    formatPlaces = () => { //remove the place duplication & extract places sounds
        let array = [];
        let placeSounds = [];
        if(this.state.episodes){
            for(let i=0; i<this.state.episodes.length; i++){
                if(array.indexOf(this.state.episodes[i].place)===-1){
                    array.push(this.state.episodes[i].place)
                }
            }
            this.setState({place: array});
        }
        if(this.state.sounds){
            for(let i=0; i<this.state.sounds.length; i++){
                if(this.state.sounds[i].type === "place"){
                    placeSounds.push(this.state.sounds[i])
                }
            }
            this.setState({placesSounds: placeSounds}, ()=>{
                console.log(this.state.placesSounds)
            });
        }
    };
    createOption = (value) => {
        let options = []; // return in the render
        // places display all places from data base
        if(this.state[value]){
            for(let i=0; i<this.state[value].length; i++){
                options.push(
                    <li className="form__select-item" key={i.toString()}>
                        <div className={this.state[value+'Selected'] === this.state[value][i] ?
                                 'selected': null}
                             onClick={() => this.onClickOption(this.state[value][i], value)}>{this.state[value][i]}</div>
                    </li>
                )
            }
        }
        // entourages, display according to
        return options
    };

    onClickOption = (value, option) => {
        let placeSound = [];
        if(option === 'place' && this.state.placesSounds) {
            for(let i=0; i<this.state.placesSounds.length; i++){
                if(this.state.placesSounds[i].name === value){
                    placeSound=this.state.placesSounds[i];
                }
            }
            this.setState({placeSelected: value},()=>{
                //send to SoundProvider the sound
                this.context.registerPlaceSound(placeSound);
                this.showEntourageRelated()
            });
        } else {
            this.setState({entourageSelected: value});
        }
    };
    showEntourageRelated = () => {
        let array = [];
        for(let i=0; i<this.state.episodes.length; i++){
            if(this.state.episodes[i].place === this.state.placeSelected){
                if(array.indexOf(this.state.episodes[i].entourage)===-1){ // TODO remove dupplication
                    array.push(this.state.episodes[i].entourage)
                }
            }
        }
        this.setState({entourage: array});
    };
    getEpisode = () => {
        let episode = null;
        for(let i=0; i<this.state.episodes.length; i++){
            if(this.state.placeSelected === this.state.episodes[i].place
                && this.state.entourageSelected === this.state.episodes[i].entourage){
                episode = this.state.episodes[i]
            }
        }
        return episode
    };
    validateLastQuestion = () => {
        let episode = this.getEpisode();
        this.setState({episodeId: episode});
        return episode
    };
    handleClickNext = () => {
        this.toggleStep();
    }

    handleKeyPress = (e) => {
        console.log(e);
        if (e.key === 'Enter') {
            this.toggleStep();
        }
        if(e.key === '39') {
            this.toggleStep();
        }
    }

    handleOnChange = (e) => {
        this.setState({
            userName: e.target.value
        });
    }

    toggleStep = () => {
        var $currentFormStep = $('.episodeForm__content').find('.episodeForm__form--current');
        var $nextFormStep = $currentFormStep.next();

        if($currentFormStep.find('.form__select').length > 0 && $currentFormStep.find('.form__select .selected').length < 1) {
            $('.episodeForm__empty').toggleClass('episodeForm__empty--hide');
        } else {
            if (!$('.episodeForm__empty').hasClass('episodeForm__empty--hide')){
                $('.episodeForm__empty').addClass('episodeForm__empty--hide');
            };
            $currentFormStep.toggleClass('episodeForm__form--current');
            $nextFormStep.toggleClass('episodeForm__form--current');

            var nextPage = $nextFormStep.data('step');

            setTimeout(() => {
                this.setState({
                    currentPage : nextPage
                });
            }, 1000);

            if($nextFormStep.is(':last-child') || $currentFormStep.is(':first-child')) {
                $('.episodeForm__action').toggleClass('episodeForm__hide');
            }
        }
    }

    render() {
        return (
            <div className="episodeForm">
                {!this.state.episodes? <p>Data is loading, please make a loader</p> : null}
                {this.state.episodes?
                    <div className="episodeForm__container">
                        <div className="episodeForm__pagination">
                            <div className="pagination">
                                <div className="pagination__currentPage">{this.state.currentPage }</div>
                                <div className="pagination__pagesLength">4</div>
                            </div>
                        </div>
                        <div className="episodeForm__content">
                            <div className="episodeForm__form episodeForm__form--current form" data-step="1">
                                <div className="form__label">Comment <br /> tu t'appelles ?</div>
                                <div className="form__container form__margin">
                                    <UserContext.Consumer>
                                        {({userName, setUserName}) => (
                                            <div className="form__column">
                                                <input className="form__input form__input--empty"
                                                       type="text"
                                                       placeholder="ton pseudo"
                                                       maxLength="10"
                                                       required
                                                       onKeyPress={(e) => { setUserName(this.state.userName); this.handleKeyPress(e)}}
                                                       onChange={this.handleOnChange}></input>
                                                <button className="form__btn form__next" onClick={() => { setUserName(this.state.userName); this.handleClickNext()}}>ok</button>
                                            </div>
                                        )}
                                    </UserContext.Consumer>

                                </div>
                            </div>
                            <div className="episodeForm__form form" data-step="2">
                                <div className="form__label">Salut {this.state.userName} ! <br /> Tu te sens plutôt...</div>
                                <div className="form__container form__margin">
                                    <div className="form__range">
                                        <span>fatigué(e)</span>
                                        <input type="range" min="0" max="4" step={"1"} value={this.state.value} onChange={this.handleChange} />
                                        <span>en pleine forme</span>
                                    </div>
                                </div>
                            </div>
                            <div className="episodeForm__form form" data-step="3">
                                <div className="form__label">Tu veux faire quoi ?</div>
                                <div className="form__container">
                                    <ul className="form__select">
                                        {this.createOption('place')}
                                    </ul>
                                </div>
                            </div>
                            <div className="episodeForm__form form" data-step="4">
                                <UserContext.Consumer>
                                    {({episode, setEpisode}) => (
                                        <div>
                                            <div className="form__label">Avec qui veux-tu <br />y aller ?</div>
                                            <div className="form__container">
                                                <ul className="form__select">
                                                    {this.createOption('entourage')}
                                                </ul>
                                            </div>
                                            <button
                                                className="form__validation"
                                                onClick={()=>setEpisode(this.validateLastQuestion({id:'test'}))}>
                                                Valider
                                            </button>
                                        </div>
                                    )}
                                </UserContext.Consumer>
                            </div>
                        </div>
                        <div className="episodeForm__action episodeForm__hide">
                            <div className="episodeForm__empty episodeForm__empty--hide">Oops, tu as oublié de répondre à la question !</div>
                            <button className="episodeForm__next" onClick={this.handleClickNext}>
                                <img alt="Prochaine étape" src={require('../assets/icons/arrows/arrow_right.svg')} />
                            </button>
                        </div>
                    </div>
                    : null}
            </div>
        )
    }
}

EpisodeForm.contextType = SoundContext;
export default EpisodeForm;
