import React, { Component } from 'react';
import '../assets/styles/episodeForm.css';

// this component help to display the form to the user

// 1) waiting for props Data ( getEpisodes : allEpisodes )
// 2) if no props : loader
// 3) if props : display question
// 4) on question entered, filter the props data object to display next question
// 5) handle questions in a JSON maybe.
// 6) add to the store the episode option chosen

//<p>
    //{this.state.data[0].entourage}
//</p>

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            locationSelected:null,
            entourageSelected:null
        };
    }
    createOption(value) {
        let options = []; // return in the render
        for(let i=0; i<this.state.data.length; i++){
            options.push(
                <div key={i.toString()}
                     className={this.state[value+'Selected'] === this.state.data[i][value] ? 'selected': null}
                     onClick={()=> this.onClickOption(this.state.data[i][value], value)}>
                    {this.state.data[i][value]}
                    </div>)
        }
        return options

    }
    onClickOption(value, option) {
        console.log(option)
        if(option === 'location') {
            this.setState({
                locationSelected: value
            });

        } else {
            this.setState({
                entourageSelected: value
            });
        }
        setTimeout(()=>{
            console.log(value)
        }, 0)




    }

    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

// THIS IS AN UGGLY TEST
                    <div>
                        <div>
                            <span>Comment ca va ?</span>
                            <input type="range" min="0" max="4" step={"1"} value={this.state.value} onChange={this.handleChange} />
                        </div>
                        <br/>
                        <div>
                            <span>Où tu veux aller ?</span>
                            {this.createOption('location')}
                        </div>
                        <br/>
                        <div>
                            <span> Avec qui ?</span>
                            {this.createOption('entourage')}
                        </div>
                    </div>

                    : null}
            </div>
        )
    }
}

export default EpisodeForm;
