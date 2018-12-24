import React, { Component } from 'react';
import '../assets/styles/episodeForm.css';

// this component help to display the form to the user

// waiting for props Data ( getEpisodes : allEpisodes )
// if no props : loader
// if props : display question
// on question entered, filter the props data object to display next question

//<p>
    //{this.state.data[0].entourage}
//</p>

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            locations:[],
            locationSelected:null,
            entourage:[],
            entourageSelected:null
        };
    }
    createOption(value) {
        let options = []; // return in the render
        for(let i=0; i<this.state.data.length; i++){
            this.state.locations.push(this.state.data[i][value]);
            options.push(
                <div key={i.toString()}
                     className={this.state.locationSelected === this.state.data[i][value] ? 'selected': null}
                     onClick={()=> this.onClickOption(this.state.data[i][value])}>
                    {this.state.data[i][value]}
                    </div>)
        }
        return options

    }
    onClickOption(value) {
        this.setState({
            locationSelected: value
        });
        console.log(this.state.locationSelected)
    }

    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

// THIS IS AN UGGLY TEST
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Comment ca va ?
                                <input type="range" min="0" max="10" step={"1"} value={this.state.value} onChange={this.handleChange} />
                            </label>
                            <br/>
                            <label>
                                Où tu veux aller ?
                            </label>
                            <br/>
                            <label>
                                Avec qui ?

                            </label>
                        </form>
                        {this.createOption('location')}
                    </div>

                    : null}
            </div>
        )
    }
}

export default EpisodeForm;
