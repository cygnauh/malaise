import React, { Component } from 'react';
import Started from "./interactions/Started";
import Sound from './Sound'
import Header from './layout/Header';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import Timeline from './layout/Timeline';



import Doorbell from "./interactions/Doorbell";

class Episode extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            volume:null
        };
        this.client = new ApolloBoost({
            uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
        });
    }
    handleName = (value) => {
        this.setState({
            name:value
        });
    }
    handleBackgroundSound = (value) =>{
        if(value){
            setTimeout(()=>{
                this.setState({
                    volume: 0.9,
                });
            }, 2500)
            setTimeout(()=>{
                this.setState({
                    doorOpen:true
                });
            }, 1200)

        }
    }

    render() {
        return (
            <div className="Interaction">
                {!this.state.name
                    ?
                    <Started nameEntered={this.handleName}/>
                    :
                    <Doorbell bellPressed={this.handleBackgroundSound}/>
                }
                <Sound
                    source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3'}
                    soundVolume={this.state.volume}
                    loop={true}
                />
                {this.state.doorOpen
                    ?
                    <Sound
                        source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/open_door.mp3'}
                        loop={false}
                        soundVolume={1}
                    />
                    :
                    null
                }
            </div>
        )
    }
}

export default Episode;
