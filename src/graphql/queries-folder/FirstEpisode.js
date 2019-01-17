import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_FIRST_EPISODE = gql`
    {
        Episode(id: "cjp8r6rp2p9eg0183cgcd45qz") {
            id
            title
            summary
        }
    }
`;

export const getEpisodes = gql`
    {
        Episode {
            id
            title
            place
            entourage
            summary
        }
    }
`;

export const FirstEpisode = () => (
    <Query query={GET_FIRST_EPISODE}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                <span>{data.Episode.title}</span>
            );
        }}
    </Query>
);

export default FirstEpisode;

