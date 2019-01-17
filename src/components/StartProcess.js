import React, { Component } from 'react';
import Homepage from "./pages/Homepage/Homepage";
import EpisodeSelection from "./EpisodeSelection/EpisodeSelection";

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
            <div className="Start-process">
                {this.state.home ? <div className="wrapper-container"><Homepage onButtonPressed={this.handleClickNext} /></div> : <div className="wrapper-container"><EpisodeSelection /></div> }
            </div>
        )
    }

}

export default StartProcess;