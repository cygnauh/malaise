import React, { Component } from 'react';
import $ from 'jquery';
import Homepage from "./pages/Homepage/Homepage";
import EpisodeSelection from "./elements/EpisodeSelection/EpisodeSelection";
import Episode from "./Episode"


class StartProcess extends Component {

    constructor(props){
        super(props);
        this.state = {
            home:true,
            selection:false,
            episode:false,
            index: 0
        }
    }

    handleClickNext = () => {
        let index = this.state.index +1 ;

        this.setState({
            index : index
        }, () => {
            if(this.state.index === 1) {
                $('body').removeClass('interface').addClass('interface-reverse');
            }
        });

    }

    render () {
        return (
            <div className="Start-process">
                <div className="wrapper-container">
                    {this.state.index === 0 ? <Homepage onButtonPressed={this.handleClickNext} /> : null}
                    {this.state.index === 1 ? <Episode onButtonPressed={this.handleClickNext}/> : null}
                </div>
            </div>
        )
    }

}

export default StartProcess;