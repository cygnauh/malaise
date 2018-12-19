import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const GET_EPISODES = gql`
    {
        allEpisodes {
            id
            title
            summary
        }
    }
`;

export const Episodes = ({ episode }) => (
    <Query query={GET_EPISODES}>
        {({ loading, error, data }) => {
            if (loading) return "Loading...";
            if (error) return `Error! ${error.message}`;

            return (
                <ul>
                    {data.allEpisodes.map(episode => (
                        <li>
                            <h1>{episode.title}</h1>
                            <p>{episode.summary}</p>
                        </li>
                    ))}
                </ul>
            );
        }}
    </Query>
);
