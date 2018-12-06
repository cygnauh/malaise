import './App.css';
import React, { Component } from 'react';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";

import Header from './components/layout/Header';
import Episode from './components/Episode'
import Timeline from "./components/layout/Timeline";
import Homepage from "./components/pages/Homepage"



class App extends Component {
    constructor(){
        super();
        this.state = {
            render:'',
            home:true
        }
        this.client = new ApolloBoost({
            uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
        });
    }
    handleClick = () => {
        console.log('clicked')
        this.setState({
            home:false
        })
    }
    render() {
        return (
            <div className="app">

                {this.state.home
                    ?
                    <Homepage buttonPressed={this.handleClick}/>
                    :
                    <div>
                        <Header />
                        <ApolloProvider client={this.client}>
                            <Episode/>
                        </ApolloProvider>
                        <Timeline />
                    </div>
                }
            </div>
        )
    }
}

export default App;
