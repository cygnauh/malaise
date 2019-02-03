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
                     className={this.state.data[i].id === this.state.episodeSelected ? 'Episode-item selected': 'Episode-item'}

                     onClick={()=> this.onEpisodeSelected(this.state.data[i].id)}>
                    <div className="Episode-item__top">
                        <div className="Episode-item__number">0{i + 1}</div>
                        <div className="Episode-item__line"></div>
                        <div className="Episode-item__date">27.08.2099</div>
                    </div>
                    <h2 className="Episode-item__title">
                        {this.state.data[i].title}
                    </h2>
                    <p className="Episode-item__description">{this.state.data[i].summary}</p>
                    <button className="Episode-item__cta">Continuer</button>

                    </div>
            )
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
