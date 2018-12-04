import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import './index.css';
import SoundTest from './components/Sound'
import * as serviceWorker from './serviceWorker';

//Apollo, handle Data
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import gql from "graphql-tag";

//Howler, handle sound
// import ReactHowler from 'react-howler'
// import {Howl} from "howler";

const client = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
    // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const GET_EPISODE = gql`
    {
        allEpisodes {
            id
            title
            summary
        }
    }
`;

const GET_EPISODE_SOUND_URL = gql`
    {
        Episode(
            id:"cjp8r6rp2p9eg0183cgcd45qz"
        ) {
            sounds {
                url
            }
        }
    }
`;


let test = null;

client
.query({
    query: GET_EPISODE_SOUND_URL
})
.then(result => function(){test = result;console.log(test)});




const Episodes = ({ onEpisodeSelected }) => (
    <Query query={GET_EPISODE}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                <select name="episode" onChange={onEpisodeSelected}>
                    {data.allEpisodes.map(episode => (
                        <option key={episode.id} value={episode.title}>
                            {episode.title}
                        </option>
                    ))}
                </select>
            );
        }}
    </Query>
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Episodes />
        <SoundTest source={'https://circegrand.fr/etude/gobelins/malaise/media/sounds/party-ambience-1-no-copyright-sound-effect.mp3'}/>
    </ApolloProvider>
    , document.getElementById('root'));

serviceWorker.unregister();