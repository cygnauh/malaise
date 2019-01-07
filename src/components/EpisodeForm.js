import React, { Component } from 'react';
import { UserContext } from "../store/UserProvider";
import '../assets/styles/episodeForm.css';
import ReactFullpage from '@fullpage/react-fullpage';

// this component help to display the form to the user

// 1) waiting for props Data ( getEpisodes : allEpisodes )
// 2) if no props : loader
// 3) if props : display question
// 4) on question entered, filter the props data object to display next question
// 5) handle questions in a JSON maybe.
// 6) add to the store the episode option chosen
// 7) display the selected

//<p>
    //{this.state.data[0].entourage}
//</p>

const pluginWrapper = () => {
    require('fullpage.js/vendors/scrolloverflow');
};

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            entourage:[],
            location:[],
            locationSelected:null,
            entourageSelected:null,
            episodeId:null
        };
    }
    componentDidMount(){
        this.formatLocations()
    }
    createOption = (value) => {
        let options = []; // return in the render
        // locations display all locations from data base
        for(let i=0; i<this.state[value].length; i++){
            options.push(
                <div key={i.toString()}
                     className={this.state[value+'Selected'] === this.state[value][i] ? 'selected': null}
                     onClick={() => this.onClickOption(this.state[value][i], value)}>
                    {this.state[value][i]}
                    </div>)
        }
        // entourages, display according to
        return options
    };
    onClickOption = (value, option) => {
        if(option === 'location') {
            this.setState({
                locationSelected: value
            });
            this.selectEntourage(value)

        } else {
            this.setState({
                entourageSelected: value
            });
        }
        // setTimeout(()=>{
            // console.log(value)
        // }, 0)
    };
    formatLocations = () => { //remove the doublon location
        let array = [];
        for(let i=0; i<this.state.data.length; i++){
            if(array.indexOf(this.state.data[i].location)===-1){
                array.push(this.state.data[i].location)
            }
        }
        this.setState({
            location: array
        });
        // setTimeout(()=>{
        //     console.log(this.state.location)
        // }, 0)
    };
    selectEntourage = (location) => {
        let array = [];
        for(let i=0; i<this.state.data.length; i++){
            if(this.state.data[i].location === location){
                console.log(this.state.data[i].entourage);
                array.push(this.state.data[i].entourage)
            }
        }
        this.setState({
            entourage: array
        });
    };
    getEpisode = () => {
        let episode = null;
        for(let i=0; i<this.state.data.length; i++){
            if(this.state.locationSelected === this.state.data[i].location
                && this.state.entourageSelected === this.state.data[i].entourage){
                episode = this.state.data[i]
            }
        }
        return episode
    };
    validateLastQuestion = () => {
        let episode = this.getEpisode();
        this.setState({
            episodeId: episode
        });
        console.log(episode)
        return episode
    };
    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

                    <ReactFullpage
                        pluginWrapper={pluginWrapper}
                        render={(fullpageApi) => {
                            return (
                                <ReactFullpage.Wrapper>
                                    <div className="episodeForm__step section" data-step="1">
                                        <h2>Comment vas-tu ?</h2>
                                        <div>
                                            <span>Fatigué(e)</span>
                                            <input type="range" min="0" max="4" step={"1"} value={this.state.value} onChange={this.handleChange} />
                                            <span>Super bien</span>
                                        </div>
                                        <button className="btn btn__next-step">Suivant</button>
                                     </div>
                                    <div className="episodeForm__step section" data-step="2">
                                        <h2>Où veux-tu aller ?</h2>
                                        <div>{this.createOption('location')}</div>
                                        <button className="btn btn__next-step">Suivant</button>
                                    </div>
                                    <div className="episodeForm__step section" data-step="3">
                                        <h2> Avec qui ?</h2>
                                        <div>{this.createOption('entourage')}</div>
                                        <button className="btn btn__form-validation" onClick={()=>this.validateLastQuestion({id:'test'})}>Valider</button>
                                    </div>
                                    <div className="episodeForm__step section">
                                        <UserContext.Consumer>
                                            {({episode, setEpisode}) => (
                                                <div>
                                                    <div>
                                                        <h2> Avec qui ?</h2>
                                                        {this.createOption('entourage')}
                                                        <button onClick={()=>setEpisode(this.validateLastQuestion())}>Valider</button>
                                                    </div>
                                                    <h1>this episode title is {episode.id}!</h1>
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

export default EpisodeForm;
