import './App.css';
import React, { Component } from 'react';
import Started from "./components/interactions/started";
import SoundTest from './components/Sound'
import Header from './components/layout/Header';

import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import Timeline from './components/layout/Timeline';



// import Doorbell from "./components/interactions/doorbell";

class App extends Component {
    constructor(){
        super();
        this.state = {render:''}
        this.client = new ApolloBoost({
            uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
        });
    }
    render() {
        return (
            <main>
                <div>
                    <ApolloProvider client={this.client}>
                        <Header/>
                        <Started />
                        <SoundTest
                            source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3'}
                        />
                    </ApolloProvider>
                </div>
            </main>
        )
    }
}

export default App;
