import './App.css';
import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const GET_FIRST_EPISODE = gql`
    {
        Episode(id: "cjp8r6rp2p9eg0183cgcd45qz") {
            id
            title
        }
    }
`;

export const App = () => (
    <Query query={GET_FIRST_EPISODE}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                <h1>{data.Episode.title}</h1>
            );
        }}
    </Query>
);

export default App;
