import React, { Component } from 'react';

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
            data:this.props.episodes
        };
        console.log(this.state.data)
    }

    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

// THIS IS AN UGGLY TEST
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

                    : null}
            </div>
        )
    }
}

export default EpisodeForm;
