import React, { Component } from 'react';
import './style.scss';

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
    displayEpisodes() {
        let episodes = []; // return in the render
        // places display all places from data base
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
            <div className="Catalogue">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

                    <div className="Catalogue__container">
                        {this.displayEpisodes()}
                    </div>

                    : null}
            </div>
        )
    }
}

export default EpisodeForm;
