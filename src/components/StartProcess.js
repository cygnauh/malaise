import React, { Component } from 'react';
import Homepage from "./pages/Homepage/Homepage";
import Header from "./layout/Header/Header";
import EpisodeSelection from "./EpisodeSelection";
import Episode from "./Episode"

class StartProcess extends Component {

    constructor(props){
        super(props);
        this.state = {
            home:true,
            selection:false,
            episode:false,
            index:0
        }
    }

    handleClickNext = () => {
        console.log('clicked');
        let index = this.state.index +1 ;
        this.setState({
            index : index,
        })
    }

    render () {
        console.log(this.state);
        return (
            <div className="Start-process">
                <div className="wrapper-container">
                    {this.state.index !== 0 ? <Header /> : null}
                    {this.state.index === 0 ? <Homepage onButtonPressed={this.handleClickNext} /> : null}
                    {this.state.index === 1? <EpisodeSelection onButtonPressed={this.handleClickNext}/> : null}
                    {this.state.index === 2 ? <Episode onButtonPressed={this.handleClickNext}/> : null}
                </div>
            </div>

        )
    }

}

export default StartProcess;