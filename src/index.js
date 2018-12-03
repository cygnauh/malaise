import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider, Query } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
import ApolloBoost from "apollo-boost";
import gql from "graphql-tag";
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';


// const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc' });
// const client = new ApolloClient({
//     link: httpLink,
//     cache: new InMemoryCache()
// });

const clientBoost = new ApolloBoost({
    uri: "https://api.graph.cool/simple/v1/cjp2pniu98sw30122z5bavdwc"
    // uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

const GET_EPISODE = gql`    
    {
        allEpisodes {
            id
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
                <select name="dog" onChange={onEpisodeSelected}>
                    {data.episodes.map(dog => (
                        <option key={dog.id} value={dog.summary}>
                            {dog.title}
                        </option>
                    ))}
                </select>
            );
        }}
    </Query>
);

clientBoost
.query({
    query: GET_EPISODE
})
.then(result => console.log(result));

ReactDOM.render(
    <ApolloProvider client={clientBoost}>
        <h1>P.O.C</h1>
        <p></p>
    </ApolloProvider>
    , document.getElementById('root'));

serviceWorker.unregister();


