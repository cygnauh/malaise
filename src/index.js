import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//Apollo, handle Data
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import Header from './components/layout/Header';
import Timeline from './components/layout/Timeline';
import Homepage from './components/pages/homepage';

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
});

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();