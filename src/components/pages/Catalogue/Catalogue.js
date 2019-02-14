import React, { Component } from 'react';
import './style.scss';
import Header from "../../layout/Header/Header";
import $ from 'jquery';

class Catalogue extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            episodeSelected:null
        };

    }

    componentDidMount() {

    }

    handleHoverItem = (e) => {
        let hoverColor = e.currentTarget.dataset.bgcolor;
        e.currentTarget.style.backgroundColor = hoverColor;
        e.currentTarget.querySelector('.Episode-item__number').style.color = hoverColor;
    }

    handleLeaveHoverItem = (e) => {
        let interfaceColor = e.currentTarget.closest('.interface').style.backgroundColor;
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.querySelector('.Episode-item__number').style.color = interfaceColor;
    }


    displayEpisodes() {
        let episodes = []; // return in the render
        // places display all places from data base
        for(let i=0; i<this.state.data.length; i++){
            var creation = this.state.data[i].createdAt,
                date = (new Date(creation)).toLocaleDateString();
            console.log('serpentin', this.state.data[i].serpentin);
            episodes.push(
                <div key={i.toString()}
                     className={this.state.data[i].id === this.state.episodeSelected ? 'Episode-item selected': 'Episode-item'}
                     onClick={()=> this.onEpisodeSelected(this.state.data[i].id)}
                     onMouseEnter={this.handleHoverItem}
                     onMouseLeave={this.handleLeaveHoverItem}
                     data-bgcolor={this.state.data[i].lightColor} >
                    <div className="Episode-item__container">
                        <div className="Episode-item__top">
                            <div className="Episode-item__number">0{i + 1}</div>
                            <div className="Episode-item__line"></div>
                            <div className="Episode-item__date">{ date }</div>
                        </div>
                        <h2 className="Episode-item__title">
                            {this.state.data[i].title}
                        </h2>
                        <p className="Episode-item__description">{this.state.data[i].summary}</p>
                        <div className="Episode-item__actions">
                            <button className="Episode-item__cta">Continuer</button>
                            <button className="Episode-item__cta">Article</button>
                        </div>
                    </div>
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
                <Header />
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

export default Catalogue;
