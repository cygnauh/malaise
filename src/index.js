import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo';
import ApolloBoost from "apollo-boost";
import gql from "graphql-tag";

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

client
.query({
    query: GET_EPISODE
})
.then(result => console.log(result));

ReactDOM.render(
    <ApolloProvider client={client}>
        <Episodes />
    </ApolloProvider>
    , document.getElementById('root'));

serviceWorker.unregister();