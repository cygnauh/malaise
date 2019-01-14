// this component help to display the form to the user
// 1) waiting for props Data ( getEpisodes : allEpisodes )
// 2) if no props : loader
// 3) if props : display question
// 4) on question entered, filter the props data object to display next question
// 5) handle questions in a JSON maybe.
// 6) add to the store the episode option chosen
// 7) display the selected

import React, { Component } from 'react';
import { UserContext } from "../store/UserProvider";
import { SoundContext } from "../store/SoundProvider";
import { getPlaceSounds } from '../graphql/queries'
import { Query } from "react-apollo";
import ReactFullpage from '@fullpage/react-fullpage';
import Personalization from "./Personalization";
import './episodeForm.scss';

const pluginWrapper = () => {
    require('fullpage.js/vendors/scrolloverflow');
};
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
            episodeId:null
        };
    }
    componentDidMount(){
        this.formatPlaces()
    }
    // componentWillMount(){
    //     console.log(this.state.episodes);
    // }
    formatPlaces = () => { //remove the doublon place & extract places sounds TODO remove cl
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
                    <div key={i.toString()}
                         className={this.state[value+'Selected'] === this.state[value][i] ?
                             'episode__form__option selected': 'episode__form__option'}
                         onClick={() => this.onClickOption(this.state[value][i], value)}>
                        {this.state[value][i]}
                    </div>
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
                    console.log(this.state.placesSounds[i].type)
                }
            }
            this.setState({placeSelected: value},()=>{
                //send to SoundProvider the sound
                this.context.registerPlaceSound(placeSound);
                this.showEntourageRelated()
            });
        } else {
            this.setState({entourageSelected: value}, ()=>console.log(value, "value"));
        }
    };
    showEntourageRelated = () => {
        let array = [];
        for(let i=0; i<this.state.episodes.length; i++){
            if(this.state.episodes[i].place === this.state.placeSelected){
                if(array.indexOf(this.state.episodes[i].entourage)===-1){ // TODO remove doublon
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

    playplaceSoundSelected = () => {
       // this.context.loadSound(data);

    };
    render() {
        return (
            <div className="episodeForm">
                {!this.state.episodes? <p>data is loading, please make a loader</p> : null}
                {this.state.episodes?
                    <ReactFullpage
                        pluginWrapper={pluginWrapper}
                        render={(fullpageApi) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    <div className="episodeForm__step section" data-step="1">
                                        <h2>Comment tu te sens ?</h2>
                                        <div>
                                            <span>Fatigué(e)</span>
                                            <input type="range" min="0" max="4" step={"1"}
                                                   value={this.state.value} onChange={this.handleChange} />
                                            <span>Super bien</span>
                                        </div>
                                        <button className="btn btn__next-step">Suivant</button>
                                     </div>
                                    <div className="episodeForm__step section" data-step="2">
                                        <h2>Où veux-tu aller ?</h2>
                                        <div>{this.createOption('place')}</div>
                                        <button className="btn btn__next-step">Suivant</button>
                                    </div>
                                    <div className="episodeForm__step section" data-step="3">
                                        <UserContext.Consumer>
                                            {({episode, setEpisode}) => (
                                                <div>
                                                    <div>
                                                        <h2> Avec qui ?</h2>
                                                        {this.createOption('entourage')}
                                                        <button
                                                            className="btn btn__form-validation"
                                                            onClick={()=>setEpisode(this.validateLastQuestion({id:'test'}))}>
                                                            Valider
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </UserContext.Consumer>
                                    </div>
                                </ReactFullpage.Wrapper>
                            );
                        }}
                    />
                    : null}
            </div>
        )
    }
}

EpisodeForm.contextType = SoundContext;
export default EpisodeForm;
