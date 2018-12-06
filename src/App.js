import './App.css';
import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";

import Header from './components/layout/Header';
import Episode from './components/Episode'
import Timeline from "./components/layout/Timeline";



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
            <div className="app">
                <Header />
                <ApolloProvider client={this.client}>
                    <Episode/>
                </ApolloProvider>
                <Timeline />
            </div>
        )
    }
}

export default App;
