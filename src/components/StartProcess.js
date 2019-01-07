import React, { Component } from 'react';
import Homepage from "./pages/Homepage";
import EpisodeSelection from "./EpisodeSelection";

class StartProcess extends Component {

    constructor(){
        super();
        this.state = {
            render:'',
            home:true
        }

    }
    handleClick = () => {
        console.log('clicked');
        this.setState({
            home:false
        })
    }

    render () {
        console.log(this.state);
        return (
            <div className="Start-process wrapper-container">
                {this.state.home ? <Homepage onButtonPressed={this.handleClick} /> : <EpisodeSelection /> }
            </div>
        )
    }

}

export default StartProcess;