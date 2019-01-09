import gql from "graphql-tag";
// import FirstEpisode from "./queries-folder/FirstEpisode";


export const getEpisodesAndLocationSounds = gql`
    {
        allEpisodes{
            id,
            title,
            summary
            location,
            entourage
        },
        allSounds{
            name
            url
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
            location,
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


export default {getEpisodesAndLocationSounds, getEpisode};