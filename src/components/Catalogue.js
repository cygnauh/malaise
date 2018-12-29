import React, { Component } from 'react';
import '../assets/styles/catalogue.css';

// this component help to display all episodes

// 1) waiting for props Data ( getEpisodes : allEpisodes )


class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            episodeSelected:null
        };
    }
    displayEpisode() {
        let episodes = []; // return in the render
        // locations display all locations from data base
        for(let i=0; i<this.state.data.length; i++){
            episodes.push(
                <div key={i.toString()}
                     className={this.state.data[i].id === this.state.episodeSelected ? 'episode-container selected': 'episode-container'}

                     onClick={()=> this.onEpisodeSelected(this.state.data[i].id)}>
                    <h2 className="episode-title">
                        {this.state.data[i].title}
                    </h2>
                    <span>
                        Description :
                    </span>
                    {this.state.data[i].summary}
                    </div>)
        }
        // entourages, display according to

        return episodes
    }
    onEpisodeSelected(id){
        this.setState({
            episodeSelected: id
        })
    }
    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

// THIS IS AN UGGLY TEST
                    <div className="catalogue-container">
                        {this.displayEpisode()}
                    </div>


                    : null}
                    <button className="episode-validation">Valider</button>
            </div>
        )
    }
}

export default EpisodeForm;
