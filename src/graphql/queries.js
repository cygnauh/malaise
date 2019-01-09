import gql from "graphql-tag";
// import FirstEpisode from "./queries-folder/FirstEpisode";


export const getEpisodesAndPlaceSounds = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage
        },
        allSounds{
            name
            url
        }
    }
`;

export const getEpisodes = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            place,
            entourage
        }
    }
`;

export const getEpisode = gql`    
    query Episode($id: ID!) {
        Episode(id: $id)
        {
            id,
            title,
            summary,
            place,
            entourage,
            personalizations{
                name,
                question,
                answerLabel,
                default
            }
        }
    }
`;


export default {getEpisodesAndPlaceSounds, getEpisode};