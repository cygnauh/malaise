import React, { Component } from 'react';
import Homepage from "./pages/Homepage/Homepage";
import EpisodeSelection from "./EpisodeSelection";

class StartProcess extends Component {

    constructor(props){
        super(props);
        this.state = {
            home:true
        }
    }

    handleClickNext = () => {
        console.log('clicked');
        this.setState({
            home:false
        })
    }

    render () {
        console.log(this.state);
        return (
            <div className="Start-process wrapper-container">
                {this.state.home ? <Homepage onButtonPressed={this.handleClickNext} /> : <EpisodeSelection /> }
            </div>
        )
    }

}

export default StartProcess;