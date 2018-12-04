import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import {App, GET_FIRST_EPISODE} from './App';
import Header from './components/layout/Header';
import Timeline from './components/layout/Timeline';

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
});

client
.query({
    query: GET_FIRST_EPISODE
})
.then(result => console.log(result));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Header/>
        <App />
        <Timeline/>
    </ApolloProvider>
    , document.getElementById('root'));

serviceWorker.unregister();