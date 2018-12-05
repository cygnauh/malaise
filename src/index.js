import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App";
import './index.css';
import SoundTest from './components/Sound'
import * as serviceWorker from './serviceWorker';

//Apollo, handle Data
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import Header from './components/layout/Header';
import Timeline from './components/layout/Timeline';

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Header />
        <App />
        <Timeline />
        <SoundTest source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3'}/>
    </ApolloProvider>
    , document.getElementById('root'));

serviceWorker.unregister();