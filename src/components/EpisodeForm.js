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
            data:this.props.episodes,
            locations:[],
            locationSelected:null,
            entourage:[],
            entourageSelected:null
        };
        console.log(this.state.data)
        // this.createOption('location')
    }
    createOption(value) {
        let options = [] // return in the render
        for(let i=0; i<this.state.data.length; i++){
            this.state.locations.push(this.state.data[i][value])
            // options.push(<option key={i}>{`Column ${i + 1}`}</option>)
            // console.log(this.state.data[i]+'.'+value)
            options.push(
                <div key={i.toString()} onClick={this.onClickOption}>
                    {this.state.data[i][value]}
                    </div>)
        }
        console.log(this.state.locations)
        return options

    }
    onClickOption() {
        console.log("hello")
        // this.state.locationSelected = value
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
