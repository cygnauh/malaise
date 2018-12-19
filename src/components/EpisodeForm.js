import React, { Component } from 'react';

// waiting for props Data ( getEpisodes : allEpisodes )
// if no props : loader
// if props : display question
// on question entered, filter the props data object to display next question

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes
        };
        console.log(this.state.data)
    }

    render() {
        return (
            <div className="episodeForm">
                {this.state.data? <p>{this.state.data[0].entourage}</p> : null}
            </div>
        )
    }
}

export default EpisodeForm;
