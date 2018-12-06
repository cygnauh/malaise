import React, { Component } from 'react';
import Started from "./interactions/Started";
import SoundTest from './Sound'
import Header from './layout/Header';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import Timeline from './layout/Timeline';



import Doorbell from "./interactions/Doorbell";

class Episode extends Component {
    constructor(){
        super();
        this.state = {render:''}
        this.client = new ApolloBoost({
            uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
        });
    }
    handleName = (value) => {
        console.log(value);
        this.setState({
            name:value
        });
        console.log(this.state.value, 'this.state.value')
    }
    render() {
        return (
            <div>
                {!this.state.name
                    ?
                    <Started nameEntered={this.handleName}/>
                    :
                    <Doorbell/>
                }
                {/*{this.state.name*/}
                    {/*?*/}
                   {/**/}
                    {/*:*/}
                    {/*null*/}
                {/*}*/}
                <SoundTest
                    source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3'}
                />
            </div>
        )
    }
}

export default Episode;
