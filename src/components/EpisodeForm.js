import React, { Component } from 'react';
import '../assets/styles/episodeForm.css';

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

class EpisodeForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            render:'',
            data:this.props.episodes,
            entourage:[],
            location:[],
            locationSelected:null,
            entourageSelected:null
        };
    }
    componentDidMount(){
        this.formatLocations()
    }
    createOption(value) {
        let options = []; // return in the render
        // locations display all locations from data base
        for(let i=0; i<this.state[value].length; i++){
            options.push(
                <div key={i.toString()}
                     className={this.state[value+'Selected'] === this.state[value][i] ? 'selected': null}
                     onClick={()=> this.onClickOption(this.state[value][i], value)}>
                    {this.state[value][i]}
                    </div>)
        }
        // entourages, display according to
        return options
    }
    onClickOption(value, option) {
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
    }

    formatLocations(){ //remove the doublon location
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
    }
    selectEntourage(location){
        let array = []
        for(let i=0; i<this.state.data.length; i++){
            if(this.state.data[i].location === location){
                console.log(this.state.data[i].entourage)
                array.push(this.state.data[i].entourage)
            }
        }
        this.setState({
            entourage: array
        });
        //
        // setTimeout(()=>{
        //     console.log(this.state.entourage)
        // }, 0)
    }

    render() {
        return (
            <div className="episodeForm">
                {!this.state.data? <p>data is loading, please make a loader</p> : null}
                {this.state.data?

// THIS IS AN UGGLY TEST
                    <div>
                        <div>
                            <h2>Comment ca va ?</h2>
                            <div>
                                <span>fatigué(e)</span>
                                <input type="range" min="0" max="4" step={"1"} value={this.state.value} onChange={this.handleChange} />
                                <span>super</span>
                            </div>
                            <button>Valider</button>
                         </div>
                        <br/>
                        <div>
                            <h2>Où tu veux aller ?</h2>
                            {this.createOption('location')}
                            <button>Valider</button>
                        </div>
                        <br/>
                        <div>
                            <h2> Avec qui ?</h2>
                            {this.createOption('entourage')}
                            <button>Valider</button>
                        </div>
                    </div>

                    : null}
            </div>
        )
    }
}

export default EpisodeForm;
